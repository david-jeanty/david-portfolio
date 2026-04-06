"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_PLAYER_NAME,
  GLOBAL_LEADERBOARD_LIMIT,
  GlobalLeaderboardEntry,
  PLAYER_NAME_MAX_LENGTH,
  PLAYER_NAME_MIN_LENGTH,
  qualifiesForGlobalLeaderboard,
} from "@/lib/pinballLeaderboard";
import styles from "./PinballPage.module.css";

type ScoreEntry = {
  id: string;
  runId: number;
  score: number;
  completedAt: string;
};

const STORAGE_KEY = "david-portfolio-pinball-high-scores";
const LEADERBOARD_NAME_STORAGE_KEY = "david-portfolio-pinball-player-name";

type PendingLeaderboardRun = {
  submissionKey: string;
  runId: number;
  score: number;
  completedAt: string;
};

type PinballReadyMessage = {
  type: "PINBALL_TRACKER_READY";
  stage: string;
  href: string;
  origin: string;
  detail?: unknown;
};

type PinballDebugMessage = {
  type: "PINBALL_TRACKER_DEBUG";
  stage: string;
  href: string;
  origin: string;
  detail?: unknown;
};

type PinballErrorMessage = {
  type: "PINBALL_TRACKER_ERROR";
  stage: string;
  href: string;
  origin: string;
  message: string;
  detail?: unknown;
};

type PinballScoreMessage = {
  type: "PINBALL_SCORE";
  score: number;
  isGameOver: boolean;
  runId: number;
  legitimateRun?: boolean;
  remainingBalls?: number;
  ballCount?: number;
  maxBallCount?: number;
};

type PinballEvent =
  | PinballReadyMessage
  | PinballDebugMessage
  | PinballErrorMessage
  | PinballScoreMessage;

function formatScore(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

async function fetchGlobalLeaderboard(limit = GLOBAL_LEADERBOARD_LIMIT) {
  const response = await fetch(`/api/pinball/leaderboard?limit=${limit}`, {
    cache: "no-store",
  });
  const body = (await response.json()) as {
    entries?: GlobalLeaderboardEntry[];
    error?: string;
  };

  if (!response.ok) {
    throw new Error(body.error ?? "Unable to fetch the global leaderboard.");
  }

  return body.entries ?? [];
}

async function submitGlobalLeaderboardRun(payload: {
  completedAt: string;
  playerName?: string;
  runId: number;
  score: number;
  submissionKey: string;
}) {
  const response = await fetch("/api/pinball/runs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const body = (await response.json()) as {
    duplicate?: boolean;
    entry?: GlobalLeaderboardEntry;
    error?: string;
  };

  if (!response.ok) {
    throw new Error(body.error ?? "Unable to submit the leaderboard run.");
  }

  return body;
}

function isPinballEvent(value: unknown): value is PinballEvent {
  if (!value || typeof value !== "object") return false;

  const event = value as Partial<PinballEvent>;

  if (event.type === "PINBALL_TRACKER_READY") {
    return (
      typeof event.stage === "string" &&
      typeof event.href === "string" &&
      typeof event.origin === "string"
    );
  }

  if (event.type === "PINBALL_TRACKER_DEBUG") {
    return (
      typeof event.stage === "string" &&
      typeof event.href === "string" &&
      typeof event.origin === "string"
    );
  }

  if (event.type === "PINBALL_TRACKER_ERROR") {
    return (
      typeof event.stage === "string" &&
      typeof event.href === "string" &&
      typeof event.origin === "string" &&
      typeof event.message === "string"
    );
  }

  if (event.type === "PINBALL_SCORE") {
    return (
      typeof event.score === "number" &&
      Number.isFinite(event.score) &&
      typeof event.isGameOver === "boolean" &&
      typeof event.runId === "number" &&
      Number.isInteger(event.runId)
    );
  }

  return false;
}

export default function PinballPage() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const finalizedRunIdsRef = useRef<Set<number>>(new Set());
  const submittedLeaderboardKeysRef = useRef<Set<string>>(new Set());
  const leaderboardEntriesRef = useRef<GlobalLeaderboardEntry[]>([]);
  const hasLoadedLeaderboardRef = useRef(false);
  const leaderboardAvailableRef = useRef(false);

  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [hasLoadedScores, setHasLoadedScores] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("/vendor/space-cadet/index.html");
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [leaderboardEntries, setLeaderboardEntries] = useState<GlobalLeaderboardEntry[]>([]);
  const [hasLoadedLeaderboard, setHasLoadedLeaderboard] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);
  const [leaderboardName, setLeaderboardName] = useState("");
  const [pendingLeaderboardRun, setPendingLeaderboardRun] = useState<PendingLeaderboardRun | null>(null);
  const [leaderboardSubmissionError, setLeaderboardSubmissionError] = useState<string | null>(null);
  const [isSubmittingLeaderboardRun, setIsSubmittingLeaderboardRun] = useState(false);
  const [liveScore, setLiveScore] = useState<number | null>(null);
  const [currentRunId, setCurrentRunId] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [messageChannelReady, setMessageChannelReady] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [readyCount, setReadyCount] = useState(0);
  const [debugCount, setDebugCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [scoreCount, setScoreCount] = useState(0);
  const [lastEventPayload, setLastEventPayload] = useState("No tracker event received yet.");
  const [lastAcceptedStage, setLastAcceptedStage] = useState("Waiting for tracker listener");
  const [lastRejectedReason, setLastRejectedReason] = useState("None");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        setHasLoadedScores(true);
        return;
      }

      const parsed = JSON.parse(raw);

      if (!Array.isArray(parsed)) {
        setHasLoadedScores(true);
        return;
      }

      const nextScores = parsed.filter((entry): entry is ScoreEntry => {
        if (!entry || typeof entry !== "object") return false;
        if (typeof entry.id !== "string") return false;
        if (typeof entry.runId !== "number") return false;
        if (typeof entry.score !== "number") return false;
        if (typeof entry.completedAt !== "string") return false;
        return true;
      });

      setScores(nextScores);
    } catch {
      setScores([]);
    } finally {
      setHasLoadedScores(true);
    }
  }, []);

  useEffect(() => {
    const pageQuery = new URLSearchParams(window.location.search);
    const iframeQuery = new URLSearchParams();

    setShowDebugPanel(pageQuery.get("debug") === "1");

    if (pageQuery.get("pinballAutostart") === "1") {
      iframeQuery.set("pinballAutostart", "1");
    }

    if (pageQuery.get("pinballAutotest") === "1") {
      iframeQuery.set("pinballAutotest", "1");
    }

    setIframeSrc(
      `/vendor/space-cadet/index.html${iframeQuery.toString() ? `?${iframeQuery.toString()}` : ""}`
    );
  }, []);

  useEffect(() => {
    leaderboardEntriesRef.current = leaderboardEntries;
  }, [leaderboardEntries]);

  useEffect(() => {
    hasLoadedLeaderboardRef.current = hasLoadedLeaderboard;
  }, [hasLoadedLeaderboard]);

  useEffect(() => {
    leaderboardAvailableRef.current = !leaderboardError;
  }, [leaderboardError]);

  useEffect(() => {
    try {
      const storedName = window.localStorage.getItem(LEADERBOARD_NAME_STORAGE_KEY);
      if (storedName) {
        setLeaderboardName(storedName);
      }
    } catch {
      setLeaderboardName("");
    }

    const loadLeaderboard = async () => {
      try {
        const entries = await fetchGlobalLeaderboard();
        setLeaderboardEntries(entries);
        setLeaderboardError(null);
      } catch (error) {
        setLeaderboardError(
          error instanceof Error ? error.message : "Unable to load the global leaderboard."
        );
      } finally {
        setHasLoadedLeaderboard(true);
      }
    };

    void loadLeaderboard();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const iframeWindow = iframeRef.current?.contentWindow ?? null;
      const sourceMatch =
        !!iframeWindow &&
        (event.source === iframeWindow || event.source === iframeRef.current?.contentDocument?.defaultView);
      const originMatch = event.origin === window.location.origin;

      if (!originMatch) {
        setLastRejectedReason(`Rejected message due to origin mismatch: ${event.origin}`);
        return;
      }

      if (!sourceMatch) {
        setLastRejectedReason("Rejected same-origin message because the source was not the pinball iframe.");
        return;
      }

      if (!isPinballEvent(event.data)) {
        setLastRejectedReason("Rejected iframe message because it did not match a known tracker event shape.");
        return;
      }

      setLastRejectedReason("None");
      setLastEventPayload(
        JSON.stringify(
          {
            eventOrigin: event.origin,
            sourceMatched: sourceMatch,
            data: event.data,
          },
          null,
          2
        )
      );

      if (event.data.type === "PINBALL_TRACKER_READY") {
        setReadyCount((count) => count + 1);
        setLastAcceptedStage(`Ready: ${event.data.stage}`);
        return;
      }

      if (event.data.type === "PINBALL_TRACKER_DEBUG") {
        setDebugCount((count) => count + 1);
        setLastAcceptedStage(`Debug: ${event.data.stage}`);
        return;
      }

      if (event.data.type === "PINBALL_TRACKER_ERROR") {
        setErrorCount((count) => count + 1);
        setLastAcceptedStage(`Error: ${event.data.stage}`);
        return;
      }

      const { isGameOver: messageGameOver, legitimateRun, runId, score } = event.data;

      setLiveScore(score);
      setCurrentRunId(runId);
      setIsGameOver(messageGameOver);
      setScoreCount((count) => count + 1);
      setLastAcceptedStage(
        `Score: run ${runId}, score ${score}, gameOver ${messageGameOver ? "yes" : "no"}`
      );

      if (!messageGameOver || finalizedRunIdsRef.current.has(runId) || legitimateRun === false) {
        return;
      }

      finalizedRunIdsRef.current.add(runId);

      const completedEntry = {
        id: `${Date.now()}-${runId}-${score}`,
        runId,
        score,
        completedAt: new Date().toISOString(),
      };

      setScores((currentScores) => {
        const nextScores = [
          ...currentScores,
          completedEntry,
        ]
          .sort((left, right) => {
            if (right.score !== left.score) return right.score - left.score;
            return new Date(right.completedAt).getTime() - new Date(left.completedAt).getTime();
          })
          .slice(0, 10);

        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextScores));
        return nextScores;
      });

      if (
        !submittedLeaderboardKeysRef.current.has(completedEntry.id) &&
        hasLoadedLeaderboardRef.current &&
        leaderboardAvailableRef.current &&
        qualifiesForGlobalLeaderboard(
          leaderboardEntriesRef.current,
          completedEntry.score,
          completedEntry.completedAt
        )
      ) {
        setLeaderboardSubmissionError(null);
        setPendingLeaderboardRun({
          submissionKey: completedEntry.id,
          runId: completedEntry.runId,
          score: completedEntry.score,
          completedAt: completedEntry.completedAt,
        });
      }
    };

    window.addEventListener("message", handleMessage);
    setMessageChannelReady(true);

    return () => {
      window.removeEventListener("message", handleMessage);
      setMessageChannelReady(false);
    };
  }, []);

  const sortedScores = [...scores].sort((left, right) => {
    if (right.score !== left.score) return right.score - left.score;
    return new Date(right.completedAt).getTime() - new Date(left.completedAt).getTime();
  });

  const personalBest = sortedScores[0] ?? null;
  const leaderboardPromptName = leaderboardName.trim();
  const trackerStatus =
    !messageChannelReady
      ? "Preparing the tracker message channel."
      : !iframeLoaded
      ? "Iframe has not loaded yet."
      : liveScore === null
        ? "Waiting for live tracker events from the iframe."
        : isGameOver
          ? "Last run completed and saved automatically."
          : "Reading live score directly from the game runtime.";

  const loadLeaderboard = async () => {
    try {
      const entries = await fetchGlobalLeaderboard();
      setLeaderboardEntries(entries);
      setLeaderboardError(null);
    } catch (error) {
      setLeaderboardError(
        error instanceof Error ? error.message : "Unable to load the global leaderboard."
      );
    } finally {
      setHasLoadedLeaderboard(true);
    }
  };

  const submitPendingLeaderboardRun = async (nameOverride?: string) => {
    if (!pendingLeaderboardRun || isSubmittingLeaderboardRun) {
      return;
    }

    const playerName = (nameOverride ?? leaderboardName).trim();

    setIsSubmittingLeaderboardRun(true);
    setLeaderboardSubmissionError(null);

    try {
      const response = await submitGlobalLeaderboardRun({
        completedAt: pendingLeaderboardRun.completedAt,
        playerName,
        runId: pendingLeaderboardRun.runId,
        score: pendingLeaderboardRun.score,
        submissionKey: pendingLeaderboardRun.submissionKey,
      });

      submittedLeaderboardKeysRef.current.add(pendingLeaderboardRun.submissionKey);

      if (playerName) {
        window.localStorage.setItem(LEADERBOARD_NAME_STORAGE_KEY, playerName);
        setLeaderboardName(playerName);
      }

      setPendingLeaderboardRun(null);
      await loadLeaderboard();

      if (response.duplicate) {
        return;
      }
    } catch (error) {
      setLeaderboardSubmissionError(
        error instanceof Error ? error.message : "Unable to submit the leaderboard run."
      );
    } finally {
      setIsSubmittingLeaderboardRun(false);
    }
  };

  const handleFrameLoad = () => {
    setIframeLoaded(true);
    finalizedRunIdsRef.current.clear();
    setLiveScore(null);
    setCurrentRunId(null);
    setIsGameOver(false);
    setLastAcceptedStage("Iframe loaded");
  };

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <header className={styles.topBar}>
          <div className={styles.headingBlock}>
            <p className={styles.eyebrow}>Games folder</p>
            <h1 className={styles.title}>3D Pinball Space Cadet</h1>
            <p className={styles.subtitle}>
              A browser-playable local vendored build with automatic score tracking driven by the
              game&apos;s real runtime state.
            </p>
          </div>

          <Link href="/" className={styles.backButton}>
            Back to desktop
          </Link>
        </header>

        <div className={styles.playArea}>
          <div className={styles.frameWrap}>
            {messageChannelReady ? (
              <iframe
                ref={iframeRef}
                src={iframeSrc}
                title="3D Pinball Space Cadet"
                className={styles.frame}
                allowFullScreen
                onLoad={handleFrameLoad}
              />
            ) : (
              <div className={styles.framePlaceholder}>Preparing tracker channel...</div>
            )}
          </div>

          <aside className={styles.scorePanel} aria-label="Pinball score tracker">
            <div className={styles.scoreCard}>
              <p className={styles.panelEyebrow}>Global Leaderboard</p>
              <p className={styles.panelHint}>
                Shared across visitors. Casual public board only, since scores are detected from the
                client runtime.
              </p>

              {hasLoadedLeaderboard && leaderboardEntries.length ? (
                <table className={styles.leaderboardTable}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Player</th>
                      <th>Score</th>
                      <th>Set On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardEntries.slice(0, GLOBAL_LEADERBOARD_LIMIT).map((entry, index) => (
                      <tr key={entry.id}>
                        <td>{index + 1}</td>
                        <td>{entry.player_name}</td>
                        <td>{formatScore(entry.score)}</td>
                        <td>{formatDate(entry.completed_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : hasLoadedLeaderboard && leaderboardError ? (
                <p className={styles.emptyState}>Global leaderboard unavailable right now.</p>
              ) : hasLoadedLeaderboard ? (
                <p className={styles.emptyState}>No global scores posted yet.</p>
              ) : (
                <p className={styles.emptyState}>Loading global leaderboard...</p>
              )}
            </div>

            <div className={styles.scoreCard}>
              <p className={styles.panelEyebrow}>Live score</p>
              <p className={styles.bestScore}>
                {liveScore !== null ? formatScore(liveScore) : "Waiting..."}
              </p>
              <p className={styles.panelHint}>{trackerStatus}</p>
              {currentRunId !== null ? <p className={styles.panelMeta}>Run #{currentRunId}</p> : null}
            </div>

            <div className={styles.scoreCard}>
              <p className={styles.panelEyebrow}>Personal best</p>
              <p className={styles.bestScore}>
                {personalBest ? formatScore(personalBest.score) : "No completed runs yet"}
              </p>
              <p className={styles.panelHint}>
                Completed runs are saved automatically when the game reports a real game-over state.
              </p>
              {personalBest ? (
                <p className={styles.panelMeta}>Set on {formatDate(personalBest.completedAt)}</p>
              ) : null}
            </div>

            <div className={styles.scoreCard}>
              <p className={styles.panelEyebrow}>Completed runs</p>

              {hasLoadedScores && sortedScores.length ? (
                <ol className={styles.scoreList}>
                  {sortedScores.slice(0, 5).map((entry) => (
                    <li key={entry.id} className={styles.scoreRow}>
                      <div>
                        <span className={styles.scoreValue}>{formatScore(entry.score)}</span>
                        <span className={styles.scoreNote}>Run #{entry.runId}</span>
                      </div>
                      <span className={styles.scoreDate}>{formatDate(entry.completedAt)}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className={styles.emptyState}>Completed runs will show up here automatically.</p>
              )}
            </div>

            {pendingLeaderboardRun ? (
              <div className={styles.scoreCard}>
                <p className={styles.panelEyebrow}>Leaderboard Submission</p>
                <p className={styles.panelHint}>
                  That run made the global top 10. Add a name to post it, or skip the name and
                  submit as {DEFAULT_PLAYER_NAME}.
                </p>
                <label className={styles.inputLabel} htmlFor="pinball-player-name">
                  Player name
                </label>
                <input
                  id="pinball-player-name"
                  className={styles.input}
                  value={leaderboardName}
                  maxLength={PLAYER_NAME_MAX_LENGTH}
                  placeholder={DEFAULT_PLAYER_NAME}
                  onChange={(event) => setLeaderboardName(event.target.value)}
                />
                <p className={styles.panelMeta}>
                  {PLAYER_NAME_MIN_LENGTH} to {PLAYER_NAME_MAX_LENGTH} characters. Blank submits as{" "}
                  {DEFAULT_PLAYER_NAME}.
                </p>
                {leaderboardSubmissionError ? (
                  <p className={styles.errorText}>{leaderboardSubmissionError}</p>
                ) : null}
                <div className={styles.buttonRow}>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={() => void submitPendingLeaderboardRun(leaderboardPromptName)}
                    disabled={isSubmittingLeaderboardRun}
                  >
                    {isSubmittingLeaderboardRun ? "Submitting..." : "Submit Score"}
                  </button>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => void submitPendingLeaderboardRun("")}
                    disabled={isSubmittingLeaderboardRun}
                  >
                    Submit as {DEFAULT_PLAYER_NAME}
                  </button>
                </div>
              </div>
            ) : null}

            {showDebugPanel ? (
              <div className={`${styles.scoreCard} ${styles.debugCard}`}>
                <p className={styles.panelEyebrow}>Tracker debug</p>
                <p className={styles.debugLine}>Message listener ready: {messageChannelReady ? "yes" : "no"}</p>
                <p className={styles.debugLine}>Iframe loaded: {iframeLoaded ? "yes" : "no"}</p>
                <p className={styles.debugLine}>Ready received: {readyCount}</p>
                <p className={styles.debugLine}>Debug received: {debugCount}</p>
                <p className={styles.debugLine}>Error received: {errorCount}</p>
                <p className={styles.debugLine}>Score received: {scoreCount}</p>
                <p className={styles.debugLine}>Last accepted: {lastAcceptedStage}</p>
                <p className={styles.debugLine}>Last rejected: {lastRejectedReason}</p>
                <pre className={styles.debugPayload}>{lastEventPayload}</pre>
              </div>
            ) : null}
          </aside>
        </div>

        <div className={styles.statusBar}>
          <span>Local vendor: `/public/vendor/space-cadet`</span>
          <span>Auto-tracked completed runs save in this browser only</span>
          <span>Keyboard controls live inside the game</span>
        </div>
      </section>
    </main>
  );
}
