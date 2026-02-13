"use client";

import { useEffect } from "react";
import "@/styles/game.css";
import "@/styles/mobile.css";
import "@/styles/desktop.css";
import ResponsiveLayout from "@/components/layout/ResponsiveLayout";
import { unlockAudio } from "@/lib/audio/AudioManager";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handler = () => {
      unlockAudio();

      // 🔓 sekali saja, setelah itu audio bebas
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
    };

    // 🎯 gesture pertama user (mouse / touch / keyboard)
    window.addEventListener("pointerdown", handler);
    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <ResponsiveLayout>
          {children}
        </ResponsiveLayout>
      </body>
    </html>
  );
}
