"use client";

import { useEffect, useRef, useState } from "react";
import { playSound } from "@/lib/audio/AudioManager";

import {
  createEmptyGrid,
  spawnPiece,
  mergePiece,
  canMove,
  rotatePiece,
} from "@/lib/game/engine";
import { calculateScore } from "@/lib/game/scoring";

const LEVEL_STEP = 500;
const COIN_STEP = 400;
const MAX_LEVEL = 15;

export function useGame() {
  /* ================= STATE ================= */
  const [grid, setGrid] = useState(createEmptyGrid());
  const [piece, setPiece] = useState(spawnPiece());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [coin, setCoin] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  /* ================= REFS (SOURCE OF TRUTH) ================= */
  const gridRef = useRef(grid);
  const pieceRef = useRef(piece);
  const runningRef = useRef(running);
  const timerRef = useRef<number | null>(null);
  const droppingRef = useRef(false);

  const scoreRef = useRef(score);
  const levelRef = useRef(level);

  /* ================= SYNC REFS ================= */
  useEffect(() => { gridRef.current = grid; }, [grid]);
  useEffect(() => { pieceRef.current = piece; }, [piece]);
  useEffect(() => { runningRef.current = running; }, [running]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { levelRef.current = level; }, [level]);

  /* ================= RESTORE GAME (ON MOUNT) ================= */
  useEffect(() => {
    const saved = localStorage.getItem("game_snapshot");
    if (!saved) return;

    try {
      const data = JSON.parse(saved);

      setGrid(data.grid);
      setPiece(data.piece);
      setScore(data.score);
      setLevel(data.level);
      setCoin(data.coin);
      setGameOver(data.gameOver);

      gridRef.current = data.grid;
      pieceRef.current = data.piece;
      scoreRef.current = data.score;
      levelRef.current = data.level;

      setRunning(false);
      runningRef.current = false;
      droppingRef.current = false;
    } catch {}
  }, []);

  /* ================= GAME LOOP ================= */
  useEffect(() => {
    if (!running || gameOver) return;

    timerRef.current = window.setInterval(() => {
      drop();
    }, Math.max(150, 700 - levelRef.current * 30));

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [running, gameOver]);

  /* ================= DROP (LOCKED & SAFE) ================= */
  function drop() {
    if (droppingRef.current) return;
    if (!runningRef.current || gameOver) return;

    droppingRef.current = true;

    const g = gridRef.current;
    const p = pieceRef.current;
    if (!p) {
      droppingRef.current = false;
      return;
    }

    if (canMove(g, p, 0, 1)) {
      const next = { ...p, y: p.y + 1 };
      pieceRef.current = next;
      setPiece(next);
      droppingRef.current = false;
      return;
    }

    // ===== MERGE =====
    const merged = mergePiece(g, p);
    const { newGrid, gained } = calculateScore(merged);

    const newScore = scoreRef.current + gained;
    const newLevel = Math.min(
      Math.floor(newScore / LEVEL_STEP),
      MAX_LEVEL
    );

    scoreRef.current = newScore;
    levelRef.current = newLevel;

    setScore(newScore);
    setCoin(Math.floor(newScore / COIN_STEP));

    if (newLevel > levelRef.current) {
      const empty = createEmptyGrid();
      setLevel(newLevel);
      setGrid(empty);
      gridRef.current = empty;
    } else {
      setGrid(newGrid);
      gridRef.current = newGrid;
    }

    const nextPiece = spawnPiece();

    if (!canMove(gridRef.current, nextPiece, 0, 0)) {
      setRunning(false);
      setGameOver(true);
      runningRef.current = false;
      droppingRef.current = false;
      return;
    }

    pieceRef.current = nextPiece;
    setPiece(nextPiece);

    droppingRef.current = false;
  }

  /* ================= MOVE ================= */
  function move(dx: number, dy: number) {
    if (!runningRef.current || gameOver || droppingRef.current) return;

    const g = gridRef.current;
    const p = pieceRef.current;
    if (!p) return;

    if (canMove(g, p, dx, dy)) {
      const next = { ...p, x: p.x + dx, y: p.y + dy };
      pieceRef.current = next;
      setPiece(next);
    }
  }

  /* ================= ROTATE ================= */
  function rotate() {
    if (!runningRef.current || gameOver || droppingRef.current) return;

    const g = gridRef.current;
    const p = pieceRef.current;
    if (!p) return;

    const rotated = rotatePiece(p);

    if (canMove(g, rotated, 0, 0)) {
      pieceRef.current = rotated;
      setPiece(rotated);
    } else if (canMove(g, rotated, 1, 0)) {
      const fix = { ...rotated, x: rotated.x + 1 };
      pieceRef.current = fix;
      setPiece(fix);
    } else if (canMove(g, rotated, -1, 0)) {
      const fix = { ...rotated, x: rotated.x - 1 };
      pieceRef.current = fix;
      setPiece(fix);
    }
  }

  /* ================= CONTROL ================= */
  function start() {
    if (gameOver) return;
    setRunning(true);
    runningRef.current = true;
  }

  function pause() {
    setRunning(false);
    runningRef.current = false;
    droppingRef.current = false;
  }

  function restart() {
    const g = createEmptyGrid();
    const p = spawnPiece();

    setGrid(g);
    setPiece(p);
    setScore(0);
    setLevel(0);
    setCoin(0);
    setGameOver(false);
    setRunning(true);

    gridRef.current = g;
    pieceRef.current = p;
    scoreRef.current = 0;
    levelRef.current = 0;
    runningRef.current = true;
    droppingRef.current = false;
  }

  /* ================= KEYBOARD ================= */
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (!runningRef.current || gameOver) return;

      switch (e.key.toLowerCase()) {
        case "a":
        case "arrowleft":
          move(-1, 0);
          playSound("move");
          break;

        case "d":
        case "arrowright":
          move(1, 0);
          playSound("move");
          break;

        case "s":
        case "arrowdown":
          move(0, 1);
          playSound("drop");
          break;

        case "w":
        case "arrowup":
          rotate();
          playSound("rotate");
          break;
      }
    };

    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [gameOver]);

  /* ================= SAVE GAME (ON UNMOUNT) ================= */
  useEffect(() => {
    return () => {
      const snapshot = {
        grid: gridRef.current,
        piece: pieceRef.current,
        score: scoreRef.current,
        level: levelRef.current,
        coin,
        running: false,
        gameOver,
      };

      localStorage.setItem("game_snapshot", JSON.stringify(snapshot));
    };
  }, []);

  return {
    grid,
    piece,
    score,
    level,
    coin,
    running,
    gameOver,
    move,
    rotate,
    start,
    pause,
    restart,
  };
}
