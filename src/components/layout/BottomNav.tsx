"use client";

import { useRouter, usePathname } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${isActive("/game") ? "active" : ""}`}
        onClick={() => router.push("/game")}
      >
        <span className="icon">⌂</span>
        <span className="label">Game</span>
      </button>

      <button
        className={`nav-item ${isActive("/leaderboard") ? "active" : ""}`}
        onClick={() => router.push("/leaderboard")}
      >
        <span className="icon">🏆</span>
        <span className="label">LeaderBoard</span>
      </button>

      <button
        className={`nav-item ${isActive("/spin") ? "active" : ""}`}
        onClick={() => router.push("/spin")}
      >
        <span className="icon">🎰</span>
        <span className="label">Spin</span>
      </button>

      <button
        className={`nav-item ${isActive("/profile") ? "active" : ""}`}
        onClick={() => router.push("/profile")}
      >
        <span className="icon">👤</span>
        <span className="label">Profile</span>
      </button>

      <button
        className={`nav-item ${isActive("/settings") ? "active" : ""}`}
        onClick={() => router.push("/settings")}
      >
        <span className="icon">⚙</span>
        <span className="label">Setting</span>
      </button>
    </nav>
  );
}
