"use client";

import { useEffect, useRef } from "react";

interface Blob {
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  phase: number;
  speed: number;
  amplitude: number;
  opacityPhase: number;
  opacitySpeed: number;
}

const BLOB_COLORS = [
  "rgba(79, 142, 255, 0.55)",
  "rgba(139, 92, 246, 0.50)",
  "rgba(249, 115, 22, 0.42)",
  "rgba(236, 72, 153, 0.48)",
  "rgba(234, 179, 8, 0.38)",
  "rgba(6, 182, 212, 0.44)",
];

export default function WatercolorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let blobs: Blob[] = [];

    const setupSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initBlobs = () => {
      blobs = BLOB_COLORS.map((color, i) => ({
        baseX: width * (0.15 + (i % 3) * 0.35),
        baseY: height * (0.2 + Math.floor(i / 3) * 0.6),
        radius: Math.min(width, height) * (0.28 + (i % 3) * 0.06),
        color,
        phase: (i / BLOB_COLORS.length) * Math.PI * 2,
        speed: 0.0003 + i * 0.00007,
        amplitude: Math.min(width, height) * 0.12,
        opacityPhase: (i * 1.3) % (Math.PI * 2),
        opacitySpeed: 0.0008 + i * 0.0001,
      }));
    };

    const drawFrame = (time: number) => {
      ctx.fillStyle = "#050818";
      ctx.fillRect(0, 0, width, height);

      ctx.filter = "blur(80px)";
      ctx.globalCompositeOperation = "screen";

      for (const b of blobs) {
        const x = b.baseX + Math.sin(time * b.speed + b.phase) * b.amplitude;
        const y = b.baseY + Math.cos(time * b.speed * 0.7 + b.phase * 1.3) * b.amplitude * 0.75;
        const opacity = 0.45 + Math.sin(time * b.opacitySpeed + b.opacityPhase) * 0.12;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, b.radius);
        grad.addColorStop(0, b.color.replace(/[\d.]+\)$/, `${opacity})`));
        grad.addColorStop(0.5, b.color.replace(/[\d.]+\)$/, `${opacity * 0.5})`));
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";
    };

    const isMobile = window.innerWidth < 768;

    setupSize();
    initBlobs();

    if (isMobile) {
      drawFrame(Date.now());
      const onResize = () => { setupSize(); initBlobs(); drawFrame(Date.now()); };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const animate = (time: number) => {
      drawFrame(time);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onResize = () => { setupSize(); initBlobs(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
      aria-hidden="true"
    />
  );
}
