"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CinematicPreloaderProps {
  onComplete?: () => void;
}

export function CinematicPreloader({ onComplete }: CinematicPreloaderProps) {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Quick session check if already seen in this session
    const hasSeen = typeof window !== "undefined" ? sessionStorage.getItem("ridam_intro_seen") : null;
    
    // Counter animation target
    const counter = { val: 0 };
    const duration = hasSeen ? 0.6 : 1.3; // Snappy 1.3s on first visit, 0.6s on revisit

    const tl = gsap.timeline({
      onComplete: () => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("ridam_intro_seen", "true");
        }
        setIsDone(true);
        if (onComplete) onComplete();
      },
    });

    // 1. Digital 0 -> 100% counter
    tl.to(counter, {
      val: 100,
      duration: duration,
      ease: "power2.inOut",
      onUpdate: () => {
        const rounded = Math.floor(counter.val);
        setPercent(rounded);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${rounded}%`;
        }
      },
    });

    // 2. Brief hold at 100% and content fade out
    tl.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      ease: "power2.in",
    });

    // 3. Two-layer curtain wipe: Top panel flies up (-100%), Bottom panel flies down (+100%)
    tl.to(
      topPanelRef.current,
      {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
      },
      "+=0.05"
    );

    tl.to(
      bottomPanelRef.current,
      {
        yPercent: 100,
        duration: 0.85,
        ease: "power4.inOut",
      },
      "<" // Run in exact sync with top panel
    );

    // 4. Hide entire root container
    tl.to(rootRef.current, {
      autoAlpha: 0,
      duration: 0.1,
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] overflow-hidden select-none"
      aria-label="Loading portfolio experience"
    >
      {/* Top Curtain Panel (Slides Up) */}
      <div
        ref={topPanelRef}
        className="absolute top-0 inset-x-0 h-1/2 bg-[#060709] border-b border-white/[0.08] shadow-2xl"
      />

      {/* Bottom Curtain Panel (Slides Down) */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 inset-x-0 h-1/2 bg-[#060709] border-t border-white/[0.08] shadow-2xl"
      />

      {/* Center Intro Stage & Numeric Counter */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6"
      >
        {/* Ambient Subtle Amber Halo behind text */}
        <div
          className="pointer-events-none absolute h-64 w-64 rounded-full bg-orange-500/10 blur-[80px]"
          aria-hidden="true"
        />

        {/* System Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-orange-400 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span>PORTFOLIO SYSTEM • 2026</span>
        </div>

        {/* Massive Luxury Numeric Counter */}
        <div className="mt-6 flex items-baseline font-mono text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-sm">
          <span>{percent.toString().padStart(2, "0")}</span>
          <span className="ml-1 text-2xl sm:text-3xl text-orange-400 font-bold">%</span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mt-6 h-[2px] w-48 sm:w-64 rounded-full bg-white/10 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 shadow-sm shadow-orange-500/50 transition-all duration-75"
            style={{ width: "0%" }}
          />
        </div>

        {/* Masked Typography Subtitle */}
        <div className="mt-8 text-center">
          <h2 className="font-serif text-lg sm:text-xl tracking-wide text-zinc-200">
            Ridam Grover
          </h2>
          <p className="mt-1 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500">
            Full-Stack Engineer &amp; Creative Developer
          </p>
        </div>
      </div>
    </div>
  );
}

