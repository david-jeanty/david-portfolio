const baseUrl = process.argv[2];
const cdpPort = process.argv[3] ?? "9338";

if (!baseUrl) {
  console.error("Usage: node scripts/pinball_cdp_verify.mjs <base-url> [cdp-port]");
  process.exit(1);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitFor(fetcher, description, attempts = 80, interval = 250) {
  let lastValue = null;
  let lastError = null;

  for (let index = 0; index < attempts; index += 1) {
    try {
      const value = await fetcher();
      if (value) {
        return value;
      }
      lastValue = value;
    } catch (error) {
      lastError = error;
    }

    await delay(interval);
  }

  throw lastError ?? new Error(`Timed out waiting for ${description}: ${JSON.stringify(lastValue)}`);
}

async function openTarget(url, port) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?${url}`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error(`Failed to open CDP target: HTTP ${response.status}`);
  }

  return response.json();
}

const ws = await (async () => {
  await waitFor(async () => {
    const response = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
    return response.ok ? response.json() : null;
  }, "chrome devtools");

  const target = await openTarget(baseUrl, cdpPort);
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });
  return socket;
})();

const pending = new Map();
let requestId = 0;

ws.onmessage = (event) => {
  const payload = JSON.parse(event.data);
  if (!payload.id) {
    return;
  }

  const resolve = pending.get(payload.id);
  if (resolve) {
    pending.delete(payload.id);
    resolve(payload);
  }
};

function cdpSend(method, params = {}) {
  requestId += 1;
  ws.send(JSON.stringify({ id: requestId, method, params }));
  return new Promise((resolve) => pending.set(requestId, resolve));
}

async function evaluate(expression, awaitPromise = false) {
  const response = await cdpSend("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  });

  if (response.result.exceptionDetails) {
    throw new Error(response.result.exceptionDetails.text ?? "Runtime.evaluate failed");
  }

  return response.result.result.value;
}

await cdpSend("Page.enable");
await cdpSend("Runtime.enable");

function buildDebugSnapshotExpression() {
  return `(() => {
    const debugLines = Array.from(document.querySelectorAll("p[class*='debugLine']")).map(
      (node) => node.textContent ?? ""
    );
    const iframe = document.querySelector("iframe");
    const tracker = iframe?.contentWindow?.__pinballTracker ?? null;

    return {
      debugLines,
      debugPayload: document.querySelector("pre[class*='debugPayload']")?.textContent ?? null,
      liveScore: document.querySelectorAll("p[class*='bestScore']")[0]?.textContent ?? null,
      personalBest: document.querySelectorAll("p[class*='bestScore']")[1]?.textContent ?? null,
      savedScores: JSON.parse(localStorage.getItem("david-portfolio-pinball-high-scores") ?? "[]"),
      tracker: tracker
        ? {
            runId: tracker.runId,
            stateAddress: tracker.stateAddress,
            finalizedRunId: tracker.finalizedRunId,
            runActive: tracker.runActive,
            lastSnapshot: tracker.lastSnapshot
              ? {
                  score: tracker.lastSnapshot.score,
                  ballCount: tracker.lastSnapshot.ballCount,
                  maxBallCount: tracker.lastSnapshot.maxBallCount,
                  remainingBalls: tracker.lastSnapshot.remainingBalls,
                }
              : null,
          }
        : null,
    };
  })()`;
}

await waitFor(
  async () => {
    const state = await evaluate(buildDebugSnapshotExpression());
    return state.debugLines.some((line) => line.includes("Message listener ready: yes")) &&
      state.debugLines.some((line) => line.includes("Iframe loaded: yes"))
      ? state
      : null;
  },
  "pinball page hydration",
  120,
  250
);

const liveStartState = await waitFor(
  async () => {
    const state = await evaluate(buildDebugSnapshotExpression());
    return state.debugLines.some((line) => line.includes("Score received: 1")) ? state : null;
  },
  "initial live score event",
  120,
  250
);

const scoreChangeState = await waitFor(
  async () => {
    const result = await evaluate(
      `(async () => {
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const iframe = document.querySelector("iframe");
        const child = iframe?.contentWindow ?? null;
        const tracker = child?.__pinballTracker ?? null;

        if (!child || !tracker || !tracker.stateAddress || !child.Module?.HEAP32) {
          return null;
        }

        const baseWord = tracker.stateAddress >>> 2;
        const heap32 = child.Module.HEAP32;
        const scoreStructAddress = heap32[baseWord + 13];
        if (!scoreStructAddress) {
          return null;
        }

        heap32[scoreStructAddress >>> 2] = 12345;
        tracker.tick();
        await sleep(250);

        return ${buildDebugSnapshotExpression()};
      })()`,
      true
    );

    return result?.debugLines?.some((line) => line.includes("Score received: 2")) ? result : null;
  },
  "live score change event",
  40,
  250
);

const savedRunState = await waitFor(
  async () => {
    const result = await evaluate(
      `(async () => {
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const iframe = document.querySelector("iframe");
        const child = iframe?.contentWindow ?? null;
        const tracker = child?.__pinballTracker ?? null;

        if (!child || !tracker || !tracker.stateAddress || !child.Module?.HEAP32) {
          return null;
        }

        const baseWord = tracker.stateAddress >>> 2;
        const heap32 = child.Module.HEAP32;
        heap32[baseWord + 80] = 0;
        tracker.tick();
        await sleep(250);

        return ${buildDebugSnapshotExpression()};
      })()`,
      true
    );

    return result?.savedScores?.length ? result : null;
  },
  "automatic completed run save",
  40,
  250
);

await evaluate("location.reload()");

const refreshedState = await waitFor(
  async () => {
    const state = await evaluate(buildDebugSnapshotExpression());
    return state.savedScores?.length ? state : null;
  },
  "saved run after refresh",
  120,
  250
);

console.log(
  JSON.stringify(
    {
      liveStartState,
      scoreChangeState,
      savedRunState,
      refreshedState,
    },
    null,
    2
  )
);

ws.close();
