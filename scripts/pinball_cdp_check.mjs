const pageUrl = process.argv[2];
const cdpPort = process.argv[3] ?? "9333";

if (!pageUrl) {
  console.error("Usage: node scripts/pinball_cdp_check.mjs <page-url> [cdp-port]");
  process.exit(1);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitFor(fetcher, description, attempts = 80, interval = 250) {
  let lastError;

  for (let index = 0; index < attempts; index += 1) {
    try {
      const value = await fetcher();
      if (value) {
        return value;
      }
    } catch (error) {
      lastError = error;
    }

    await delay(interval);
  }

  throw lastError ?? new Error(`Timed out waiting for ${description}`);
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

  const target = await openTarget(pageUrl, cdpPort);
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });
  return socket;
})();

const pending = new Map();
const events = [];
let requestId = 0;

ws.onmessage = (event) => {
  const payload = JSON.parse(event.data);
  if (payload.id) {
    const resolve = pending.get(payload.id);
    if (resolve) {
      pending.delete(payload.id);
      resolve(payload);
    }
    return;
  }
  events.push(payload);
};

function cdpSend(method, params = {}) {
  requestId += 1;
  ws.send(JSON.stringify({ id: requestId, method, params }));
  return new Promise((resolve) => pending.set(requestId, resolve));
}

async function cdpEval(expression, awaitPromise = false) {
  const response = await cdpSend("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  });
  return response.result.result.value;
}

async function evalJson(expression, awaitPromise = false) {
  const raw = await cdpEval(`JSON.stringify(${expression})`, awaitPromise);
  return JSON.parse(raw);
}

async function evalValue(expression, awaitPromise = false) {
  return cdpEval(expression, awaitPromise);
}

await cdpSend("Page.enable");
await cdpSend("Runtime.enable");
await cdpSend("Log.enable");

await waitFor(
  async () => {
    const state = await evalJson(`(() => {
      const iframe = document.querySelector("iframe");
      const debugLines = Array.from(
        document.querySelectorAll("p[class*='debugLine']")
      ).map((node) => node.textContent ?? "");

      return {
        title: document.title,
        iframePresent: !!iframe,
        messageListenerReady: debugLines.some((line) =>
          line.includes("Message listener ready: yes")
        ),
        iframeLoaded: debugLines.some((line) => line.includes("Iframe loaded: yes")),
        readyCount: debugLines.find((line) => line.includes("Ready received:")) ?? null,
        debugCount: debugLines.find((line) => line.includes("Debug received:")) ?? null,
      };
    })()`);

    return state.iframePresent && state.messageListenerReady && state.iframeLoaded
      ? state
      : null;
  },
  "hydrated pinball page",
  120,
  500
);

await waitFor(
  async () => {
    const state = await evalJson(`(() => {
      const iframe = document.querySelector("iframe");
      const child = iframe ? iframe.contentWindow : null;
      const tracker = child ? child.__pinballTracker : null;
      const debugLines = Array.from(
        document.querySelectorAll("p[class*='debugLine']")
      ).map((node) => node.textContent ?? "");
      const debugCountLine =
        debugLines.find((line) => line.includes("Debug received:")) ?? "Debug received: 0";
      const errorCountLine =
        debugLines.find((line) => line.includes("Error received:")) ?? "Error received: 0";
      const debugCount = Number.parseInt(debugCountLine.split(":").pop() ?? "0", 10);
      const errorCount = Number.parseInt(errorCountLine.split(":").pop() ?? "0", 10);

      return {
        hasTracker: !!tracker,
        debugCount,
        errorCount,
        debugPayload:
          document.querySelector("pre[class*='debugPayload']")?.textContent ?? null,
      };
    })()`);

    return state.hasTracker || state.debugCount >= 3 || state.errorCount > 0 ? state : null;
  },
  "iframe tracker boot",
  120,
  500
);

const initialState = await evalJson(`(() => {
  const iframe = document.querySelector("iframe");
  const child = iframe ? iframe.contentWindow : null;
  const tracker = child ? child.__pinballTracker : null;

  return {
    debugLines: Array.from(document.querySelectorAll("p[class*='debugLine']")).map(
      (node) => node.textContent
    ),
    debugPayload:
      document.querySelector("pre[class*='debugPayload']")?.textContent ?? null,
    iframeTracker: tracker
      ? {
          runId: tracker.runId,
          stateAddress: tracker.stateAddress,
          finalizedRunId: tracker.finalizedRunId,
          lastSnapshot: tracker.lastSnapshot,
          locatorCache: tracker.locatorCache ?? null,
        }
      : null,
    vptrDiagnostics:
      child && tracker && tracker.locatorCache?.vtableCandidates?.length && child.Module?.HEAPU32
        ? (() => {
            const heapU32 = child.Module.HEAPU32;
            const vtableAddress = tracker.locatorCache.vtableCandidates[0];
            const diagnostics = [];

            for (let addressPointIndex = 0; addressPointIndex < 12; addressPointIndex += 1) {
              const objectVptrAddress = vtableAddress + addressPointIndex * 4;
              let count = 0;
              const firstMatches = [];

              for (let wordIndex = 1; wordIndex < heapU32.length - 120; wordIndex += 1) {
                if (heapU32[wordIndex] !== objectVptrAddress) {
                  continue;
                }

                count += 1;
                if (firstMatches.length < 5) {
                  firstMatches.push(wordIndex << 2);
                }
              }

              diagnostics.push({
                addressPointIndex,
                objectVptrAddress,
                count,
                firstMatches,
              });
            }

            return diagnostics;
          })()
        : null,
    candidateValidation:
      child && tracker && tracker.locatorCache?.vtableCandidates?.length && child.Module?.HEAP32 && child.Module?.HEAPU32 && child.Module?.HEAPU8
        ? (() => {
            const TABLE_OFFSETS = {
              CurScoreStruct: 13,
              ScoreBallcount: 14,
              ScorePlayerNumber1: 15,
              CheatsUsed: 16,
              CurScore: 21,
              PlayerScores: 26,
              PlayerScoreStride: 7,
              PlayerCount: 54,
              CurrentPlayer: 55,
              Width: 61,
              Height: 62,
              BallCount: 80,
              MaxBallCount: 81,
            };

            const heap32 = child.Module.HEAP32;
            const heapU32 = child.Module.HEAPU32;
            const heapU8 = child.Module.HEAPU8;
            const byteLength = heapU8.byteLength;
            const vtableAddress = tracker.locatorCache.vtableCandidates[0];

            function isPointer(value) {
              return Number.isInteger(value) && value > 1024 && value % 4 === 0 && value + 68 < byteLength;
            }

            function looksLikeScoreStruct(address) {
              if (!isPointer(address)) {
                return { ok: false, reason: "not-pointer" };
              }

              const wordIndex = address >>> 2;
              const scoreValue = heap32[wordIndex];
              if (scoreValue < -10000 || scoreValue > 1000000000) {
                return { ok: false, reason: "score-range", scoreValue };
              }

              const dirtyFlag = heapU8[address + 4];
              if (dirtyFlag !== 0 && dirtyFlag !== 1) {
                return { ok: false, reason: "dirty-flag", dirtyFlag };
              }

              const backgroundPtr = heapU32[wordIndex + 2];
              if (backgroundPtr !== 0 && !isPointer(backgroundPtr)) {
                return { ok: false, reason: "background-pointer", backgroundPtr };
              }

              const offsetX = heap32[wordIndex + 3];
              const offsetY = heap32[wordIndex + 4];
              const width = heap32[wordIndex + 5];
              const height = heap32[wordIndex + 6];

              if (offsetX < 0 || offsetX > 4096 || offsetY < 0 || offsetY > 4096) {
                return { ok: false, reason: "offset-range", offsetX, offsetY };
              }

              if (width <= 0 || width > 1024 || height <= 0 || height > 512) {
                return { ok: false, reason: "size-range", width, height };
              }

              for (let index = 0; index < 10; index += 1) {
                const pointerValue = heapU32[wordIndex + 7 + index];
                if (!isPointer(pointerValue)) {
                  return {
                    ok: false,
                    reason: "pointer-array",
                    pointerIndex: index,
                    pointerValue,
                  };
                }
              }

              return {
                ok: true,
                scoreValue,
                dirtyFlag,
                backgroundPtr,
                offsetX,
                offsetY,
                width,
                height,
              };
            }

            function inspectTable(address) {
              if (!isPointer(address)) {
                return { ok: false, reason: "table-not-pointer", address };
              }

              const baseWord = address >>> 2;
              const playerCount = heap32[baseWord + TABLE_OFFSETS.PlayerCount];
              const currentPlayer = heap32[baseWord + TABLE_OFFSETS.CurrentPlayer];
              const ballCount = heap32[baseWord + TABLE_OFFSETS.BallCount];
              const maxBallCount = heap32[baseWord + TABLE_OFFSETS.MaxBallCount];
              const width = heap32[baseWord + TABLE_OFFSETS.Width];
              const height = heap32[baseWord + TABLE_OFFSETS.Height];
              const curScoreStruct = heapU32[baseWord + TABLE_OFFSETS.CurScoreStruct];
              const scoreBallcount = heapU32[baseWord + TABLE_OFFSETS.ScoreBallcount];
              const scorePlayerNumber1 = heapU32[baseWord + TABLE_OFFSETS.ScorePlayerNumber1];
              const scorePtrs = [
                heapU32[baseWord + TABLE_OFFSETS.PlayerScores],
                heapU32[baseWord + TABLE_OFFSETS.PlayerScores + TABLE_OFFSETS.PlayerScoreStride],
                heapU32[baseWord + TABLE_OFFSETS.PlayerScores + TABLE_OFFSETS.PlayerScoreStride * 2],
                heapU32[baseWord + TABLE_OFFSETS.PlayerScores + TABLE_OFFSETS.PlayerScoreStride * 3],
              ];

              if (playerCount < 0 || playerCount > 4) {
                return { ok: false, reason: "player-count", address, playerCount };
              }

              if (currentPlayer < 0 || currentPlayer > 3) {
                return { ok: false, reason: "current-player", address, currentPlayer };
              }

              if (maxBallCount < 1 || maxBallCount > 10) {
                return { ok: false, reason: "max-ball-count", address, maxBallCount };
              }

              if (ballCount < 0 || ballCount > maxBallCount) {
                return { ok: false, reason: "ball-count", address, ballCount, maxBallCount };
              }

              if (width < 200 || width > 2048 || height < 200 || height > 2048) {
                return { ok: false, reason: "table-size", address, width, height };
              }

              for (const [label, value] of [
                ["curScoreStruct", curScoreStruct],
                ["scoreBallcount", scoreBallcount],
                ["scorePlayerNumber1", scorePlayerNumber1],
              ]) {
                const scoreCheck = looksLikeScoreStruct(value);
                if (!scoreCheck.ok) {
                  return { ok: false, reason: "score-struct", label, address, value, scoreCheck };
                }
              }

              if (new Set(scorePtrs).size !== 4) {
                return { ok: false, reason: "player-score-duplicates", address, scorePtrs };
              }

              for (let scoreIndex = 0; scoreIndex < scorePtrs.length; scoreIndex += 1) {
                const scoreCheck = looksLikeScoreStruct(scorePtrs[scoreIndex]);
                if (!scoreCheck.ok) {
                  return {
                    ok: false,
                    reason: "player-score-struct",
                    address,
                    scoreIndex,
                    value: scorePtrs[scoreIndex],
                    scoreCheck,
                  };
                }
              }

              if (!scorePtrs.includes(curScoreStruct)) {
                return { ok: false, reason: "cur-score-not-in-player-scores", address, curScoreStruct, scorePtrs };
              }

              return {
                ok: true,
                address,
                playerCount,
                currentPlayer,
                ballCount,
                maxBallCount,
                width,
                height,
                curScoreStruct,
                scoreBallcount,
                scorePlayerNumber1,
                scorePtrs,
              };
            }

            const results = [];

            for (let addressPointIndex = 0; addressPointIndex < 12 && results.length < 10; addressPointIndex += 1) {
              const objectVptrAddress = vtableAddress + addressPointIndex * 4;

              for (let wordIndex = 1; wordIndex < heapU32.length - 120 && results.length < 10; wordIndex += 1) {
                if (heapU32[wordIndex] !== objectVptrAddress) {
                  continue;
                }

                const objectAddress = wordIndex << 2;
                results.push({
                  addressPointIndex,
                  objectVptrAddress,
                  objectAddress,
                  result: inspectTable(objectAddress),
                });
              }
            }

            return results;
          })()
        : null,
    objectWordDump:
      child && tracker && child.Module?.HEAP32 && child.Module?.HEAPU32
        ? (() => {
          const heap32 = child.Module.HEAP32;
          const heapU32 = child.Module.HEAPU32;
            const objectAddress = 20902384;
            const baseWord = objectAddress >>> 2;
            return Array.from({ length: 120 }, (_, index) => ({
              index,
              signed: heap32[baseWord + index],
              unsigned: heapU32[baseWord + index],
            }));
          })()
        : null,
  };
})()`);

const delayedDiscoveryState = await evalValue(
  `(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(4000);

    const iframe = document.querySelector("iframe");
    const child = iframe ? iframe.contentWindow : null;
    const tracker = child ? child.__pinballTracker : null;

    if (!child || !tracker) {
      return { error: "tracker unavailable after delay" };
    }

    let manualFindResult = null;
    let manualSnapshot = null;
    let manualFindError = null;

    try {
      manualFindResult = tracker.findTableStateAddress();
      manualSnapshot = manualFindResult ? tracker.readSnapshot() : null;
    } catch (error) {
      manualFindError = error instanceof Error ? error.message : String(error);
    }

    return {
      debugLines: Array.from(document.querySelectorAll("p[class*='debugLine']")).map(
        (node) => node.textContent
      ),
      debugPayload:
        document.querySelector("pre[class*='debugPayload']")?.textContent ?? null,
      trackerState: {
        discoveryAttempts: tracker.discoveryAttempts,
        hasDiscoveryTimer: !!tracker.discoveryTimer,
        hasPollTimer: !!tracker.pollTimer,
        stateAddress: tracker.stateAddress,
        runId: tracker.runId,
        runActive: tracker.runActive,
        finalizedRunId: tracker.finalizedRunId,
        lastSnapshot: tracker.lastSnapshot
          ? {
              address: tracker.lastSnapshot.address,
              score: tracker.lastSnapshot.score,
              remainingBalls: tracker.lastSnapshot.remainingBalls,
              ballCount: tracker.lastSnapshot.ballCount,
              maxBallCount: tracker.lastSnapshot.maxBallCount,
            }
          : null,
      },
      manualFindResult,
      manualSnapshot: manualSnapshot
        ? {
            address: manualSnapshot.address,
            score: manualSnapshot.score,
            remainingBalls: manualSnapshot.remainingBalls,
            ballCount: manualSnapshot.ballCount,
            maxBallCount: manualSnapshot.maxBallCount,
          }
        : null,
      manualFindError,
    };
  })()`,
  true
);

const cheatScoreState = await evalValue(
  `(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const iframe = document.querySelector("iframe");
    const child = iframe ? iframe.contentWindow : null;
    if (!child || !child.dispatchGameKey) {
      return { error: "pinball iframe not ready for key dispatch" };
    }

    child.dispatchGameKey("r");
    await sleep(1200);

    for (const key of ["h", "i", "d", "d", "e", "n", " ", "t", "e", "s", "t"]) {
      child.dispatchGameKey(key);
      await sleep(80);
    }

    child.dispatchGameKey("s");
    await sleep(2000);

    const tracker = child.__pinballTracker;
    return {
      debugLines: Array.from(document.querySelectorAll("p[class*='debugLine']")).map(
        (node) => node.textContent
      ),
      debugPayload:
        document.querySelector("pre[class*='debugPayload']")?.textContent ?? null,
      liveScore:
        document.querySelectorAll("p[class*='bestScore']")[0]?.textContent ?? null,
      iframeTracker: tracker
        ? {
            runId: tracker.runId,
            stateAddress: tracker.stateAddress,
            finalizedRunId: tracker.finalizedRunId,
            lastSnapshot: tracker.lastSnapshot
              ? {
                  address: tracker.lastSnapshot.address,
                  score: tracker.lastSnapshot.score,
                  remainingBalls: tracker.lastSnapshot.remainingBalls,
                  ballCount: tracker.lastSnapshot.ballCount,
                  maxBallCount: tracker.lastSnapshot.maxBallCount,
                }
              : null,
          }
        : null,
      savedScores: JSON.parse(
        localStorage.getItem("david-portfolio-pinball-high-scores") ?? "[]"
      ),
    };
  })()`,
  true
);

const legitimateTiltState = await evalValue(
  `(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const iframe = document.querySelector("iframe");
    const child = iframe ? iframe.contentWindow : null;
    if (!child || !child.dispatchGameKey || !child.__pinballTracker) {
      return { error: "pinball iframe tracker unavailable" };
    }

    child.dispatchGameKey("r");
    await sleep(1200);

    for (let index = 0; index < 120; index += 1) {
      child.dispatchGameKey(" ");
      child.dispatchGameKey("x");
      child.dispatchGameKey("x");
      child.dispatchGameKey("x");
      await sleep(250);

      if (
        child.__pinballTracker.finalizedRunId === child.__pinballTracker.runId &&
        child.__pinballTracker.runId > 0
      ) {
        break;
      }
    }

    return {
      debugLines: Array.from(document.querySelectorAll("p[class*='debugLine']")).map(
        (node) => node.textContent
      ),
      debugPayload:
        document.querySelector("pre[class*='debugPayload']")?.textContent ?? null,
      liveScore:
        document.querySelectorAll("p[class*='bestScore']")[0]?.textContent ?? null,
      iframeTracker: {
        runId: child.__pinballTracker.runId,
        stateAddress: child.__pinballTracker.stateAddress,
        finalizedRunId: child.__pinballTracker.finalizedRunId,
        lastSnapshot: child.__pinballTracker.lastSnapshot
          ? {
              address: child.__pinballTracker.lastSnapshot.address,
              score: child.__pinballTracker.lastSnapshot.score,
              remainingBalls: child.__pinballTracker.lastSnapshot.remainingBalls,
              ballCount: child.__pinballTracker.lastSnapshot.ballCount,
              maxBallCount: child.__pinballTracker.lastSnapshot.maxBallCount,
            }
          : null,
      },
      savedScores: JSON.parse(
        localStorage.getItem("david-portfolio-pinball-high-scores") ?? "[]"
      ),
    };
  })()`,
  true
);

const runtimeErrors = events.filter((entry) => {
  if (entry.method === "Runtime.exceptionThrown") {
    return true;
  }

  if (entry.method === "Log.entryAdded" && entry.params.entry.level === "error") {
    return true;
  }

  return false;
});

console.log(
  JSON.stringify(
    {
      initialState,
      delayedDiscoveryState,
      cheatScoreState,
      legitimateTiltState,
      runtimeErrors: runtimeErrors.slice(-20),
    },
    null,
    2
  )
);

ws.close();
