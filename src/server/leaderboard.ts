import { LeaderboardEntry } from "@/lib/types";

const DAILY: LeaderboardEntry[] = [
  { player: "Player", score: 37600 },
  { player: "Player", score: 31400 },
  { player: "Player", score: 24250 },
  { player: "Player", score: 21900 },
  { player: "Player", score: 18950 },
];

const SEASON: LeaderboardEntry[] = [
  { player: "Player", score: 124500 },
  { player: "Player", score: 110200 },
  { player: "Player", score: 98700 },
  { player: "Player", score: 87600 },
];

export function getLeaderboard(mode: "daily" | "season") {
  return mode === "daily" ? DAILY : SEASON;
}
