/* ================= HELPERS ================= */
const todayStr = () => new Date().toISOString().slice(0, 10);

/* ================= LOGIN STREAK ================= */
export function updateLoginStreak(): number {
  const today = todayStr();
  const saved = JSON.parse(
    localStorage.getItem("login_streak") || "null"
  );

  if (!saved) {
    const init = { last: today, streak: 1 };
    localStorage.setItem("login_streak", JSON.stringify(init));
    return 1;
  }

  const diffDays =
    (new Date(today).getTime() -
      new Date(saved.last).getTime()) /
    86400000;

  if (diffDays === 1) {
    saved.streak += 1;
  } else if (diffDays > 1) {
    saved.streak = 1; // RESET kalau bolong
  }

  saved.last = today;
  localStorage.setItem("login_streak", JSON.stringify(saved));
  return saved.streak;
}

/* ================= LOGIN MILESTONE ================= */
export function checkLoginMilestone(streak: number): number {
  if (streak === 7) return 30; // ⬅️ KHUSUS
  return 0;
}

/* ================= MONTHLY PROGRESS ================= */
const MONTHLY_KEY = "monthly_progress";

export function markDailyComplete(day: number) {
  const progress = JSON.parse(
    localStorage.getItem(MONTHLY_KEY) || "{}"
  );

  progress[day] = true;
  localStorage.setItem(MONTHLY_KEY, JSON.stringify(progress));
}

export function checkMonthlyComplete(): boolean {
  const progress = JSON.parse(
    localStorage.getItem(MONTHLY_KEY) || "{}"
  );

  for (let day = 1; day <= 30; day++) {
    if (!progress[day]) return false;
  }
  return true;
}

/* ================= POINT SYSTEM ================= */
const POINT_KEY = "user_points";

export function addPoint(amount: number): number {
  const current = Number(localStorage.getItem(POINT_KEY) || 0);
  const total = current + amount;
  localStorage.setItem(POINT_KEY, String(total));
  return total;
}
