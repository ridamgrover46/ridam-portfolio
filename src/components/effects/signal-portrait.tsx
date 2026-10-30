"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface SignalPortraitProps {
  isMotionEnabled?: boolean;
}

export function SignalPortrait({ isMotionEnabled = true }: SignalPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 900);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.targetX = Math.max(0, Math.min(1, x));
      mouseRef.current.targetY = Math.max(0, Math.min(1, y));
    };

    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (isMotionEnabled) {
        time += 0.02;
      }

      ctx.clearRect(0, 0, width, height);

      // Render interactive CRT phosphor wave ripple over the face/head area
      const centerX = width * 0.5;
      const centerY = height * 0.42;
      const headRadiusX = Math.min(width, height) * 0.28;
      const headRadiusY = Math.min(width, height) * 0.36;

      const scanlineStep = 8;
      const lineCount = Math.floor((headRadiusY * 2.2) / scanlineStep);

      ctx.save();
      ctx.lineWidth = 1.0;

      for (let i = 0; i < lineCount; i++) {
        const lineY = centerY - headRadiusY * 1.0 + i * scanlineStep;
        const normY = (lineY - centerY) / headRadiusY;

        if (Math.abs(normY) >= 1.05) continue;

        const rowWidth = Math.sqrt(Math.max(0, 1 - normY * normY)) * headRadiusX * 1.8;
        const startX = centerX - rowWidth * 0.5;

        // Wave frequency & displacement
        ctx.beginPath();
        const steps = 40;
        let isFirst = true;

        for (let s = 0; s <= steps; s++) {
          const px = startX + (s / steps) * rowWidth;
          const distToMouse = Math.hypot(
            (px - centerX) / width - (mouseRef.current.x - 0.5),
            (lineY - centerY) / height - (mouseRef.current.y - 0.42)
          );

          const mouseDistort = Math.exp(-distToMouse * 8) * 6;
          const sineWave = Math.sin(s * 0.35 + time * 1.5 + i * 0.2) * 1.6;
          const py = lineY + (isMotionEnabled ? (sineWave + mouseDistort) : 0);

          if (isFirst) {
            ctx.moveTo(px, py);
            isFirst = false;
          } else {
            ctx.lineTo(px, py);
          }
        }

        // Color modulation: amber rim highlight on right, soft phosphor silver in center
        const rightEdgeProximity = Math.max(0, (centerX + rowWidth * 0.5 - width * 0.5) / (width * 0.4));
        const alpha = Math.max(0.04, 0.22 * (1 - Math.abs(normY)));

        if (rightEdgeProximity > 0.6) {
          ctx.strokeStyle = `rgba(255, 153, 32, ${(alpha * 1.4).toFixed(3)})`;
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        }

        ctx.stroke();
      }

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isMotionEnabled]);

  return (
    <div
      className="scene-backdrop pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Fallback & Base High-Resolution Portrait with CRT Signal Raster */}
      <div className="artifact-fallback relative w-[320px] sm:w-[460px] md:w-[580px] lg:w-[680px] h-[400px] sm:h-[580px] md:h-[720px] lg:h-[840px] mt-[-30px] sm:mt-[-50px]">
        <Image
          src="/images/ridam-signal.webp"
          alt="Ridam Grover — Signal Portrait"
          fill
          priority
          sizes="(max-width: 768px) 90vw, 680px"
          className="object-contain object-top drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] opacity-95 transition-opacity duration-700 select-none"
        />

        {/* Live CRT Phosphor Scanline & Wave Displacement Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-70"
        />

        {/* Ambient Amber Rim-Glow on Right Shoulder / Hair */}
        <div className="absolute right-[10%] top-[20%] w-72 h-72 rounded-full bg-gradient-to-br from-amber-500/25 via-orange-600/10 to-transparent blur-3xl pointer-events-none" />

        {/* Seamless Bottom Vignette Fade into Page Background */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#060709] via-[#060709]/80 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
