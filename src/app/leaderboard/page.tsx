"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// ✅ HANYA IMPORT COMPONENT
import DailyTasks from "./daily/DailyTasks";
import SeasonBoard from "./season/SeasonBoard";

export default function LeaderboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [tab, setTab] = useState<"daily" | "season">("daily");

  return (
    <div className="game-root">
      <div className="game-card">

        <div className="main-panel">
          <h2 className="lb-title">LEADERBOARD</h2>

          <div className="lb-tabs">
            <button
              className={tab === "daily" ? "active" : ""}
              onClick={() => setTab("daily")}
            >
              DAILY
            </button>
            <button
              className={tab === "season" ? "active" : ""}
              onClick={() => setTab("season")}
            >
              SEASON
            </button>
          </div>

          {tab === "daily" && <DailyTasks />}
          {tab === "season" && <SeasonBoard />}
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
