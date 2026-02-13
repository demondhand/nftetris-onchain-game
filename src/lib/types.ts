// ===== SPIN =====
export type SpinReward = {
  amount: number;
  rarity: "common" | "rare" | "epic" | "legendary";
};

// ===== LEADERBOARD =====
export type LeaderboardEntry = {
  player: string;   // ← WAJIB ADA
  score: number;
};

