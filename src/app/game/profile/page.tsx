"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/layout/BottomNav";

export default function ProfilePage() {
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setPoints(Number(localStorage.getItem("user_points") || 0));

    const login = JSON.parse(
      localStorage.getItem("login_streak") || "{}"
    );
    setStreak(login.streak || 0);
  }, []);

  return (
    <div className="game-root">
      <div className="game-card">

        <div className="profile-page">
          <h2 className="lb-title">PROFILE</h2>

          <div className="profile-section">
            <div className="profile-row">
              <span>Username</span>
              <strong>Player</strong>
            </div>

            <div className="profile-row">
              <span>Login Streak</span>
              <strong>{streak} Days</strong>
            </div>

            <div className="profile-row highlight">
              <span>Total Point</span>
              <strong>{points}</strong>
            </div>
          </div>

          <div className="profile-section muted">
            Achievements coming soon
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
