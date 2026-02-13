"use client";

export default function AdsButton({
  onReward,
}: {
  onReward: () => void;
}) {
  return (
    <button
      className="ads-button"
      onClick={() => {
        alert("Ads watched ✔");
        onReward();
      }}
    >
      WATCH AD (+1 SPIN)
    </button>
  );
}
