"use client";

import { useGame } from "@/hooks/useGame";

export default function GameHUD() {
  const { score } = useGame();

  return (
    <div className="hud-panel">
      <div className="hud-item">
        <span className="hud-label">SCORE</span>
        <strong>{score}</strong>
      </div>
      <div className="hud-item">
        <span className="hud-label">LEVEL</span>
        <strong className="gold">MAX</strong>
      </div>
      <div className="hud-item">
        <span className="hud-label">POINT</span>
        <strong>820</strong>
      </div>
    </div>
  );
}

