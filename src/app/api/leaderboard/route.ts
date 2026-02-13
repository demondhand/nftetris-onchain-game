import { NextResponse } from "next/server";
import { getLeaderboard } from "@/server/leaderboard";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode =
    (searchParams.get("mode") as "daily" | "season") ||
    "daily";

  const data = getLeaderboard(mode);

  return NextResponse.json({
    data,
    resetIn: mode === "daily" ? "4h 52m" : null,
  });
}
