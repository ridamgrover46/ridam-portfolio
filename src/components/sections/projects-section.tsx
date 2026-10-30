"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundManager } from "@/lib/sound";
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Lock,
  X,
  Layers,
  Play,
  Pause,
  Volume2,
  Smartphone,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const DESKTOP = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

export const GALLERY_PROJECTS = [
  {
    id: "01",
    slug: "radiotangy",
    name: "RadioTangy Audio Stories",
    category: "AUDIO & MEDIA STREAMING",
    filterType: "fullstack",
    subtitle: "High-fidelity episodic audio platform with waveform seeking & protected access",
    copy: "Production audio storytelling platform engineered with Next.js App Router, Supabase, and PostgreSQL, featuring season/episode hierarchies, persistent playback engine, and protected media delivery.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "HTML5 Web Audio"],
    image: "/images/projects/radiotangy.svg",
    url: "radiotangy.com/series/whispers",
    themeColor: "rgba(249, 115, 22, 0.4)",
    isAudioDemo: true,
    highlights: [
      "Persistent Audio Playback Engine",
      "Signed Media Access Tokens & RLS",
      "Hierarchical Season & Episode Navigation",
      "Lossless 320kbps Spatial Audio Buffer",
    ],
  },
  {
    id: "02",
    slug: "logistics-crm",
    name: "Logistics CRM & Freight Suite",
    category: "SUPPLY CHAIN & DISPATCH",
    filterType: "fullstack",
    subtitle: "Real-time dispatch telemetry, carrier compliance & load tracking",
    copy: "Centralized operational CRM for freight brokerages managing carrier onboarding, live dispatch boards, broker teams, and third-party VoIP and email integrations.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "REST APIs", "Tailwind CSS"],
    image: "/images/projects/logistics-crm.svg",
    url: "freight-crm.app/dispatch/live-board",
    themeColor: "rgba(249, 115, 22, 0.4)",
    highlights: [
      "Active Load Dispatch Telemetry Board",
      "Carrier Compliance & FMCSA Verification",
      "RingCentral VoIP Direct-Dial Pipeline",
      "Role-Based Access Control (RBAC)",
    ],
  },
  {
    id: "03",
    slug: "zenith-mobile",
    name: "Zenith Mobile Suite (iOS & Android)",
    category: "CROSS-PLATFORM MOBILE APPS",
    filterType: "mobile",
    subtitle: "Native iOS & Android mobile ecosystem with 100% App Store & Google Play approval",
    copy: "Cross-platform mobile apps engineered with React Native and Expo, featuring biometric FaceID unlock, offline SQLite caching, 60 FPS Reanimated animations, and zero-rejection first-pass store approvals.",
    tags: ["React Native", "Expo EAS", "iOS Swift", "Android Kotlin", "SQLite"],
    image: "/images/projects/mobile-apps.svg",
    url: "zenith-mobile.app/v3.4.0",
    themeColor: "rgba(249, 115, 22, 0.4)",
    storeBadges: [
      { label: "Apple App Store Verified", sub: "100% First-Pass Human Review", icon: "apple" },
      { label: "Google Play Console Approved", sub: "Production Release Track", icon: "play" },
    ],
    highlights: [
      "100% First-Pass App Store & Play Store Approval",
      "60 FPS Native Reanimated Physics & Gesture Engine",
      "Biometric FaceID & Secure Enclave Credential Vault",
      "Offline-First SQLite Cache with Optimistic Synchronization",
    ],
  },
  {
    id: "04",
    slug: "ecommerce-platform",
    name: "Nexus E-Commerce Platform",
    category: "RETAIL & COMMERCE",
    filterType: "fullstack",
    subtitle: "Headless MERN shopping architecture with Google OAuth & JWT",
    copy: "Modern full-stack shopping portal with dynamic category filtering, persistent cart state, Google OAuth 2.0 authentication, and merchant admin inventory management.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Ant Design"],
    image: "/images/projects/ecommerce.svg",
    url: "store.nexus-commerce.app/catalog",
    themeColor: "rgba(249, 115, 22, 0.4)",
    highlights: [
      "Dual Auth: Google OAuth 2.0 & JWT",
      "Dynamic Multi-Attribute Filter Matrix",
      "Persistent Local & Cloud Cart Sync",
      "Merchant Admin Control Console",
    ],
  },
  {
    id: "05",
    slug: "gadgetsworld",
    name: "GadgetsWorld Spec Engine",
    category: "HARDWARE & BENCHMARKS",
    filterType: "systems",
    subtitle: "Consumer electronics discovery & side-by-side spec comparison matrix",
    copy: "Snappy consumer tech discovery web app built with React and Tailwind CSS, offering instant hardware spec benchmarking, dynamic search, and responsive filtering.",
    tags: ["React.js", "Tailwind CSS", "Context API", "Responsive UI"],
    image: "/images/projects/gadgetsworld.svg",
    url: "gadgetsworld.dev/compare/flagships",
    themeColor: "rgba(249, 115, 22, 0.4)",
    highlights: [
      "Side-by-Side Benchmark Spec Matrix",
      "Real-Time Instant Search Filter",
      "Adaptive Mobile Table Pivoting",
      "Zero-Latency Client Calculations",
    ],
  },
  {
    id: "06",
    slug: "face-attendance",
    name: "Face Recognition Attendance",
    category: "COMPUTER VISION & AI",
    filterType: "systems",
    subtitle: "Automated biometric attendance platform using Python & OpenCV",
    copy: "Automated biometric attendance tracking system using Python, OpenCV, and NumPy that detects facial features via webcam feed, verifies identities, and logs timestamped records.",
    tags: ["Python", "OpenCV", "NumPy", "SQLite", "Computer Vision"],
    image: "/images/projects/face-attendance.svg",
    url: "vision-auth.local/camera-feed/stream:0",
    themeColor: "rgba(249, 115, 22, 0.4)",
    highlights: [
      "Real-Time Facial Landmark Tracking",
      "128-Dimensional Deep Embeddings",
      "Automated SQLite Database Logging",
      "Anti-Spoofing Verification Checks",
    ],
  },
];

const FILTER_TABS = [
  { id: "all", label: "All Work", count: 6 },
  { id: "fullstack", label: "Full-Stack Web", count: 3 },
  { id: "mobile", label: "Mobile Apps (iOS & Android)", count: 1 },
  { id: "systems", label: "Systems & AI", count: 2 },
];

export function ProjectsSection() {
  const root = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<
    (typeof GALLERY_PROJECTS)[number] | null
  >(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Interactive Audio Waveform Simulation State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioElapsed, setAudioElapsed] = useState(84); // 01:24 in seconds
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  // Toggle ambient audio waveform demo
  const toggleAudioDemo = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();

    if (isPlayingAudio) {
      // Stop
      try {
        oscNodesRef.current.forEach((node) => node.stop());
        oscNodesRef.current = [];
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
          audioCtxRef.current = null;
        }
      } catch {
        // Safe fallback
      }
      setIsPlayingAudio(false);
    } else {
      // Start calm harmonic synthesizer simulation
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
        masterGain.connect(ctx.destination);

        // Low ambient chord: 220Hz (A3), 330Hz (E4)
        const osc1 = ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(220, ctx.currentTime);
        osc1.connect(masterGain);
        osc1.start();

        const osc2 = ctx.createOscillator();
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(329.63, ctx.currentTime);
        osc2.connect(masterGain);
        osc2.start();

        oscNodesRef.current = [osc1, osc2];
      } catch {
        // AudioContext not available or blocked
      }
      setIsPlayingAudio(true);
    }
  };

  // Timer increment while playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioElapsed((prev) => (prev >= 255 ? 84 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      try {
        oscNodesRef.current.forEach((n) => n.stop());
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
        }
      } catch {
        // Ignore cleanup error
      }
    };
  }, []);

  const formatAudioTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(DESKTOP, () => {
      if (!root.current) return;
      const track = root.current.querySelector<HTMLElement>(".gallery-stage");
      const cards = gsap.utils.toArray<HTMLElement>(".gallery-card");
      const bgLayer = root.current.querySelector<HTMLElement>(".gallery-bg-layer");
      const glowPrimary = root.current.querySelector<HTMLElement>(".gallery-glow-primary");
      const glowSecondary = root.current.querySelector<HTMLElement>(".gallery-glow-secondary");

      if (!track || !cards.length) return;

      const distance = () => track.scrollWidth - window.innerWidth;

      // Pin the section and slide the track sideways with scroll
      const move = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: ".gallery-pin",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Background word drift with subtle parallax
      gsap.to(".gallery-word", {
        xPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: true,
        },
      });

      // Ambient atmosphere lighting: gentle shifts in warm amber, dark bronze, and obsidian
      if (bgLayer) {
        const bgTl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
          },
        });

        bgTl
          .to(bgLayer, {
            background:
              "radial-gradient(ellipse at 50% 25%, rgba(249, 115, 22, 0.08) 0%, rgba(6, 7, 9, 0.96) 65%, #060709 100%)",
            duration: 1,
          })
          .to(bgLayer, {
            background:
              "radial-gradient(ellipse at 50% 25%, rgba(217, 119, 6, 0.08) 0%, rgba(6, 7, 9, 0.96) 65%, #060709 100%)",
            duration: 1,
          })
          .to(bgLayer, {
            background:
              "radial-gradient(ellipse at 50% 25%, rgba(245, 158, 11, 0.07) 0%, rgba(6, 7, 9, 0.96) 65%, #060709 100%)",
            duration: 1,
          });
      }

      if (glowPrimary && glowSecondary) {
        const glowTl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
          },
        });

        glowTl
          .to(
            glowPrimary,
            {
              xPercent: 40,
              background: "radial-gradient(circle, rgba(249, 115, 22, 0.14), transparent 70%)",
              duration: 1,
            },
            0
          )
          .to(
            glowSecondary,
            {
              xPercent: -40,
              background: "radial-gradient(circle, rgba(217, 119, 6, 0.10), transparent 70%)",
              duration: 1,
            },
            0
          )
          .to(
            glowPrimary,
            {
              xPercent: 80,
              background: "radial-gradient(circle, rgba(245, 158, 11, 0.12), transparent 70%)",
              duration: 1,
            },
            1
          )
          .to(
            glowSecondary,
            {
              xPercent: -80,
              background: "radial-gradient(circle, rgba(234, 88, 12, 0.09), transparent 70%)",
              duration: 1,
            },
            1
          );
      }

      // Card scale & 3D tilt effects
      cards.forEach((card) => {
        const st = { trigger: card, containerAnimation: move, scrub: true };

        gsap.fromTo(
          card,
          { scale: 0.9, rotateY: -12, autoAlpha: 0.7 },
          {
            scale: 1,
            rotateY: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: { ...st, start: "left right", end: "center center" },
          }
        );

        gsap.to(card, {
          scale: 0.92,
          rotateY: 12,
          autoAlpha: 0.75,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { ...st, start: "center center", end: "right left" },
        });
      });

      // Refresh ScrollTrigger once images finish loading
      const imgs = root.current.querySelectorAll("img");
      imgs.forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
        }
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={root}
        className="gallery border-t border-white/[0.08]"
        id="work"
        aria-label="Selected work"
      >
        <div className="gallery-pin">
          {/* Dynamic Shifting Dark Obsidian Background Layer */}
          <div className="gallery-bg-layer" aria-hidden="true" />

          {/* Warm Amber & Gold Ambient Atmosphere Orbs */}
          <span className="gallery-glow-primary" aria-hidden="true" />
          <span className="gallery-glow-secondary" aria-hidden="true" />

          {/* Section Eyebrow & Intro Header */}
          <div className="gallery-intro">
            <div className="eyebrow inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-orange-400 font-mono text-xs tracking-[0.2em] uppercase backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-orange-400" />
              <span>02 / SELECTED WORK &amp; CASE STUDIES</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2.5">
              <div>
                <p className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl max-w-2xl drop-shadow-sm font-sans">
                  Production software engineered for founders, scale, and daily operations.
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl font-sans">
                  Full-stack Next.js web applications, cross-platform mobile apps with verified App Store approvals, and secure architectures.
                </p>
              </div>

              <Link
                href="/work"
                onClick={() => soundManager.playClick()}
                className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 hover:text-orange-300 font-semibold transition-colors shrink-0"
              >
                <span>View all case studies</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Quick Filter Segmented Pills */}
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-1 border-t border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mr-1 hidden sm:inline">
                Filter:
              </span>
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveFilter(tab.id);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] transition-all cursor-pointer ${
                      isActive
                        ? "bg-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/25"
                        : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? "bg-slate-950/20 text-slate-950" : "bg-white/10 text-zinc-400"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Giant Outlined Background Typography with Smooth Parallax Drift */}
          <div className="gallery-word-wrapper" aria-hidden="true">
            <h2 className="gallery-word">SELECTED WORK</h2>
          </div>

          {/* Horizontal Pinned Track & 3D Cards */}
          <div className="gallery-stage">
            {GALLERY_PROJECTS.map((p, i) => {
              const matchesFilter =
                activeFilter === "all" ||
                activeFilter === p.filterType ||
                (activeFilter === "fullstack" && p.filterType === "fullstack") ||
                (activeFilter === "mobile" && p.filterType === "mobile") ||
                (activeFilter === "systems" && p.filterType === "systems");

              return (
                <figure
                  className={`gallery-card group cursor-pointer transition-all duration-500 ${
                    !matchesFilter ? "opacity-35 scale-95 grayscale" : "opacity-100"
                  }`}
                  key={p.name}
                  onPointerDown={(e) => {
                    startPosRef.current = { x: e.clientX, y: e.clientY };
                    isDraggingRef.current = false;
                  }}
                  onPointerMove={(e) => {
                    if (
                      Math.hypot(
                        e.clientX - startPosRef.current.x,
                        e.clientY - startPosRef.current.y
                      ) > 8
                    ) {
                      isDraggingRef.current = true;
                    }
                  }}
                  onClick={() => {
                    if (!isDraggingRef.current) {
                      soundManager.playClick();
                      setSelectedProject(p);
                    }
                  }}
                >
                  {/* Browser Glass Bar with traffic lights & simulated URL */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#0c0e16]/95 px-3.5 py-2 backdrop-blur-md">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-rose-500/90 shadow-sm shadow-rose-500/50" />
                      <span className="h-2 w-2 rounded-full bg-amber-500/90 shadow-sm shadow-amber-500/50" />
                      <span className="h-2 w-2 rounded-full bg-emerald-500/90 shadow-sm shadow-emerald-500/50" />
                      <div className="ml-1.5 flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[9.5px] text-zinc-300">
                        <Lock className="h-2 w-2 text-orange-400" />
                        <span className="truncate max-w-[140px] sm:max-w-[200px]">
                          {p.url}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-wider text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                        LIVE 0{i + 1}
                      </span>
                    </div>
                  </div>

                  {/* High-Resolution Project Media View */}
                  <div className="gallery-media relative overflow-hidden bg-slate-950 aspect-[16/10]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={1280}
                      height={800}
                      priority={i < 2}
                      className="h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {/* Subtle interactive hover highlight */}
                    <div className="pointer-events-none absolute inset-0 bg-orange-500/0 transition-colors duration-300 group-hover:bg-orange-500/[0.04]" />

                    {/* Official App Store & Google Play Badges Floating Overlay for Mobile App Project */}
                    {p.storeBadges && (
                      <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 z-10">
                        <div className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-black/80 px-2 py-0.5 text-[8.5px] font-bold text-white shadow-xl backdrop-blur-md">
                          <Smartphone className="size-2.5 text-white" />
                          <span> App Store Verified</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-black/80 px-2 py-0.5 text-[8.5px] font-bold text-emerald-300 shadow-xl backdrop-blur-md">
                          <ShieldCheck className="size-2.5 text-emerald-400" />
                          <span>▶ Google Play Approved</span>
                        </div>
                      </div>
                    )}

                    {/* Interactive Audio Waveform Simulation Overlay on RadioTangy Card */}
                    {p.isAudioDemo && (
                      <div className="absolute bottom-2 inset-x-2 rounded-lg border border-orange-500/30 bg-[#090b12]/92 p-2 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-2.5 z-10">
                        {/* Play / Pause Toggle Button */}
                        <button
                          type="button"
                          onClick={toggleAudioDemo}
                          className="flex items-center justify-center size-7 rounded-md bg-orange-500 text-slate-950 hover:bg-orange-400 transition-transform active:scale-90 shadow-md shadow-orange-500/30 shrink-0 cursor-pointer"
                          aria-label={isPlayingAudio ? "Pause Audio Preview" : "Play Audio Preview"}
                        >
                          {isPlayingAudio ? (
                            <Pause className="size-3.5 fill-current" />
                          ) : (
                            <Play className="size-3.5 fill-current ml-0.5" />
                          )}
                        </button>

                        {/* Animated Waveform Visualizer Bars */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-[9px] font-mono mb-0.5">
                            <span className="text-white font-bold truncate">
                              Ep 4: The Midnight Signal
                            </span>
                            <span className="text-orange-400 font-bold shrink-0 ml-1.5">
                              {formatAudioTime(audioElapsed)} / 04:15
                            </span>
                          </div>

                          <div className="flex items-center gap-0.5 h-3.5 overflow-hidden">
                            {[
                              10, 20, 14, 26, 12, 22, 18, 12, 22, 28, 16, 12, 24, 18, 30, 14, 22,
                              12, 26, 16, 12, 20, 14, 18,
                            ].map((h, barIdx) => (
                              <span
                                key={barIdx}
                                className={`w-0.5 rounded-full transition-all duration-300 ${
                                  isPlayingAudio
                                    ? "bg-gradient-to-t from-orange-500 to-amber-300 animate-pulse"
                                    : "bg-white/20"
                                }`}
                                style={{
                                  height: isPlayingAudio
                                    ? `${Math.max(4, (h * ((barIdx % 3) + 1)) % 16)}px`
                                    : `${Math.max(3, h * 0.35)}px`,
                                  animationDelay: `${barIdx * 45}ms`,
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Badge */}
                        <div className="hidden sm:flex items-center gap-1 text-[8px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-1.5 py-0.5 rounded shrink-0">
                          <Volume2 className="size-2.5" />
                          <span>320k</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dedicated Project Caption Bar */}
                  <figcaption className="gallery-caption border-t border-white/10 bg-[#0b0d14]/95 px-4 py-3 backdrop-blur-xl">
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[9px] font-bold tracking-widest text-orange-400 uppercase">
                          0{i + 1} / 0{GALLERY_PROJECTS.length}
                        </span>
                        <span className="text-white/20">•</span>
                        <span className="font-mono text-[8.5px] font-semibold text-zinc-400 uppercase tracking-wider truncate">
                          {p.category}
                        </span>
                      </div>

                      <h3 className="mt-0.5 text-sm sm:text-[15px] font-bold text-white tracking-tight truncate group-hover:text-orange-300 transition-colors font-sans">
                        {p.name}
                      </h3>

                      <p className="mt-0.5 line-clamp-1 text-[11px] text-zinc-400 font-sans">
                        {p.subtitle}
                      </p>

                      {/* Tech Pills */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {p.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[8.5px] text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                        {p.tags.length > 3 && (
                          <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[8.5px] text-zinc-400">
                            +{p.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      className="gallery-btn self-center transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-slate-950 group-hover:border-orange-400 group-hover:shadow-orange-500/40 shadow-lg"
                      aria-label={`View ${p.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.playClick();
                        setSelectedProject(p);
                      }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        {selectedProject && (
          <DialogContent className="max-w-2xl sm:max-w-3xl max-h-[88vh] overflow-y-auto border border-orange-500/30 bg-[#090b10]/98 p-0 text-white backdrop-blur-2xl shadow-2xl rounded-2xl sm:rounded-3xl z-50">
            {/* Custom High-Contrast Floating Close Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedProject(null);
              }}
              className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-black hover:border-orange-400 focus:outline-none cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10 bg-slate-950">
              <Image
                src={selectedProject.image}
                alt={selectedProject.name}
                fill
                className="object-cover object-left-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-black/30 pointer-events-none" />
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-orange-400 uppercase tracking-widest font-semibold">
                  <span>PROJECT {selectedProject.id}</span>
                  <span>•</span>
                  <span>{selectedProject.category}</span>
                </div>
                <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
                  {selectedProject.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed font-sans">
                  {selectedProject.copy}
                </p>
              </div>

              {/* Official Store Seals if present */}
              {selectedProject.storeBadges && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {selectedProject.storeBadges.map((badge) => (
                    <div
                      key={badge.label}
                      className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5"
                    >
                      <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-bold shrink-0">
                        <Check className="size-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{badge.label}</div>
                        <div className="text-[10px] font-mono text-emerald-300">{badge.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-3 font-semibold">
                  KEY ARCHITECTURAL HIGHLIGHTS:
                </h4>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {selectedProject.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-zinc-200"
                    >
                      <CheckCircle2 className="h-4 w-4 text-orange-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-1 font-mono text-xs font-medium text-orange-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
                <Link
                  href={`/work/${selectedProject.slug}`}
                  onClick={() => soundManager.playClick()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-orange-400 hover:underline"
                >
                  <Layers className="size-3.5" />
                  <span>Open Full Case Study Page</span>
                  <ExternalLink className="size-3" />
                </Link>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedProject(null);
                    }}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedProject(null);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-orange-500/30 transition-transform hover:scale-[1.03]"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Scoped CSS Styles with Obsidian Dark & Warm Amber Theme */}
      <style>{`
        .gallery {
          position: relative;
          background: #060709;
          overflow: hidden;
          transition: background-color 0.8s ease;
        }
        .gallery-pin {
          position: relative;
          padding: 80px 0 120px;
        }
        .gallery-bg-layer {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 25%, rgba(249, 115, 22, 0.06) 0%, rgba(6, 7, 9, 0.96) 65%, #060709 100%);
          pointer-events: none;
          transition: background 0.8s ease;
          z-index: 0;
        }
        .gallery-glow-primary {
          position: absolute;
          left: 10%;
          top: 20%;
          width: 50vw;
          height: 50vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.12), transparent 70%);
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }
        .gallery-glow-secondary {
          position: absolute;
          right: 10%;
          bottom: 15%;
          width: 45vw;
          height: 45vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(217, 119, 6, 0.08), transparent 70%);
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .gallery-word-wrapper {
          position: absolute;
          top: 90px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
          user-select: none;
          z-index: 1;
          overflow: visible;
        }
        .gallery-word {
          font-size: clamp(80px, 15vw, 220px);
          font-weight: 950;
          line-height: 0.9;
          white-space: nowrap;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.06);
          text-shadow: 0 0 50px rgba(249, 115, 22, 0.06);
          letter-spacing: -0.04em;
        }
        .gallery-intro {
          position: relative;
          padding: 0 24px;
          max-width: 1320px;
          margin-left: auto;
          margin-right: auto;
          z-index: 30;
        }

        /* Mobile / reduced-motion fallback: stacked grid */
        .gallery-stage {
          position: relative;
          display: grid;
          gap: 28px;
          width: calc(100% - 40px);
          max-width: 420px;
          margin: 32px auto 0;
          perspective: 1600px;
          z-index: 20;
        }
        .gallery-card {
          position: relative;
          margin: 0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.08);
          background: #0b0d14;
          transform-style: preserve-3d;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .gallery-card:hover {
          box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(249, 115, 22, 0.16), 0 0 0 1px rgba(249, 115, 22, 0.4);
        }
        .gallery-media {
          position: relative;
          overflow: hidden;
          background: #06070a;
        }
        .gallery-caption {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .gallery-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }

        /* Desktop: pinned horizontal scroll with GSAP ScrollTrigger */
        @media (min-width: 768px) and (prefers-reduced-motion: no-preference) {
          .gallery-pin {
            height: 100vh;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .gallery-word-wrapper {
            top: 14vh;
          }
          .gallery-intro {
            position: absolute;
            top: 3.5vh;
            left: 0;
            right: 0;
            margin: 0 auto;
            padding: 0 48px;
            max-width: 1400px;
          }
          .gallery-stage {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            gap: 3.5vw;
            width: max-content;
            margin: 0;
            padding: 24vh 22vw 6vh;
            perspective: 1600px;
            max-width: none;
          }
          .gallery-card {
            position: relative;
            flex: 0 0 auto;
            width: clamp(320px, 28vw, 430px);
          }
        }
      `}</style>
    </>
  );
}
