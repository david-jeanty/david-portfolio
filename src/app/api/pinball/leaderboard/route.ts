import { NextRequest, NextResponse } from "next/server";
import { GLOBAL_LEADERBOARD_LIMIT } from "@/lib/pinballLeaderboard";
import { fetchPinballLeaderboard } from "@/lib/server/pinballSupabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const limitParam = request.nextUrl.searchParams.get("limit");
  const parsedLimit = Number.parseInt(limitParam ?? String(GLOBAL_LEADERBOARD_LIMIT), 10);
  const limit = Number.isFinite(parsedLimit) ? parsedLimit : GLOBAL_LEADERBOARD_LIMIT;

  try {
    const entries = await fetchPinballLeaderboard(limit);

    return NextResponse.json({
      entries,
      limit: Math.max(1, Math.min(limit, GLOBAL_LEADERBOARD_LIMIT)),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to fetch the global leaderboard.",
      },
      { status: 500 }
    );
  }
}
