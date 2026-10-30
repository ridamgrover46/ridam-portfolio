"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundManager } from "@/lib/sound";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { HalftonePortrait } from "@/components/three/HalftonePortrait";

export interface HeroProps {
  imageSrc?: string;
  onOpenResume?: () => void;
}

export function Hero({
  imageSrc = "/images/ridam-portrait.webp",
  onOpenResume,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMotionEnabled, setIsMotionEnabled] = useState(false);

  // GSAP ScrollTrigger for smooth scale, parallax position, and opacity fade into About section
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !heroRef.current || !portraitRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Animate portrait scale, position, and opacity as the user scrolls into next section
      tl.to(
        portraitRef.current,
        {
          scale: 1.10,
          yPercent: -12,
          opacity: 0,
          ease: "none",
        },
        0
      );

      // Subtle parallax on text typography
      if (contentRef.current) {
        tl.to(
          contentRef.current,
          {
            yPercent: -18,
            opacity: 0.15,
            ease: "none",
          },
          0
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    soundManager.playClick();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMotion = () => {
    soundManager.playClick();
    setIsMotionEnabled((prev) => !prev);
  };

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-screen flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-10 overflow-hidden bg-[#060709] select-none"
    >
      {/* 4 Architectural Hairline Vertical Guides */}
      <div className="hero-grid" aria-hidden="true">
        <div className="w-px h-full bg-white/[0.035]" />
        <div className="w-px h-full bg-white/[0.035]" />
      </div>

      {/* Editorial Studio Portrait Backdrop — Positioned cleanly with face in upper focal area */}
      <div
        ref={portraitRef}
        className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden z-0 pt-16 sm:pt-20 md:pt-24"
        aria-hidden="true"
      >
        <div className="relative w-[340px] sm:w-[460px] md:w-[560px] lg:w-[640px] h-[520px] sm:h-[640px] md:h-[740px] lg:h-[820px]">
          <HalftonePortrait
            imageSrc={imageSrc}
            density={115}
            isMotionEnabled={isMotionEnabled}
          />
        </div>
      </div>

      {/* Hero Foreground Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between z-10">
        {/* Top Header Row (Matching Sarthak Sharma editorial style) */}
        <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-400 pt-3">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5"
          >
            <i className="live-dot" />
            <span className="text-zinc-300 font-medium tracking-[0.25em]">
              ENGINEER. FREELANCER. BUILDER.
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden sm:block text-zinc-500 font-mono tracking-[0.2em]"
          >
            <span>BASED IN INDIA · AVAILABLE GLOBALLY</span>
          </motion.div>
        </div>

        {/* Lower Stage: Kicker + Oversized Name + Subtitle + CTAs (Positioned in lower half so face is 100% uncovered) */}
        <div
          ref={contentRef}
          className="relative mt-auto pt-4 pb-4 sm:pb-6 md:pb-8 flex flex-col items-center justify-end z-10"
        >
          {/* Left Metadata Column (01 / PRESENCE) */}
          <div className="hidden lg:flex absolute left-0 bottom-12 flex-col gap-6 text-[11px] font-mono tracking-widest text-zinc-500 z-20">
            <div>
              <span className="text-orange-500 font-semibold block text-xs tracking-[0.25em]">
                01 / PRESENCE
              </span>
              <span className="text-orange-400 text-lg mt-1 block font-light">+</span>
            </div>

            <div className="flex flex-col gap-2 uppercase text-[10px] text-zinc-400">
              <span className="hover:text-white transition-colors">FULL-STACK WEB</span>
              <span className="hover:text-white transition-colors">NEXT.JS &amp; MERN</span>
              <span className="hover:text-white transition-colors">IOS &amp; ANDROID APPS</span>
              <span className="hover:text-white transition-colors">FREELANCE CONTRACTS</span>
            </div>
          </div>

          {/* Center Column: Signal Kicker + Oversized Elegant Serif Typography + Subtitle + Functional CTAs */}
          <div className="relative w-full max-w-5xl flex flex-col items-center text-center">
            {/* Kicker positioned right below the chin / at collarbone level */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-2 sm:mb-3"
            >
              <span className="signal-text">
                A HUMAN PERSPECTIVE ON TECHNOLOGY
              </span>
            </motion.div>

            {/* Oversized Elegant Serif Typography: Ridam Grover across chest and shoulders */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2 }}
              className="relative z-10 font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] tracking-tight leading-[0.9] text-white drop-shadow-2xl"
            >
              <span className="line-mask">
                <span className="reveal-line">
                  Ridam{" "}
                  <em className="italic font-normal text-zinc-200">Grover</em>
                </span>
              </span>
            </motion.h1>

            {/* Subtitle statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base md:text-lg text-zinc-300 font-sans tracking-wide leading-relaxed px-4"
            >
              Full-Stack Developer | Creative Engineer
            </motion.p>

            {/* Two Functional Calls to Action: Explore My Work & Let's Talk */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-4 z-20"
            >
              <a
                href="#work"
                onClick={(e) => handleScrollTo(e, "#work")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-black/60 hover:bg-white hover:text-black text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                <span>Explore My Work</span>
                <ArrowDown className="size-3.5" />
              </a>

              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-300"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="size-3.5 text-orange-400" />
              </a>

              {onOpenResume && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenResume();
                  }}
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-3 rounded-full border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Curriculum Vitae</span>
                </button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono tracking-widest uppercase text-zinc-500">
          <a
            href="#about"
            onClick={(e) => handleScrollTo(e, "#about")}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <span className="w-5 h-px bg-zinc-600" />
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="size-3 text-orange-400 animate-bounce" />
          </a>

          <span className="hidden md:inline text-zinc-600">
            SHIPPING &amp; SCALING SINCE 2021
          </span>

          <span className="text-zinc-400">
            AN ONGOING EXPLORATION ↗
          </span>
        </div>
      </div>

      {/* Floating Bottom-Right Motion Control (Exact replica of Sarthak Sharma reference) */}
      <button
        type="button"
        onClick={toggleMotion}
        aria-label={
          isMotionEnabled
            ? "Motion on — disable animations"
            : "Motion off — enable animations"
        }
        aria-pressed={isMotionEnabled}
        className="fixed bottom-6 right-6 z-40 hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#0c0d12]/90 border border-white/[0.12] hover:border-white/25 text-[10px] font-mono tracking-widest text-zinc-400 hover:text-white backdrop-blur-md shadow-2xl transition-all select-none group"
      >
        <span className="text-[9px] text-zinc-400 group-hover:text-white transition-colors">
          {isMotionEnabled ? "⏸" : "▷"}
        </span>
        <span className="text-zinc-300 group-hover:text-white tracking-[0.16em]">
          {isMotionEnabled ? "MOTION ON" : "MOTION OFF"}
        </span>
      </button>

      {/* Smooth gradient transition into the About section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#060709] via-[#060709]/80 to-transparent pointer-events-none z-10" />
    </section>
  );
}

// Named alias for backward compatibility
export const HeroSection = Hero;
