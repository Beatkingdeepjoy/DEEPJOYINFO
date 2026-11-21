"use client";

import React, { useEffect, useRef } from "react";

export function LightweightUniverseFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Particle nodes
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? "#7C3AED" : "#22D3EE",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Tripura night hill gradient
      const grad = ctx.createLinearGradient(0, height * 0.6, 0, height);
      grad.addColorStop(0, "rgba(7, 21, 18, 0.4)");
      grad.addColorStop(1, "rgba(5, 5, 10, 0.95)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.bezierCurveTo(width * 0.3, height * 0.7, width * 0.7, height * 0.85, width, height * 0.75);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Render fireflies
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
