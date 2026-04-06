export const GLOBAL_LEADERBOARD_LIMIT = 10;
export const PLAYER_NAME_MIN_LENGTH = 3;
export const PLAYER_NAME_MAX_LENGTH = 12;
export const DEFAULT_PLAYER_NAME = "Anonymous";

export type GlobalLeaderboardEntry = {
  id: string;
  score: number;
  player_name: string;
  run_id: number;
  completed_at: string;
  created_at: string;
};

export type PinballLeaderboardSubmission = {
  score: number;
  playerName?: string | null;
  runId: number;
  completedAt: string;
  submissionKey: string;
};

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function normalizePlayerName(value: unknown) {
  if (typeof value !== "string") {
    return { playerName: DEFAULT_PLAYER_NAME, usedDefault: true as const };
  }

  const trimmedValue = normalizeWhitespace(value);
  if (!trimmedValue) {
    return { playerName: DEFAULT_PLAYER_NAME, usedDefault: true as const };
  }

  if (
    trimmedValue.length < PLAYER_NAME_MIN_LENGTH ||
    trimmedValue.length > PLAYER_NAME_MAX_LENGTH
  ) {
    return {
      error: `Player name must be ${PLAYER_NAME_MIN_LENGTH} to ${PLAYER_NAME_MAX_LENGTH} characters.`,
    } as const;
  }

  return { playerName: trimmedValue, usedDefault: false as const };
}

export function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

export function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

export function compareLeaderboardEntries(
  left: Pick<GlobalLeaderboardEntry, "score" | "completed_at">,
  right: Pick<GlobalLeaderboardEntry, "score" | "completed_at">
) {
  if (right.score !== left.score) {
    return right.score - left.score;
  }

  return new Date(left.completed_at).getTime() - new Date(right.completed_at).getTime();
}

export function qualifiesForGlobalLeaderboard(
  entries: GlobalLeaderboardEntry[],
  score: number,
  completedAt: string,
  limit = GLOBAL_LEADERBOARD_LIMIT
) {
  if (entries.length < limit) {
    return true;
  }

  const cutoffEntry = [...entries]
    .sort(compareLeaderboardEntries)
    .slice(0, limit)
    .at(-1);

  if (!cutoffEntry) {
    return true;
  }

  if (score !== cutoffEntry.score) {
    return score > cutoffEntry.score;
  }

  return new Date(completedAt).getTime() < new Date(cutoffEntry.completed_at).getTime();
}
