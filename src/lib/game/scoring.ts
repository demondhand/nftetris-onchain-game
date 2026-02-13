// src/lib/game/scoring.ts
import { Cell, COLS } from "./engine";

export function calculateScore(grid: Cell[][]) {
  let cleared = 0;

  const newGrid = grid.filter(row => {
    const full = row.every(cell => cell !== null);
    if (full) cleared++;
    return !full;
  });

  // tambahkan baris kosong di atas
  while (newGrid.length < grid.length) {
    newGrid.unshift(Array.from({ length: COLS }, () => null));
  }

  let gained = 0;
  if (cleared === 1) gained = 100;
  if (cleared === 2) gained = 300;
  if (cleared === 3) gained = 500;
  if (cleared >= 4) gained = 800;

  return { newGrid, gained, cleared };
}

