"use client";

import type { AudioMap } from "@/lib/audio/AudioManager";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { playSound, stopBGM, unlockAudio } from "@/lib/audio/AudioManager";

const MAX_ADS_PER_DAY = 5;

const SLICES: {
  key: string;
  label: string;
  coin: number;
  color: string;
  sfx?: keyof AudioMap;
}[] = [
  { key: "zonk", label: "ZONK", coin: 0, color: "#2f2f2f" },
  {
    key: "common",
    label: "20 COIN",
    coin: 20,
    color: "#c96b1a",
    sfx: "reward_common",
  },
  {
    key: "rare",
    label: "50 COIN",
    coin: 50,
    color: "#5b2ca0",
    sfx: "reward_rare",
  },
  {
    key: "epic",
    label: "75 COIN",
    coin: 75,
    color: "#b8860b",
    sfx: "reward_epic",
  },
  {
    key: "legendary",
    label: "150 COIN",
    coin: 150,
    color: "#ffd700",
    sfx: "reward_legendary",
  },
];

export default function SpinPage() {
  const router = useRouter();
  const pathname = usePathname();
  const wheelRef = useRef<SVGSVGElement>(null);

  const [mounted, setMounted] = useState(false);
  const [points, setPoints] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [coin, setCoin] = useState(0);
  const [adCount, setAdCount] = useState(0);

  const [spinning, setSpinning] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [rotation, setRotation] = useState(0);

  /* ================= INIT ================= */
  useEffect(() => {
    setMounted(true);

    stopBGM("bgm_game");
    stopBGM("bgm_spin");

    setPoints(Number(localStorage.getItem("user_points") || 0));
    setTickets(Number(localStorage.getItem("spin_ticket") || 0));
    setCoin(Number(localStorage.getItem("user_coin") || 0));

    const today = new Date().toISOString().slice(0, 10);
    const savedDate = localStorage.getItem("watch_ad_date");
    const savedCount = Number(localStorage.getItem("watch_ad_count") || 0);

    if (savedDate !== today) {
      localStorage.setItem("watch_ad_date", today);
      localStorage.setItem("watch_ad_count", "0");
      setAdCount(0);
    } else {
      setAdCount(savedCount);
    }
  }, []);

  /* ================= COOLDOWN ================= */
  useEffect(() => {
    if (!cooldown) return;
    const t = setTimeout(() => setCooldown(false), 5000);
    return () => clearTimeout(t);
  }, [cooldown]);

  /* ================= HELPER ================= */
  const getIndexFromRotation = (deg: number) => {
    const slice = 360 / SLICES.length;
    const normalized = ((deg % 360) + 360) % 360;
    const pointer = (270 - normalized + 360) % 360;
    return Math.floor(pointer / slice);
  };

  /* ================= SPIN ================= */
  const spin = () => {
    if (spinning || cooldown || tickets <= 0) return;

    unlockAudio();
    setSpinning(true);
    playSound("spinStart");

    const spins = 5 + Math.floor(Math.random() * 3);
    const offset = Math.random() * 360;
    const newRotation = rotation + spins * 360 + offset;

    if (wheelRef.current) {
      wheelRef.current.style.transition =
        "transform 4s cubic-bezier(0.17,0.67,0.14,1)";
      wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
    }

    setRotation(newRotation);

    setTimeout(() => {
      const index = getIndexFromRotation(newRotation);
      const reward = SLICES[index];

      if (reward.sfx) playSound(reward.sfx);

      setCoin(prev => {
        const next = prev + reward.coin;
        localStorage.setItem("user_coin", String(next));
        return next;
      });

      setTickets(prev => {
        const next = prev - 1;
        localStorage.setItem("spin_ticket", String(next));
        return next;
      });

      setSpinning(false);
      setCooldown(true);
    }, 4000);
  };

  /* ================= WATCH AD ================= */
  const watchAd = () => {
    if (adCount >= MAX_ADS_PER_DAY) return;

    const nextAd = adCount + 1;
    const nextTicket = tickets + 1;

    setAdCount(nextAd);
    setTickets(nextTicket);

    localStorage.setItem("watch_ad_count", String(nextAd));
    localStorage.setItem("spin_ticket", String(nextTicket));
  };

  /* ================= CV POINT → SPIN (INI SAJA YANG DITAMBAH) ================= */
  const convertPoint = () => {
    if (points < 10) return;

    const nextPoint = points - 10;
    const nextTicket = tickets + 1;

    setPoints(nextPoint);
    setTickets(nextTicket);

    localStorage.setItem("user_points", String(nextPoint));
    localStorage.setItem("spin_ticket", String(nextTicket));
  };

  /* ================= UI ================= */
  const center = 150;
  const radius = 130;
  const sliceAngle = 360 / SLICES.length;

  return (
    <div className="game-root">
      <div className="game-card">
        <div className="main-panel">
          <h2 className="lb-title">SPIN</h2>

          <div className="profile-section muted">
            <strong>POINT BALANCE {points}</strong>
          </div>

          <div style={{ textAlign: "center", marginBottom: 6 }}>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "12px solid transparent",
                borderRight: "12px solid transparent",
                borderTop: "18px solid #facc15",
                margin: "0 auto",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            {mounted && (
              <svg ref={wheelRef} width={300} height={300} viewBox="0 0 300 300">
                {SLICES.map((s, i) => {
                  const start = i * sliceAngle;
                  const end = start + sliceAngle;

                  const x1 = center + radius * Math.cos((Math.PI * start) / 180);
                  const y1 = center + radius * Math.sin((Math.PI * start) / 180);
                  const x2 = center + radius * Math.cos((Math.PI * end) / 180);
                  const y2 = center + radius * Math.sin((Math.PI * end) / 180);

                  const mid = start + sliceAngle / 2;
                  const tx = center + radius * 0.6 * Math.cos((Math.PI * mid) / 180);
                  const ty = center + radius * 0.6 * Math.sin((Math.PI * mid) / 180);

                  return (
                    <g key={i}>
                      <path
                        d={`M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
                        fill={s.color}
                      />
                      <text
                        x={tx}
                        y={ty}
                        fill="#fff"
                        fontSize="14"
                        fontWeight="700"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${mid} ${tx} ${ty})`}
                      >
                        {s.label}
                      </text>
                    </g>
                  );
                })}

                <circle cx={center} cy={center} r={38} fill="#020617" stroke="#facc15" strokeWidth="3" />
                <text
                  x={center}
                  y={center}
                  fill="#facc15"
                  fontSize="14"
                  fontWeight="800"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  onClick={spin}
                  style={{ cursor: cooldown ? "not-allowed" : "pointer", opacity: cooldown ? 0.5 : 1 }}
                >
                  {cooldown ? "WAIT" : "SPIN"}
                </text>
              </svg>
            )}
          </div>

          {/* ===== ACTION BUTTONS (CV + WATCH AD) ===== */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
            <button
              className="task-complete-btn"
              onClick={convertPoint}
              disabled={points < 10}
            >
              🔄 Convert 10 Point → 1 Spin
            </button>

            <button
              className="task-complete-btn"
              onClick={watchAd}
              disabled={adCount >= MAX_ADS_PER_DAY}
            >
              🎬 Watch Ad {adCount}/{MAX_ADS_PER_DAY}
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
            <div className="stat-card">
              <span>Ticket</span>
              <strong>{tickets}</strong>
            </div>
            <div className="stat-card">
              <span>Coin</span>
              <strong style={{ color: "#facc15" }}>{coin}</strong>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM NAV (TIDAK DIUBAH LOGIC / ISI) ===== */}
        <nav className="bottom-nav">
          <button className={`nav-item ${pathname === "/game" ? "active" : ""}`} onClick={() => router.push("/game")}>
            <span className="icon">🎮</span><span className="label">Game</span>
          </button>
          <button className={`nav-item ${pathname === "/profile" ? "active" : ""}`} onClick={() => router.push("/profile")}>
            <span className="icon">👤</span><span className="label">Profile</span>
          </button>
          <button className={`nav-item ${pathname === "/leaderboard" ? "active" : ""}`} onClick={() => router.push("/leaderboard")}>
            <span className="icon">🏆</span><span className="label">Leaderboard</span>
          </button>
          <button className={`nav-item ${pathname === "/spin" ? "active" : ""}`} onClick={() => router.push("/spin")}>
            <span className="icon">🎰</span><span className="label">Spin</span>
          </button>
          <button className={`nav-item ${pathname === "/settings" ? "active" : ""}`} onClick={() => router.push("/settings")}>
            <span className="icon">⚙</span><span className="label">Settings</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
