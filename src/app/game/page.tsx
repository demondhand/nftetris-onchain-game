"use client";

import { useEffect } from "react";
import GameCanvas from "@/components/game/GameCanvas";
import ControlsMobile from "@/components/game/ControlsMobile";
import { useGame } from "@/hooks/useGame";
import { useRouter, usePathname } from "next/navigation";

// 🔊 AUDIO
import { unlockAudio, playBGM, stopBGM } from "@/lib/audio/AudioManager";

export default function GamePage() {
  const game = useGame();
  const router = useRouter();
  const pathname = usePathname();

  // 🧹 BGM MATI SAAT KELUAR DARI GAME PAGE
  useEffect(() => {
    return () => {
      stopBGM("bgm_game");
    };
  }, []);

  // 🔊 HANDLE START / PAUSE / RESTART
  const handleGameButton = () => {
    unlockAudio();

    if (game.gameOver) {
      playBGM("bgm_game");
      game.restart();
      return;
    }

    if (game.running) {
      stopBGM("bgm_game");
      game.pause();
    } else {
      playBGM("bgm_game");
      game.start();
    }
  };

  return (
    <div className="game-root">
      <div className="game-card">
        <div className="game-top">
          {/* LEFT : GAME AREA */}
          <div className="board-area">
            <GameCanvas game={game} />
            <ControlsMobile game={game} />
          </div>

          {/* RIGHT : HUD */}
          <div className="hud-area">
            {game.level > 0 && (
              <div className="hud-box">
                🏆 <strong>{game.level >= 15 ? "MAX" : game.level}</strong>
              </div>
            )}

            <div className="hud-box">
              <span>SCORE</span>
              <strong>{game.score}</strong>
            </div>

            <div className="hud-box coin">
              🪙 <strong>{game.coin}</strong>
            </div>

            <button
              className="start-btn"
              style={{ marginTop: 12 }}
              onClick={handleGameButton}
            >
              {game.gameOver
                ? "RESTART"
                : game.running
                ? "PAUSE"
                : "START"}
            </button>
          </div>
        </div>

        {/* ===== BOTTOM NAV ===== */}
        <nav className="bottom-nav">
          <button
            className={`nav-item ${pathname === "/game" ? "active" : ""}`}
            onClick={() => router.push("/game")}
          >
            <span className="icon">🎮</span>
            <span className="label">Game</span>
          </button>

          <button
            className={`nav-item ${pathname === "/profile" ? "active" : ""}`}
            onClick={() => router.push("/profile")}
          >
            <span className="icon">👤</span>
            <span className="label">Profile</span>
          </button>

          <button
            className={`nav-item ${pathname === "/leaderboard" ? "active" : ""}`}
            onClick={() => router.push("/leaderboard")}
          >
            <span className="icon">🏆</span>
            <span className="label">Leaderboard</span>
          </button>

          <button
            className={`nav-item ${pathname === "/spin" ? "active" : ""}`}
            onClick={() => router.push("/spin")}
          >
            <span className="icon">🎰</span>
            <span className="label">Spin</span>
          </button>

          <button
            className={`nav-item ${pathname === "/settings" ? "active" : ""}`}
            onClick={() => router.push("/settings")}
          >
            <span className="icon">⚙</span>
            <span className="label">Settings</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
