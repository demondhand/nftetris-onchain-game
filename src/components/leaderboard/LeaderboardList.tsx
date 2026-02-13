import { LeaderboardEntry } from "@/lib/types";

export default function LeaderboardList({
  data,
}: {
  data: LeaderboardEntry[];
}) {
  return (
    <div className="leaderboard-list">
      {data.map((item, i) => (
        <div key={i} className="leaderboard-item">
          <span className="rank">{i + 1}</span>
          <span className="player">{item.player}</span>
          <span className="score">
            {item.score.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
