"use client";

import "@/lib/react19-polyfill";
import React, { useEffect, useState } from "react";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { CommandPalette } from "@/components/motion/CommandPalette";
import { KonamiListener } from "@/components/motion/KonamiListener";
import { TerminalEasterEgg } from "@/components/motion/TerminalEasterEgg";
import { AIChatWidget } from "@/components/ai/AIChatWidget";

export function ClientWidgets({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SmoothScroll>
      {mounted && (
        <>
          <CustomCursor />
          <CommandPalette />
          <KonamiListener />
          <TerminalEasterEgg />
          <AIChatWidget />
        </>
      )}
      {children}
    </SmoothScroll>
  );
}
