"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const pathname = usePathname();

  const [points, setPoints] = useState(0);
  const [games, setGames] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [coin, setCoin] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setPoints(Number(localStorage.getItem("user_points") || 0));
    setGames(Number(localStorage.getItem("total_games") || 0));
    setBestScore(Number(localStorage.getItem("best_score") || 0));
    setCoin(Number(localStorage.getItem("user_coin") || 0));

    const login = JSON.parse(localStorage.getItem("login_streak") || "{}");
    setStreak(login.streak || 0);
  }, []);

  return (
    <div className="game-root">
      <div className="game-card">

        <div className="main-panel">
          <h2 className="lb-title">PROFILE</h2>

          <div className="profile-section">
            <div className="profile-row">
              <span>Login Streak</span>
              <strong>{streak} Days</strong>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-card">
              <span>Total Points</span>
              <strong>{points}</strong>
            </div>
            <div className="stat-card">
              <span>Best Score</span>
              <strong>{bestScore}</strong>
            </div>
            <div className="stat-card">
              <span>Total Games</span>
              <strong>{games}</strong>
            </div>
            <div className="stat-card">
              <span>Coin</span>
              <strong>{coin}</strong>
            </div>
          </div>

          <div className="profile-achievements">
            <h3 className="ach-title">Achievements</h3>

            <div className="profile-stats">
              <div className="stat-card">
                <span>Veteran</span>
                <strong>60 Days</strong>
              </div>
              <div className="stat-card">
                <span>Elite</span>
                <strong>90 Days</strong>
              </div>
              <div className="stat-card">
                <span>Legend</span>
                <strong>120 Days</strong>
              </div>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM NAV (SAMA PERSIS DENGAN LB) ===== */}
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
