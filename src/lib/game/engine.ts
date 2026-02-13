// src/lib/game/engine.ts

/* ================= TYPES ================= */

export type Cell = string | null;

export type Piece = {
  x: number;
  y: number;
  shape: number[][];
  blocks: number[][];
  color: string;
};

export const ROWS = 20;
export const COLS = 10;

/* ================= GRID ================= */

export function createEmptyGrid(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => null)
  );
}

/* ================= TETRIMINOS ================= */

type TetriminoDef = {
  name: string;
  shape: number[][];
  color: string;
};

const TETRIMINOS: TetriminoDef[] = [
  // I
  { name: "I", shape: [[1, 1, 1, 1]], color: "#22d3ee" },

  // O
  { name: "O", shape: [[1, 1], [1, 1]], color: "#facc15" },

  // T
  { name: "T", shape: [[0, 1, 0], [1, 1, 1]], color: "#a855f7" },

  // S
  { name: "S", shape: [[0, 1, 1], [1, 1, 0]], color: "#22c55e" },

  // Z
  { name: "Z", shape: [[1, 1, 0], [0, 1, 1]], color: "#ef4444" },

  // J
  { name: "J", shape: [[1, 0, 0], [1, 1, 1]], color: "#3b82f6" },

  // L
  { name: "L", shape: [[0, 0, 1], [1, 1, 1]], color: "#fb923c" },
];

/* ================= SPAWN PIECE ================= */

export function spawnPiece(): Piece {
  const base = TETRIMINOS[Math.floor(Math.random() * TETRIMINOS.length)];
  const shape = base.shape;

  return {
    x: Math.floor(COLS / 2) - Math.ceil(shape[0].length / 2),
    y: 0,
    shape,
    blocks: getBlocks(shape),
    color: base.color,
  };
}

/* ================= ROTATE PIECE ================= */
/* rotate 90° clockwise, TIDAK reset x,y */

export function rotatePiece(piece: Piece): Piece {
  const rotatedShape = rotateMatrix(piece.shape);

  return {
    ...piece,
    shape: rotatedShape,
    blocks: getBlocks(rotatedShape),
  };
}

/* ================= HELPERS ================= */

function getBlocks(shape: number[][]): number[][] {
  const blocks: number[][] = [];

  shape.forEach((row, y) => {
    row.forEach((v, x) => {
      if (v) blocks.push([x, y]);
    });
  });

  return blocks;
}

function rotateMatrix(matrix: number[][]): number[][] {
  return matrix[0].map((_, i) =>
    matrix.map(row => row[i]).reverse()
  );
}

/* ================= COLLISION ================= */

export function canMove(
  grid: Cell[][],
  piece: Piece,
  dx: number,
  dy: number
): boolean {
  return piece.blocks.every(([bx, by]) => {
    const x = piece.x + bx + dx;
    const y = piece.y + by + dy;

    if (x < 0 || x >= COLS || y >= ROWS) return false;
    if (y < 0) return true;

    return grid[y][x] === null;
  });
}

/* ================= MERGE ================= */

export function mergePiece(grid: Cell[][], piece: Piece): Cell[][] {
  const newGrid = grid.map(row => [...row]);

  piece.blocks.forEach(([bx, by]) => {
    const x = piece.x + bx;
    const y = piece.y + by;

    if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
      newGrid[y][x] = piece.color;
    }
  });

  return newGrid;
}
