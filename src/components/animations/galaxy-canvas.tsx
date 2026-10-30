"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
}

export function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse tracking with smooth lerp inertia
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse between -1 and 1
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Cosmic Palette: Warm amber, glowing gold, champagne star white, deep copper
    const STAR_COLORS = [
      "249, 115, 22",  // vibrant amber (#f97316)
      "251, 191, 36",  // radiant gold (#fbbf24)
      "245, 158, 11",  // deep warm amber (#f59e0b)
      "254, 215, 170", // champagne light (#fed7aa)
      "255, 255, 255", // pure diamond starlight
      "234, 88, 12",   // burnt copper (#ea580c)
    ];

    const STAR_COUNT = 720;
    const stars: Star[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight * 1.4;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize spiral galaxy distribution
    for (let i = 0; i < STAR_COUNT; i++) {
      const armIndex = i % 2; // 2 spiral arms
      const armOffset = armIndex * Math.PI;
      const distRatio = Math.pow(Math.random(), 1.5);
      const orbitRadius = 35 + distRatio * (Math.min(width, 1400) * 0.52);
      const spiralAngle = distRatio * Math.PI * 3.8 + armOffset + (Math.random() - 0.5) * 0.55;

      const x = Math.cos(spiralAngle) * orbitRadius;
      const y = Math.sin(spiralAngle) * orbitRadius * 0.44; // perspective tilt
      const z = (Math.random() - 0.5) * 450;

      const baseRadius =
        Math.random() < 0.82 ? Math.random() * 1.5 + 0.4 : Math.random() * 2.6 + 1.3;
      const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

      stars.push({
        x,
        y,
        z,
        radius: baseRadius,
        baseRadius,
        color,
        alpha: Math.random() * 0.75 + 0.25,
        twinkleSpeed: Math.random() * 0.035 + 0.015,
        twinkleOffset: Math.random() * Math.PI * 2,
        orbitAngle: spiralAngle,
        orbitRadius,
        orbitSpeed: (0.00065 + (1 / (orbitRadius + 30)) * 0.09) * (Math.random() * 0.4 + 0.8),
      });
    }

    let time = 0;

    const render = () => {
      time += 1;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Responsive center point responding to mouse
      const centerX = width / 2 + mouse.x * 65;
      const centerY = height * 0.38 + mouse.y * 45;

      // Central ambient galaxy core nebula glow
      const coreGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.min(width, 950) * 0.48
      );
      coreGradient.addColorStop(0, "rgba(249, 115, 22, 0.12)");
      coreGradient.addColorStop(0.35, "rgba(217, 119, 6, 0.06)");
      coreGradient.addColorStop(0.7, "rgba(245, 158, 11, 0.02)");
      coreGradient.addColorStop(1, "rgba(6, 7, 9, 0)");

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(width, 950) * 0.48, 0, Math.PI * 2);
      ctx.fill();

      // Render star particles with 3D perspective projection
      const fov = 380;
      const visibleStars: { x: number; y: number; radius: number; color: string; alpha: number }[] = [];

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Orbit update
        star.orbitAngle += star.orbitSpeed;
        star.x = Math.cos(star.orbitAngle) * star.orbitRadius;
        star.y = Math.sin(star.orbitAngle) * star.orbitRadius * 0.44;

        // Apply mouse tilt to 3D coordinates
        const tiltX = star.x + mouse.x * (star.z * 0.14);
        const tiltY = star.y + mouse.y * (star.z * 0.14);

        // Perspective scale
        const scale = fov / (fov + star.z);
        if (scale <= 0) continue;

        const projX = centerX + tiltX * scale;
        const projY = centerY + tiltY * scale;

        // Bounds check
        if (projX < -30 || projX > width + 30 || projY < -30 || projY > height + 30) {
          continue;
        }

        // Twinkle calculation
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const currentAlpha = Math.max(0.18, Math.min(1, star.alpha + twinkle * 0.3));
        const currentRadius = Math.max(0.4, star.baseRadius * scale * (1 + twinkle * 0.18));

        // Draw star core
        ctx.beginPath();
        ctx.arc(projX, projY, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${currentAlpha})`;
        ctx.fill();

        // Extra halo bloom for anchor stars
        if (star.baseRadius > 1.3 && currentAlpha > 0.45) {
          ctx.beginPath();
          ctx.arc(projX, projY, currentRadius * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color}, ${currentAlpha * 0.22})`;
          ctx.fill();
        }

        if (star.baseRadius > 1.8) {
          visibleStars.push({
            x: projX,
            y: projY,
            radius: currentRadius,
            color: star.color,
            alpha: currentAlpha,
          });
        }
      }

      // Draw faint constellation connecting threads between anchor stars
      ctx.lineWidth = 0.5;
      for (let a = 0; a < visibleStars.length; a++) {
        for (let b = a + 1; b < visibleStars.length; b++) {
          const dx = visibleStars[a].x - visibleStars[b].x;
          const dy = visibleStars[a].y - visibleStars[b].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 75) {
            const lineAlpha = (1 - dist / 75) * 0.12 * Math.min(visibleStars[a].alpha, visibleStars[b].alpha);
            ctx.strokeStyle = `rgba(249, 115, 22, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(visibleStars[a].x, visibleStars[a].y);
            ctx.lineTo(visibleStars[b].x, visibleStars[b].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-[140vh] overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full opacity-90 transition-opacity duration-1000"
      />
      {/* Bottom fade into Obsidian background */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#060709] pointer-events-none" />
    </div>
  );
}
