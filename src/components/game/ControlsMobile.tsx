"use client";

import { playSound } from "@/lib/audio/AudioManager";

export default function ControlsMobile({ game }: any) {
  const { move, rotate } = game;

  return (
    <div
      className="game-controls"
      style={{
        marginBottom: 24, // ⬅️ GESER KE ATAS, TANPA SENTUH game.css
      }}
    >
      <button
        onClick={() => {
          move(-1, 0);
          playSound("move");
        }}
      >
        ◀
      </button>

      <button
        onClick={() => {
          move(0, 1);
          playSound("drop");
        }}
      >
        ▼
      </button>

      <button
        onClick={() => {
          move(1, 0);
          playSound("move");
        }}
      >
        ▶
      </button>

      <button
        onClick={() => {
          rotate();
          playSound("rotate");
        }}
      >
        ↻
      </button>
    </div>
  );
}

