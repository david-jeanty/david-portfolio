import {
  DEFAULT_PLAYER_NAME,
  GLOBAL_LEADERBOARD_LIMIT,
  GlobalLeaderboardEntry,
  PinballLeaderboardSubmission,
  compareLeaderboardEntries,
  isNonNegativeInteger,
  isPositiveInteger,
  normalizePlayerName,
} from "@/lib/pinballLeaderboard";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TABLE_NAME = "pinball_leaderboard_runs";

// This is a casual leaderboard only; score detection still originates client-side.

type PinballRunRow = GlobalLeaderboardEntry & {
  submission_key: string;
};

function toLeaderboardEntry(row: PinballRunRow): GlobalLeaderboardEntry {
  return {
    id: row.id,
    score: row.score,
    player_name: row.player_name,
    run_id: row.run_id,
    completed_at: row.completed_at,
    created_at: row.created_at,
  };
}

function getSupabaseConfig() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase environment variables are not configured.");
  }

  return {
    baseUrl: `${SUPABASE_URL}/rest/v1/${TABLE_NAME}`,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
  };
}

async function parseSupabaseResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    if (response.status === 204) {
      return [] as T;
    }

    return response.json() as Promise<T>;
  }

  let detail = "Supabase request failed.";

  try {
    const errorBody = await response.json();
    detail = errorBody.message ?? errorBody.error ?? detail;
  } catch {
    detail = response.statusText || detail;
  }

  throw new Error(detail);
}

function buildSelectFields() {
  return "id,score,player_name,run_id,completed_at,created_at,submission_key";
}

export function validatePinballRunPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return { error: "Request body must be a JSON object." } as const;
  }

  const candidate = payload as Partial<PinballLeaderboardSubmission>;

  if (!isNonNegativeInteger(candidate.score)) {
    return { error: "Score must be a non-negative integer." } as const;
  }

  if (!isPositiveInteger(candidate.runId)) {
    return { error: "Run ID must be a positive integer." } as const;
  }

  if (typeof candidate.completedAt !== "string" || Number.isNaN(Date.parse(candidate.completedAt))) {
    return { error: "Completed time must be a valid ISO date string." } as const;
  }

  if (typeof candidate.submissionKey !== "string" || !candidate.submissionKey.trim()) {
    return { error: "Submission key is required." } as const;
  }

  const playerNameResult = normalizePlayerName(candidate.playerName ?? DEFAULT_PLAYER_NAME);
  if ("error" in playerNameResult) {
    return { error: playerNameResult.error } as const;
  }

  return {
    value: {
      score: candidate.score,
      runId: candidate.runId,
      completedAt: new Date(candidate.completedAt).toISOString(),
      submissionKey: candidate.submissionKey.trim(),
      playerName: playerNameResult.playerName,
    },
  } as const;
}

export async function fetchPinballLeaderboard(limit = GLOBAL_LEADERBOARD_LIMIT) {
  const safeLimit = Math.max(1, Math.min(limit, GLOBAL_LEADERBOARD_LIMIT));
  const { baseUrl, headers } = getSupabaseConfig();
  const query = new URLSearchParams({
    select: buildSelectFields(),
    order: "score.desc,completed_at.asc",
    limit: String(safeLimit),
  });

  const response = await fetch(`${baseUrl}?${query.toString()}`, {
    headers,
    cache: "no-store",
  });

  const rows = await parseSupabaseResponse<PinballRunRow[]>(response);
  return rows
    .map(toLeaderboardEntry)
    .sort(compareLeaderboardEntries)
    .slice(0, safeLimit);
}

async function findExistingSubmission(submissionKey: string) {
  const { baseUrl, headers } = getSupabaseConfig();
  const query = new URLSearchParams({
    select: buildSelectFields(),
    submission_key: `eq.${submissionKey}`,
    limit: "1",
  });

  const response = await fetch(`${baseUrl}?${query.toString()}`, {
    headers,
    cache: "no-store",
  });

  const rows = await parseSupabaseResponse<PinballRunRow[]>(response);
  const existingRow = rows[0];

  if (!existingRow) {
    return null;
  }

  return toLeaderboardEntry(existingRow);
}

export async function createPinballRun(submission: PinballLeaderboardSubmission) {
  const validation = validatePinballRunPayload(submission);
  if ("error" in validation) {
    throw new Error(validation.error);
  }

  const existingEntry = await findExistingSubmission(validation.value.submissionKey);
  if (existingEntry) {
    return { entry: existingEntry, duplicate: true as const };
  }

  const { baseUrl, headers } = getSupabaseConfig();
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      ...headers,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      score: validation.value.score,
      player_name: validation.value.playerName,
      run_id: validation.value.runId,
      completed_at: validation.value.completedAt,
      submission_key: validation.value.submissionKey,
    }),
    cache: "no-store",
  });

  const rows = await parseSupabaseResponse<PinballRunRow[]>(response);
  const insertedRow = rows[0];

  if (!insertedRow) {
    throw new Error("Supabase did not return the inserted leaderboard run.");
  }

  return { entry: toLeaderboardEntry(insertedRow), duplicate: false as const };
}
