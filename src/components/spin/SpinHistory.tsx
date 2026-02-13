import { SpinReward } from "@/lib/types";

export default function SpinHistory({
  reward,
}: {
  reward: SpinReward | null;
}) {
  if (!reward) return null;

  return (
    <div className={`spin-result ${reward.rarity}`}>
      +{reward.amount} POINT ({reward.rarity.toUpperCase()})
    </div>
  );
}
