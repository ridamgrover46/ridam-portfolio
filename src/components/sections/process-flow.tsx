"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PenTool, Code2, Rocket } from "lucide-react";
import { soundManager } from "@/lib/sound";

export function ProcessFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const node1Ref = useRef<SVGCircleElement>(null);
  const node2Ref = useRef<SVGCircleElement>(null);
  const node3Ref = useRef<SVGCircleElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // Set initial stroke dasharray and offset for drawing effect
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1,
    });

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(path, { strokeDashoffset: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      // Scrubbed Timeline: directly tied to scroll position (fast, snappy, responsive)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: isMobile ? "top 85%" : "top 78%",
          end: isMobile ? "center 65%" : "center 52%",
          scrub: isMobile ? 0.1 : 0.35, // Instant 0-lag scrub on mobile
        },
      });

      // 1. Draw the undulating curved line from left to right synced with scroll
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          ease: "none",
        },
        0
      );

      // 2. Pulse & scale the 3 waypoint nodes as the line passes through them
      if (node1Ref.current) {
        tl.fromTo(
          node1Ref.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, ease: "power2.out" },
          0.12
        );
      }

      if (node2Ref.current) {
        tl.fromTo(
          node2Ref.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, ease: "power2.out" },
          0.46
        );
      }

      if (node3Ref.current) {
        tl.fromTo(
          node3Ref.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, ease: "power2.out" },
          0.8
        );
      }

      // 3. Reveal the 3 compact cards underneath in a staggered sequence synced with scroll
      const cards = cardsRef.current?.querySelectorAll(".process-card");
      if (cards && cards.length) {
        tl.fromTo(
          cards,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power2.out",
          },
          0.2
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 relative bg-[#060709] border-t border-white/[0.06] overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Mission Statement (Matching Sazzad Ali Reference) */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed tracking-tight">
            Whether it&apos;s crafting full-stack web applications, designing intuitive
            interfaces or delivering scalable software — I thrive where design
            meets functionality, and make sure everything I touch is fast,
            accessible and future-ready.
          </p>
        </div>

        {/* ----------------- UNDULATING CURVED SVG LINE WITH 3 NODES ----------------- */}
        <div className="relative w-full mb-2 sm:mb-4">
          <svg
            viewBox="0 0 1000 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Glowing Mint-Teal Gradient Beam (Sazzad Ali Aesthetic) */}
              <linearGradient id="emerald-curve-beam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.2" />
                <stop offset="25%" stopColor="#2dd4bf" />
                <stop offset="50%" stopColor="#34d399" />
                <stop offset="80%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Faint Background Guide Path */}
            <path
              d="M 40,75 C 90,75 130,50 167,50 C 210,50 260,75 330,80 C 400,85 460,50 500,50 C 540,50 620,25 680,25 C 750,25 790,50 833,50 C 870,50 910,75 960,75"
              stroke="#ffffff"
              strokeOpacity="0.06"
              strokeWidth="2"
              fill="none"
            />

            {/* Animated GSAP Undulating Path (Hardware Accelerated Drop Shadow) */}
            <path
              ref={pathRef}
              d="M 40,75 C 90,75 130,50 167,50 C 210,50 260,75 330,80 C 400,85 460,50 500,50 C 540,50 620,25 680,25 C 750,25 790,50 833,50 C 870,50 910,75 960,75"
              stroke="url(#emerald-curve-beam)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              className="drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]"
            />

            {/* Waypoint Node 1: Above Design (x: 167, y: 50) */}
            <g transform="translate(167, 50)" className="drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]">
              <circle
                ref={node1Ref}
                r="9"
                fill="#060709"
                stroke="#2dd4bf"
                strokeWidth="2.5"
              />
              <circle r="4" fill="#2dd4bf" />
            </g>

            {/* Waypoint Node 2: Above Develop (x: 500, y: 50) */}
            <g transform="translate(500, 50)" className="drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]">
              <circle
                ref={node2Ref}
                r="9"
                fill="#060709"
                stroke="#34d399"
                strokeWidth="2.5"
              />
              <circle r="4" fill="#34d399" />
            </g>

            {/* Waypoint Node 3: Above Deliver (x: 833, y: 50) */}
            <g transform="translate(833, 50)" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]">
              <circle
                ref={node3Ref}
                r="9"
                fill="#060709"
                stroke="#10b981"
                strokeWidth="2.5"
              />
              <circle r="4" fill="#10b981" />
            </g>
          </svg>
        </div>

        {/* ----------------- 3 COMPACT PROCESS CARDS (Design, Develop, Deliver) ----------------- */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-4"
        >
          {/* Card 01: Design */}
          <div
            className="process-card p-6 sm:p-7 rounded-2xl bg-[#090b12]/85 border border-white/[0.08] hover:border-teal-500/40 transition-all duration-300 group shadow-xl hover:-translate-y-1 relative"
            onMouseEnter={() => soundManager.playHover?.()}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="size-10 rounded-xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                <PenTool className="size-5" />
              </div>
              <span className="font-mono text-xs text-zinc-500 font-semibold tracking-wider">
                01
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-teal-300 transition-colors font-sans">
              Design
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              Intuitive interfaces and design systems with a strong eye for detail, ergonomics, and visual rhythm.
            </p>
          </div>

          {/* Card 02: Develop */}
          <div
            className="process-card p-6 sm:p-7 rounded-2xl bg-[#090b12]/85 border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 group shadow-xl hover:-translate-y-1 relative"
            onMouseEnter={() => soundManager.playHover?.()}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Code2 className="size-5" />
              </div>
              <span className="font-mono text-xs text-zinc-500 font-semibold tracking-wider">
                02
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors font-sans">
              Develop
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              Full-stack web apps with React, Next.js and Node — clean, typed, resilient, and blazing fast.
            </p>
          </div>

          {/* Card 03: Deliver */}
          <div
            className="process-card p-6 sm:p-7 rounded-2xl bg-[#090b12]/85 border border-white/[0.08] hover:border-emerald-400/40 transition-all duration-300 group shadow-xl hover:-translate-y-1 relative"
            onMouseEnter={() => soundManager.playHover?.()}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Rocket className="size-5" />
              </div>
              <span className="font-mono text-xs text-zinc-500 font-semibold tracking-wider">
                03
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors font-sans">
              Deliver
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              Scalable, accessible products shipped with care, App Store &amp; Play Store approvals, and clear communication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
