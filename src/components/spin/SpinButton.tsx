"use client";

import { useSpin } from "@/hooks/useSpin";

export default function SpinButton() {
  const { spin, loading } = useSpin();

  return (
    <button
      className="spin-button"
      onClick={spin}
      disabled={loading}
    >
      {loading ? "SPINNING..." : "SPIN"}
    </button>
  );
}
