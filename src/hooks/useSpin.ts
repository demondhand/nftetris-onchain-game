"use client";

import { useState } from "react";
import { SpinReward } from "@/lib/types";

export function useSpin() {
  const [loading, setLoading] = useState(false);
  const [lastReward, setLastReward] =
    useState<SpinReward | null>(null);
  const [balance, setBalance] = useState(500);

  async function spin() {
    setLoading(true);

    const res = await fetch("/api/spin", {
      method: "POST",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      setLoading(false);
      return;
    }

    setLastReward(data.reward);
    setBalance(data.balance);
    setLoading(false);
  }

  return {
    spin,
    loading,
    lastReward,
    balance,
  };
}
