"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { soundManager } from "@/lib/sound";
import { personalData } from "@/data/personal";
import {
  ArrowUpRight,
  ArrowDown,
  Mail,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { scrollToTarget } from "@/lib/scroll";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export interface HeroProps {
  imageSrc?: string;
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrambleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // GSAP ScrambleText Cypher Animation (Matrix / Decipher Text Effect)
    let scrambleTimeline: gsap.core.Timeline | null = null;
    if (scrambleRef.current && !prefersReduced) {
      const phrases = [
        "Full-Stack Developer",
        "Next.js & MERN Specialist",
        "Mobile Apps Architect",
        "Creative Systems Engineer",
        "AI & Cloud Solutions Builder",
      ];

      scrambleTimeline = gsap.timeline({ repeat: -1 });

      phrases.forEach((phrase) => {
        scrambleTimeline!
          .to(scrambleRef.current, {
            duration: 0.85,
            scrambleText: {
              text: phrase,
              chars: "!<>-_\\/[]{}—=+*^?#0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
              speed: 0.5,
              revealDelay: 0.15,
            },
            ease: "power2.inOut",
          })
          // Pause / hold on settled text before deciphering into the next role
          .to({}, { duration: 1.6 });
      });
    }

    // Scroll parallax (desktop only to keep 120 FPS native scroll on mobile)
    let ctx: gsap.Context | null = null;
    if (!prefersReduced && heroRef.current && contentRef.current) {
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        ctx = gsap.context(() => {
          gsap.to(contentRef.current, {
            yPercent: -12,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }, heroRef);
      }
    }

    return () => {
      scrambleTimeline?.kill();
      ctx?.revert();
    };
  }, []);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    scrollToTarget(targetId, e);
  };

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-[94vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10 overflow-hidden bg-[#060709] select-none"
    >
      {/* Clean Cyber Grid Background (Sazzad Ali Style - No Orange Dots) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.16] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, #000 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, #000 40%, transparent 85%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Radial Lighting Core */}
      <div
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] max-w-[90vw] h-[380px] bg-emerald-500/[0.04] rounded-full blur-[60px] sm:blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Faint Architectural Hairline Vertical Guides */}
      <div className="hero-grid" aria-hidden="true">
        <div className="w-px h-full bg-white/[0.035]" />
        <div className="w-px h-full bg-white/[0.035]" />
      </div>

      {/* Giant Ambient Watermark (Sazzad Ali Style) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.032] z-0"
      >
        <span className="text-[14vw] font-black uppercase tracking-[0.16em] text-white whitespace-nowrap">
          CREATIVE DEVELOPER
        </span>
      </div>

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between z-10">
        {/* Top Header Status Row */}
        <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-400 pt-2">
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

        {/* Center Stage: Minimalist Headline & GSAP ScrambleText Matrix Engine */}
        <div
          ref={contentRef}
          className="my-auto py-10 sm:py-14 md:py-16 flex flex-col items-center justify-center text-center z-10"
        >
          {/* Main Headline: "Hi, I'm Ridam" */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.2rem] font-extrabold tracking-tight text-white leading-[1.05]"
          >
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_0_40px_rgba(45,212,191,0.35)]">
              Ridam
            </span>
          </motion.h1>

          {/* GSAP ScrambleText Matrix Line (Hacker/Decipher cycling effect) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-4 sm:mt-5 flex items-center justify-center font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]"
          >
            <span
              ref={scrambleRef}
              className="inline-block text-center min-w-[260px] sm:min-w-[360px]"
            >
              Full-Stack Developer
            </span>
            <span className="text-emerald-400 font-mono ml-0.5 animate-pulse select-none">
              _
            </span>
          </motion.div>

          {/* Location Line */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="mt-5 text-sm sm:text-base md:text-lg text-zinc-300 font-sans tracking-wide"
          >
            from India • Available Worldwide
          </motion.p>

          {/* Philosophy / Subtitle Quote */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-2 text-xs sm:text-sm text-zinc-400 font-serif italic tracking-wider"
          >
            &ldquo;One Line of Code at a Time&rdquo;
          </motion.p>

          {/* Call-to-Action Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52 }}
            className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-3.5 z-20"
          >
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-sans font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="size-4" />
            </a>

            <a
              href="#work"
              onClick={(e) => handleScrollTo(e, "#work")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/10 hover:border-emerald-400/50 text-zinc-200 hover:text-white font-sans font-medium text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95"
            >
              <span>Explore Work</span>
              <ArrowDown className="size-3.5 text-emerald-400" />
            </a>
          </motion.div>

          {/* Circular Social Icons Row (Sazzad Ali Inspired) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 sm:mt-7 flex items-center justify-center gap-3 z-20"
          >
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              aria-label="LinkedIn Profile"
              className="size-10 rounded-full border border-white/15 bg-white/[0.04] hover:bg-emerald-500/15 hover:border-emerald-400/50 text-zinc-400 hover:text-emerald-300 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
            >
              <LinkedInIcon className="size-4" />
            </a>

            <a
              href={personalData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              aria-label="Instagram Profile"
              className="size-10 rounded-full border border-white/15 bg-white/[0.04] hover:bg-emerald-500/15 hover:border-emerald-400/50 text-zinc-400 hover:text-emerald-300 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
            >
              <InstagramIcon className="size-4" />
            </a>

            <a
              href={`mailto:${personalData.email}`}
              onClick={() => soundManager.playClick()}
              aria-label="Send Email"
              className="size-10 rounded-full border border-white/15 bg-white/[0.04] hover:bg-emerald-500/15 hover:border-emerald-400/50 text-zinc-400 hover:text-emerald-300 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
            >
              <Mail className="size-4" />
            </a>

            <a
              href={personalData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              aria-label="WhatsApp Contact"
              className="size-10 rounded-full border border-white/15 bg-white/[0.04] hover:bg-emerald-500/15 hover:border-emerald-400/50 text-zinc-400 hover:text-emerald-300 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
            >
              <MessageCircle className="size-4" />
            </a>
          </motion.div>
        </div>

        {/* Bottom Scroll Prompt Indicator */}
        <div className="pt-4 flex flex-col items-center justify-center text-zinc-500 z-10">
          <a
            href="#about"
            onClick={(e) => handleScrollTo(e, "#about")}
            aria-label="Scroll to discover"
            className="group flex flex-col items-center gap-1 text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <ChevronDown className="size-5 text-emerald-400 animate-bounce" />
          </a>
        </div>
      </div>

      {/* Smooth gradient transition into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#060709] via-[#060709]/75 to-transparent pointer-events-none z-10" />
    </section>
  );
}

export const HeroSection = Hero;
