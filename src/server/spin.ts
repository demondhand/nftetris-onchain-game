import { SpinReward } from "@/lib/types";

const REWARDS: SpinReward[] = [
  { amount: 10, rarity: "common" },
  { amount: 25, rarity: "rare" },
  { amount: 50, rarity: "epic" },
  { amount: 75, rarity: "epic" },
  { amount: 150, rarity: "legendary" },
];

export function rollSpin(): SpinReward {
  const rand = Math.random();

  if (rand < 0.5) return REWARDS[0]; // 50%
  if (rand < 0.75) return REWARDS[1]; // 25%
  if (rand < 0.9) return REWARDS[2]; // 15%
  if (rand < 0.98) return REWARDS[3]; // 8%
  return REWARDS[4]; // 2%
}
