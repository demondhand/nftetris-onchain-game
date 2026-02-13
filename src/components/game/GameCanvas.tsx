"use client";

export default function GameCanvas({ game }: any) {
  // ⬅️ GUARD WAJIB
  if (!game) {
    return null;
  }

  const { grid, piece } = game;

  return (
    <div className="tetris-grid">
      {grid.map((row: (string | null)[], y: number) =>
        row.map((cell, x) => {
          let color = cell;

          piece.blocks.forEach(([bx, by]: number[]) => {
            if (x === piece.x + bx && y === piece.y + by) {
              color = piece.color;
            }
          });

          return (
            <div
              key={`${x}-${y}`}
              className="tetris-cell"
              style={{
                background: color ?? "#020617",
                boxShadow: color
                  ? "inset 0 0 6px rgba(255,255,255,0.35)"
                  : undefined,
              }}
            />
          );
        })
      )}
    </div>
  );
}

