import { NextRequest, NextResponse } from "next/server";
import { createPinballRun, validatePinballRunPayload } from "@/lib/server/pinballSupabase";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const validation = validatePinballRunPayload(payload);
  if ("error" in validation) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const result = await createPinballRun({
      score: validation.value.score,
      playerName: validation.value.playerName,
      runId: validation.value.runId,
      completedAt: validation.value.completedAt,
      submissionKey: validation.value.submissionKey,
    });

    return NextResponse.json(
      {
        entry: result.entry,
        duplicate: result.duplicate,
      },
      { status: result.duplicate ? 200 : 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to submit leaderboard run.",
      },
      { status: 500 }
    );
  }
}
