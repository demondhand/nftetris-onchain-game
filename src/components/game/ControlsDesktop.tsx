"use client";

import { useEffect } from "react";
import { useGame } from "@/hooks/useGame";

export default function ControlsDesktop() {
  const { move, rotate } = useGame();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") move(-1, 0);
      if (e.key === "ArrowRight") move(1, 0);
      if (e.key === "ArrowDown") move(0, 1);
      if (e.key === "w") rotate();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return <div className="controls-desktop">← → ↓ | W Rotate</div>;
}

