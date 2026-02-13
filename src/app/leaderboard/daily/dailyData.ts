// app/leaderboard/daily/dailyData.ts

export type Task = {
  id: string;
  title: string;
  desc: string;
};

/**
 * Task pool (diputar & dikombinasikan)
 * Daily Login SELALU ditambahkan dari logic, bukan dari sini
 */
const TASK_POOL: Task[] = [
  { id: "play1", title: "Play 1 Game", desc: "Finish 1 game" },
  { id: "play2", title: "Play 2 Games", desc: "Finish 2 games" },
  { id: "score2k", title: "Score 2,000", desc: "Reach score 2,000" },
  { id: "score5k", title: "Score 5,000", desc: "Reach score 5,000" },
  { id: "score10k", title: "Score 10,000", desc: "Reach score 10,000" },
  { id: "spin1", title: "Use Spin", desc: "Spin once" },
  { id: "spin2", title: "Use Spin 2x", desc: "Spin twice" },
  { id: "ad1", title: "Watch Ad", desc: "Watch 1 ad" },
  { id: "lines50", title: "Clear 50 Lines", desc: "Clear total 50 lines" },
  { id: "lines100", title: "Clear 100 Lines", desc: "Clear total 100 lines" },
];

/**
 * Ambil 4 task unik per hari (hari 1–30)
 * Daily Login akan ditambah di logic (jadi total = 5 task)
 */
export function getDailyTasks(day: number): Task[] {
  const start = (day * 3) % TASK_POOL.length;

  return [
    TASK_POOL[start % TASK_POOL.length],
    TASK_POOL[(start + 1) % TASK_POOL.length],
    TASK_POOL[(start + 2) % TASK_POOL.length],
    TASK_POOL[(start + 3) % TASK_POOL.length],
  ];
}
