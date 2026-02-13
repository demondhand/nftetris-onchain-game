"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getGameUserId } from "@/lib/gameUserId";

export default function SettingsPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(true);
  const [volume, setVolume] = useState(70);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    setSound(localStorage.getItem("setting_sound") !== "off");
    setMusic(localStorage.getItem("setting_music") !== "off");

    const savedVolume = Number(localStorage.getItem("setting_volume"));
    setVolume(isNaN(savedVolume) ? 70 : savedVolume);

    setUserId(getGameUserId());
  }, []);

  const toggle = (key: string, value: boolean, setter: any) => {
    setter(value);
    localStorage.setItem(key, value ? "on" : "off");
  };

  const changeVolume = (v: number) => {
    setVolume(v);
    localStorage.setItem("setting_volume", String(v));
  };

  return (
    <div className="game-root">
      <div className="game-card">
        <div className="main-panel">
          <h2 className="lb-title">SETTINGS</h2>

          {/* 🔊 AUDIO */}
          <div className="profile-section">
            <div className="profile-row">
              <span>Sound</span>
              <strong
                style={{ cursor: "pointer" }}
                onClick={() => toggle("setting_sound", !sound, setSound)}
              >
                {sound ? "ON" : "OFF"}
              </strong>
            </div>

            <div className="profile-row">
              <span>Music</span>
              <strong
                style={{ cursor: "pointer" }}
                onClick={() => toggle("setting_music", !music, setMusic)}
              >
                {music ? "ON" : "OFF"}
              </strong>
            </div>

            <div className="profile-row">
              <span>Music Volume</span>
              <strong>{volume}%</strong>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              style={{ width: "100%", cursor: "pointer" }}
            />
          </div>

          {/* 🆔 USER */}
          <div className="profile-section">
            <div className="profile-row">
              <span>Game User ID</span>
              <strong style={{ fontSize: "11px", opacity: 0.8 }}>
                {userId}
              </strong>
            </div>
          </div>

          {/* 💼 WALLET */}
          <div className="profile-section">
            <div className="profile-row">
              <span>Wallet</span>
              <strong style={{ cursor: "pointer" }}>Coming Soon</strong>
            </div>

            <div className="profile-row muted">
              <span>NFT</span>
              <strong>Coming Soon</strong>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM NAV (TIDAK DIUBAH) ===== */}
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
