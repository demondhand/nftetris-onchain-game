import {
  playSound,
  playBGM,
  stopBGM,
  unlockAudio,
} from "@/lib/audio/AudioManager";

export function useAudio() {
  return {
    // 🔊 GAME SFX
    move: () => {
      unlockAudio();
      playSound("move");
    },
    rotate: () => {
      unlockAudio();
      playSound("rotate");
    },
    drop: () => {
      unlockAudio();
      playSound("drop");
    },
    clear: () => {
      unlockAudio();
      playSound("clear");
    },
    levelup: () => {
      unlockAudio();
      playSound("levelup");
    },
    gameover: () => {
      unlockAudio();
      playSound("gameover");
    },

    // 🎰 SPIN
    spinStart: () => {
      unlockAudio();
      playSound("spinStart");
    },
    spinStop: () => {
      unlockAudio();
      playSound("spinStop");
    },

    reward: (rarity: "common" | "rare" | "epic" | "legendary") => {
      unlockAudio();
      playSound(`reward_${rarity}`);
    },

    // 🎵 BGM
    playGameBgm: () => {
      unlockAudio();
      playBGM("bgm_game");
    },
    playSpinBgm: () => {
      unlockAudio();
      playBGM("bgm_spin");
    },
    stopBgm: () => {
      stopBGM("bgm_game");
      stopBGM("bgm_spin");
    },
  };
}

