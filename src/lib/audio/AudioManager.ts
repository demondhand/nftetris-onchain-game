"use client";

/* =========================================================
   AUDIO MANAGER — FINAL STABLE VERSION
   ========================================================= */

let unlocked = false;

export type AudioMap = {
  // SFX GAME
  move: HTMLAudioElement;
  rotate: HTMLAudioElement;
  drop: HTMLAudioElement;
  clear: HTMLAudioElement;
  levelup: HTMLAudioElement;
  gameover: HTMLAudioElement;

  // SPIN
  spinStart: HTMLAudioElement;
  spinStop: HTMLAudioElement;
  reward_common: HTMLAudioElement;
  reward_rare: HTMLAudioElement;
  reward_epic: HTMLAudioElement;
  reward_legendary: HTMLAudioElement;

  // BGM
  bgm_game: HTMLAudioElement;
  bgm_spin: HTMLAudioElement;
};

let audios: AudioMap | null = null;

/* ================= SETTINGS HELPERS ================= */

function musicEnabled() {
  return localStorage.getItem("setting_music") !== "off";
}

function soundEnabled() {
  return localStorage.getItem("setting_sound") !== "off";
}

function musicVolume() {
  const v = Number(localStorage.getItem("setting_music_volume"));
  return isNaN(v) ? 0.4 : v;
}

/* ================= INIT AUDIO ================= */

function initAudios(): AudioMap | null {
  if (typeof window === "undefined") return null;

  if (!audios) {
    audios = {
      // GAME SFX
      move: new Audio("/audio/sfx/move.wav"),
      rotate: new Audio("/audio/sfx/rotate.wav"),
      drop: new Audio("/audio/sfx/drop.wav"),
      clear: new Audio("/audio/sfx/clear.wav"),
      levelup: new Audio("/audio/sfx/levelup.wav"),
      gameover: new Audio("/audio/sfx/gameover.wav"),

      // SPIN SFX
      spinStart: new Audio("/audio/sfx/spin_start.wav"),
      spinStop: new Audio("/audio/sfx/spin_stop.wav"),
      reward_common: new Audio("/audio/sfx/reward_common.wav"),
      reward_rare: new Audio("/audio/sfx/reward_rare.wav"),
      reward_epic: new Audio("/audio/sfx/reward_epic.wav"),
      reward_legendary: new Audio("/audio/sfx/reward_legendary.wav"),

      // BGM (sesuai struktur kamu)
      bgm_game: new Audio("/audio/sfx/bgm.wav"),
      bgm_spin: new Audio("/audio/sfx/bgm.wav"),
    };

    /* ===== CONFIG ===== */
    audios.bgm_game.loop = true;
    audios.bgm_spin.loop = true;

    audios.move.volume = 0.5;
    audios.rotate.volume = 0.5;
    audios.drop.volume = 0.6;
    audios.clear.volume = 0.7;
    audios.levelup.volume = 0.8;
    audios.gameover.volume = 0.8;
  }

  return audios;
}

/* ================= UNLOCK (WAJIB) ================= */

export function unlockAudio() {
  const audioMap = initAudios();
  if (!audioMap || unlocked) return;

  Object.values(audioMap).forEach((a) => {
    try {
      a.play()
        .then(() => {
          a.pause();
          a.currentTime = 0;
        })
        .catch(() => {});
    } catch {}
  });

  unlocked = true;
}

/* ================= SFX ================= */

export function playSound(name: keyof AudioMap) {
  const audioMap = initAudios();
  const base = audioMap?.[name];

  if (!base || !unlocked) return;
  if (!soundEnabled()) return;

  // clone supaya bisa spam / overlap
  const sfx = base.cloneNode(true) as HTMLAudioElement;
  sfx.volume = base.volume || 1;
  sfx.play().catch(() => {});
}

/* ================= BGM ================= */

export function playBGM(name: "bgm_game" | "bgm_spin") {
  const audioMap = initAudios();
  const bgm = audioMap?.[name];

  if (!bgm || !unlocked) return;
  if (!musicEnabled()) return;

  bgm.volume = musicVolume();
  bgm.play().catch(() => {});
}

export function stopBGM(name: "bgm_game" | "bgm_spin") {
  const audioMap = initAudios();
  const bgm = audioMap?.[name];
  if (!bgm) return;

  bgm.pause();
  bgm.currentTime = 0;
}

