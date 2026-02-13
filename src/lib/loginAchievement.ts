type LoginStreak = {
  streak: number;
  lastLogin: string;
};

type LoginAchievements = {
  veteran: boolean;
  elite: boolean;
  legend: boolean;
};

export function handleDailyLogin() {
  const today = new Date().toDateString();

  const streakData: LoginStreak = JSON.parse(
    localStorage.getItem("login_streak") ||
      '{"streak":0,"lastLogin":""}'
  );

  const achievements: LoginAchievements = JSON.parse(
    localStorage.getItem("login_achievements") ||
      '{"veteran":false,"elite":false,"legend":false}'
  );

  // FIRST LOGIN
  if (!streakData.lastLogin) {
    localStorage.setItem(
      "login_streak",
      JSON.stringify({ streak: 1, lastLogin: today })
    );
    return;
  }

  const last = new Date(streakData.lastLogin);
  const diffDays = Math.floor(
    (Date.now() - last.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays >= 2) {
    // ❌ MISSED LOGIN → RESET STREAK
    streakData.streak = 1;
  } else if (diffDays === 1) {
    // ✅ CONTINUE STREAK
    streakData.streak += 1;
  } else {
    // already logged in today
    return;
  }

  streakData.lastLogin = today;

  // 🔓 ACHIEVEMENT UNLOCK (PERMANENT)
  if (streakData.streak >= 60) achievements.veteran = true;
  if (streakData.streak >= 90) achievements.elite = true;
  if (streakData.streak >= 120) achievements.legend = true;

  localStorage.setItem("login_streak", JSON.stringify(streakData));
  localStorage.setItem(
    "login_achievements",
    JSON.stringify(achievements)
  );
}
