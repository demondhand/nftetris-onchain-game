"use client";

import { useEffect, useState } from "react";
import { getDailyTasks } from "./dailyData";
import {
  updateLoginStreak,
  checkLoginMilestone,
  markDailyComplete,
  checkMonthlyComplete,
  addPoint,
} from "./dailyLogic";

export default function DailyTasks() {
  const day = new Date().getDate(); // 1–30
  const tasks = getDailyTasks(day); // 4 task
  const [streak, setStreak] = useState(0);

  /* ===== DAILY LOGIN ===== */
  useEffect(() => {
    const s = updateLoginStreak();
    setStreak(s);

    // daily login = +1 point
    addPoint(1);

    // login milestone (7 hari)
    const bonus = checkLoginMilestone(s);
    if (bonus > 0) {
      addPoint(bonus);
      console.log(`🔥 LOGIN STREAK ${s} DAYS +${bonus} POINT`);
    }
  }, []);

  /* ===== COMPLETE DAILY TASK ===== */
  const completeDay = () => {
    // hanya task biasa → 4 × 2 = 8 point
    const taskPoint = tasks.length * 2;
    addPoint(taskPoint);

    markDailyComplete(day);
    console.log(`🎯 TASK COMPLETED +${taskPoint} POINT`);

    if (checkMonthlyComplete()) {
      console.log("🏆 MONTHLY BADGE / BONUS UNLOCKED");
    }
  };

  return (
    <div className="daily-task-list">
      <h3 className="task-day-title">Day {day} Tasks</h3>

      {/* DAILY LOGIN */}
      <div className="task-card highlight">
        <div className="task-left">
          <span className="task-icon">🔥</span>
          <div>
            <strong>Daily Login</strong>
            <p>Login today (Streak {streak} days)</p>
          </div>
        </div>
        <span className="task-status">✔</span>
      </div>

      {/* TASK BIASA */}
      {tasks.map((t) => (
        <div key={t.id} className="task-card">
          <div className="task-left">
            <span className="task-icon">🎯</span>
            <div>
              <strong>{t.title}</strong>
              <p>{t.desc}</p>
            </div>
          </div>
          <span className="task-status">⬜</span>
        </div>
      ))}

      <button className="task-complete-btn" onClick={completeDay}>
        Complete All Tasks Today
      </button>
    </div>
  );
}
