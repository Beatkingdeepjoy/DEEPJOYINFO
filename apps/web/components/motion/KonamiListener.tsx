"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { soundFx } from "@/lib/sound/soundEffects";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a"
];

export function KonamiListener() {
  const [keys, setKeys] = useState<string[]>([]);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      setKeys((prev) => {
        const next = [...prev, e.key].slice(-KONAMI_CODE.length);
        if (next.join("").toLowerCase() === KONAMI_CODE.join("").toLowerCase()) {
          triggerEasterEgg();
          return [];
        }
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerEasterEgg = () => {
    setTriggered(true);
    soundFx.playSuccess();

    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#7C3AED", "#22D3EE", "#E879F9", "#10B981"]
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#7C3AED", "#22D3EE", "#E879F9", "#10B981"]
      });
    }, 250);

    setTimeout(() => setTriggered(false), 5000);
  };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  if (!triggered) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-accent-violet/90 border border-accent-cyan text-white shadow-glow backdrop-blur-md flex items-center space-x-3 animate-bounce">
      <span className="text-xl">🚀</span>
      <span className="font-mono text-sm font-bold">
        KONAMI CODE UNLOCKED! Welcome to Deepjoy&apos;s Creative Matrix!
      </span>
    </div>
  );
}
