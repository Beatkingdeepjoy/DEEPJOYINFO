"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "text">("default");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("[data-cursor]") as HTMLElement | null;
      if (interactive) {
        const text = interactive.getAttribute("data-cursor") || "";
        setCursorText(text);
        setCursorVariant("hover");
      } else if (target.closest("button, a, input, textarea, select, [role='button']")) {
        setCursorText("");
        setCursorVariant("hover");
      } else {
        setCursorText("");
        setCursorVariant("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Glowing Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full mix-blend-difference bg-white"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
        }}
      />

      {/* Trailing Fluid Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full border border-accent-cyan/60 bg-accent-violet/10 backdrop-blur-[2px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorVariant === "hover" ? (cursorText ? 72 : 44) : 28,
          height: cursorVariant === "hover" ? (cursorText ? 72 : 44) : 28,
          borderColor: cursorVariant === "hover" ? "#22D3EE" : "rgba(124, 58, 237, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
