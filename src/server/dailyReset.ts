export function getDailyResetTime() {
  const now = new Date();
  const reset = new Date();
  reset.setUTCHours(24, 0, 0, 0);

  const diff = reset.getTime() - now.getTime();
  const h = Math.floor(diff / 1000 / 60 / 60);
  const m = Math.floor((diff / 1000 / 60) % 60);

  return `${h}h ${m}m`;
}
