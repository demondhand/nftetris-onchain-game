"use client";

import { useEffect, useState } from "react";
import { LeaderboardEntry } from "@/lib/types";

type Mode = "daily" | "season";

export function useLeaderboard() {
  const [mode, setMode] = useState<Mode>("daily");
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [resetIn, setResetIn] = useState("00:00:00");

  useEffect(() => {
    fetch(`/api/leaderboard?mode=${mode}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setResetIn(res.resetIn || "");
      });
  }, [mode]);

  return {
    mode,
    setMode,
    data,
    resetIn,
  };
}
