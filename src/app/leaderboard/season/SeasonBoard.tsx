"use client";

const SEASON_DATA = [
  { rank: 1, name: "Player", score: 37600 },
  { rank: 2, name: "Player", score: 31400 },
  { rank: 3, name: "Player", score: 24250 },
  { rank: 4, name: "Player", score: 21900 },
  { rank: 5, name: "Player", score: 18950 },
];

export default function SeasonBoard() {
  return (
    <div className="lb-list">
      {SEASON_DATA.map((r) => (
        <div key={r.rank} className="lb-row">
          <span className="rank">{r.rank}</span>
          <span>{r.name}</span>
          <span className="score">{r.score.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
