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
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const DESKTOP = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

export const GALLERY_PROJECTS = [
  {
    id: "01",
    slug: "radiotangy",
    name: "RadioTangy Audio Stories",
    category: "AUDIO & MEDIA STREAMING",
    subtitle: "High-fidelity episodic audio platform with waveform seeking & protected access",
    copy: "Production audio storytelling platform engineered with Next.js App Router, Supabase, and PostgreSQL, featuring season/episode hierarchies, persistent playback engine, and protected media delivery.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    image: "/images/projects/radiotangy.svg",
    url: "radiotangy.com/series/whispers",
    themeColor: "rgba(129, 140, 248, 0.4)",
    highlights: [
      "Persistent Audio Playback Engine",
      "Signed Media Access Tokens",
      "Hierarchical Season & Episode Navigation",
      "Supabase PostgreSQL RLS Policies",
    ],
  },
  {
    id: "02",
    slug: "logistics-crm",
    name: "Logistics CRM & Freight Suite",
    category: "SUPPLY CHAIN & DISPATCH",
    subtitle: "Real-time dispatch telemetry, carrier compliance & load tracking",
    copy: "Centralized operational CRM for freight brokerages managing carrier onboarding, live dispatch boards, broker teams, and third-party VoIP and email integrations.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "REST APIs", "Tailwind CSS"],
    image: "/images/projects/logistics-crm.svg",
    url: "freight-crm.app/dispatch/live-board",
    themeColor: "rgba(16, 185, 129, 0.4)",
    highlights: [
      "Active Load Dispatch Board",
      "Carrier Compliance & Driver Verification",
      "RingCentral VoIP Pipeline (In Dev)",
      "Role-Based Access Control (RBAC)",
    ],
  },
  {
    id: "03",
    slug: "ecommerce-platform",
    name: "Nexus E-Commerce Platform",
    category: "RETAIL & COMMERCE",
    subtitle: "Headless MERN shopping architecture with Google OAuth & JWT",
    copy: "Modern full-stack shopping portal with dynamic category filtering, persistent cart state, Google OAuth 2.0 authentication, and merchant admin inventory management.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Ant Design"],
    image: "/images/projects/ecommerce.svg",
    url: "store.nexus-commerce.app/catalog",
    themeColor: "rgba(244, 63, 94, 0.4)",
    highlights: [
      "Dual Auth: Google OAuth 2.0 & JWT",
      "Dynamic Multi-Attribute Filter Matrix",
      "Persistent Local & Cloud Cart Sync",
      "Merchant Admin Control Console",
    ],
  },
  {
    id: "04",
    slug: "gadgetsworld",
    name: "GadgetsWorld Spec Engine",
    category: "HARDWARE & BENCHMARKS",
    subtitle: "Consumer electronics discovery & side-by-side spec comparison matrix",
    copy: "Snappy consumer tech discovery web app built with React and Tailwind CSS, offering instant hardware spec benchmarking, dynamic search, and responsive filtering.",
    tags: ["React.js", "Tailwind CSS", "Context API", "Responsive UI"],
    image: "/images/projects/gadgetsworld.svg",
    url: "gadgetsworld.dev/compare/flagships",
    themeColor: "rgba(56, 189, 248, 0.4)",
    highlights: [
      "Side-by-Side Spec Matrix",
      "Real-Time Instant Search Filter",
      "Adaptive Mobile Table Pivoting",
      "Zero-Latency Client Calculations",
    ],
  },
  {
    id: "05",
    slug: "face-attendance",
    name: "Face Recognition Attendance",
    category: "COMPUTER VISION & AI",
    subtitle: "Automated biometric attendance platform using Python & OpenCV",
    copy: "Automated biometric attendance tracking system using Python, OpenCV, and NumPy that detects facial features via webcam feed, verifies identities, and logs timestamped records.",
    tags: ["Python", "OpenCV", "NumPy", "SQLite", "Computer Vision"],
    image: "/images/projects/face-attendance.svg",
    url: "vision-auth.local/camera-feed/stream:0",
    themeColor: "rgba(168, 85, 247, 0.4)",
    highlights: [
      "Real-Time Facial Landmark Tracking",
      "128-Dimensional Deep Embeddings",
      "Automated SQLite Database Logging",
      "Anti-Spoofing Verification Checks",
    ],
  },
];

export function ProjectsSection() {
  const root = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<
    (typeof GALLERY_PROJECTS)[number] | null
  >(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

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

      // Background word drift with subtle 3D parallax
      gsap.to(".gallery-word", {
        xPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: true,
        },
      });

      // Dynamic multi-stage background color & ambient aura shifts linked to scroll progress!
      if (bgLayer) {
        const bgTl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
          },
        });

        // Stage 1 (0%): Deep Blue -> Stage 2 (25%): Emerald/Teal -> Stage 3 (50%): Deep Violet -> Stage 4 (75%): Rose/Crimson -> Stage 5 (100%): Sapphire/Cyan
        bgTl
          .to(bgLayer, {
            background: "linear-gradient(135deg, #041416 0%, #062b29 45%, #030712 100%)",
            duration: 1,
          })
          .to(bgLayer, {
            background: "linear-gradient(135deg, #0e071e 0%, #1c0d3a 45%, #030712 100%)",
            duration: 1,
          })
          .to(bgLayer, {
            background: "linear-gradient(135deg, #180812 0%, #2e0d1d 45%, #030712 100%)",
            duration: 1,
          })
          .to(bgLayer, {
            background: "linear-gradient(135deg, #041021 0%, #0a2540 45%, #030712 100%)",
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
              xPercent: 30,
              background: "radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent 70%)",
              duration: 1,
            },
            0
          )
          .to(
            glowSecondary,
            {
              xPercent: -30,
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.35), transparent 70%)",
              duration: 1,
            },
            0
          )
          .to(
            glowPrimary,
            {
              xPercent: 60,
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.45), transparent 70%)",
              duration: 1,
            },
            1
          )
          .to(
            glowSecondary,
            {
              xPercent: -60,
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.35), transparent 70%)",
              duration: 1,
            },
            1
          )
          .to(
            glowPrimary,
            {
              xPercent: 90,
              background: "radial-gradient(circle, rgba(244, 63, 94, 0.4), transparent 70%)",
              duration: 1,
            },
            2
          )
          .to(
            glowSecondary,
            {
              xPercent: -90,
              background: "radial-gradient(circle, rgba(245, 158, 11, 0.35), transparent 70%)",
              duration: 1,
            },
            2
          )
          .to(
            glowPrimary,
            {
              xPercent: 120,
              background: "radial-gradient(circle, rgba(14, 165, 233, 0.45), transparent 70%)",
              duration: 1,
            },
            3
          )
          .to(
            glowSecondary,
            {
              xPercent: -120,
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.35), transparent 70%)",
              duration: 1,
            },
            3
          );
      }

      // Each card scales/rotates into focus at center, tilts away after
      cards.forEach((card) => {
        const st = { trigger: card, containerAnimation: move, scrub: true };

        gsap.fromTo(
          card,
          { scale: 0.88, rotateY: -14, autoAlpha: 0.65 },
          {
            scale: 1,
            rotateY: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: { ...st, start: "left right", end: "center center" },
          }
        );

        gsap.to(card, {
          scale: 0.9,
          rotateY: 14,
          autoAlpha: 0.7,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { ...st, start: "center center", end: "right left" },
        });
      });

      // Recalculate once images finish loading
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
          {/* Dynamic Shifting Full Background Layer */}
          <div className="gallery-bg-layer" aria-hidden="true" />

          {/* Dynamic Shifting Ambient Atmosphere Orbs */}
          <span className="gallery-glow-primary" aria-hidden="true" />
          <span className="gallery-glow-secondary" aria-hidden="true" />

          {/* Section Eyebrow & Intro */}
          <div className="gallery-intro">
            <div className="eyebrow inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-sky-400 font-mono text-xs tracking-[0.2em] uppercase backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>02 / SELECTED WORK</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2.5">
              <p className="text-xl font-extrabold tracking-tight text-white sm:text-2xl lg:text-3xl max-w-2xl drop-shadow-sm">
                Products engineered for scale and daily enterprise operations.
              </p>
              <Link
                href="/work"
                onClick={() => soundManager.playClick()}
                className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-sky-400 hover:text-sky-300 font-semibold"
              >
                <span>View all case studies</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Giant Outlined Background Typography with Smooth Parallax Drift */}
          <div className="gallery-word-wrapper" aria-hidden="true">
            <h2 className="gallery-word">SELECTED WORK</h2>
          </div>

          {/* Horizontal Pinned Track & 3D Cards */}
          <div className="gallery-stage">
            {GALLERY_PROJECTS.map((p, i) => (
              <figure
                className="gallery-card group cursor-pointer"
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
                <div className="flex items-center justify-between border-b border-white/10 bg-[#080d19]/95 px-4 py-2.5 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90 shadow-sm shadow-rose-500/50" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/90 shadow-sm shadow-amber-500/50" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90 shadow-sm shadow-emerald-500/50" />
                    <div className="ml-2 flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-2.5 py-0.5 font-mono text-[10px] text-slate-300">
                      <Lock className="h-2.5 w-2.5 text-emerald-400" />
                      <span className="truncate max-w-[200px] sm:max-w-[280px]">
                        {p.url}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-sky-400 font-bold bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                      LIVE PROJ 0{i + 1}
                    </span>
                  </div>
                </div>

                {/* High-Resolution Crystal Clear Project Media */}
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
                  <div className="pointer-events-none absolute inset-0 bg-sky-500/0 transition-colors duration-300 group-hover:bg-sky-500/5" />
                </div>

                {/* Dedicated Project Caption Bar */}
                <figcaption className="gallery-caption border-t border-white/10 bg-[#090e1a]/95 px-5 py-4 backdrop-blur-xl">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold tracking-widest text-sky-400 uppercase">
                        0{i + 1} / 0{GALLERY_PROJECTS.length}
                      </span>
                      <span className="text-white/20">•</span>
                      <span className="font-mono text-[9px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                        {p.category}
                      </span>
                    </div>
                    <h3 className="mt-1 text-base sm:text-lg font-bold text-white tracking-tight truncate group-hover:text-sky-300 transition-colors">
                      {p.name}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-400">
                      {p.subtitle}
                    </p>

                    {/* Tech Pills */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] text-sky-200/90"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    className="gallery-btn self-center transition-all duration-300 group-hover:scale-110 group-hover:bg-sky-500 group-hover:border-sky-400 group-hover:shadow-sky-500/40 shadow-lg"
                    aria-label={`View ${p.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playClick();
                      setSelectedProject(p);
                    }}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        {selectedProject && (
          <DialogContent className="max-w-2xl sm:max-w-3xl max-h-[88vh] overflow-y-auto border border-sky-500/30 bg-[#0c1220]/95 p-0 text-white backdrop-blur-2xl shadow-2xl rounded-2xl sm:rounded-3xl z-50">
            {/* Custom High-Contrast Floating Close Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedProject(null);
              }}
              className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-black hover:border-sky-400 focus:outline-none cursor-pointer"
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1220] via-transparent to-black/30 pointer-events-none" />
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-widest font-semibold">
                  <span>PROJ {selectedProject.id}</span>
                  <span>•</span>
                  <span>{selectedProject.category}</span>
                </div>
                <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {selectedProject.name}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {selectedProject.copy}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-3 font-semibold">
                  KEY ARCHITECTURAL HIGHLIGHTS:
                </h4>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {selectedProject.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-1 font-mono text-xs font-medium text-sky-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
                <Link
                  href={`/work/${selectedProject.slug}`}
                  onClick={() => soundManager.playClick()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:underline"
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
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedProject(null);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-5 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition-transform hover:scale-[1.03]"
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

      {/* Scoped CSS Styles with Clean Layout Positioning */}
      <style>{`
        .gallery {
          position: relative;
          background: #050b18;
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
          background: linear-gradient(135deg, #050b18 0%, #071a38 45%, #030712 100%);
          pointer-events: none;
          transition: background 0.8s ease;
          z-index: 0;
        }
        .gallery-glow-primary {
          position: absolute;
          left: 10%;
          top: 20%;
          width: 55vw;
          height: 55vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.4), transparent 70%);
          filter: blur(90px);
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
          background: radial-gradient(circle, rgba(6, 182, 212, 0.35), transparent 70%);
          filter: blur(80px);
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
          -webkit-text-stroke: 1.5px rgba(147, 197, 253, 0.25);
          text-shadow: 0 0 40px rgba(56, 189, 248, 0.15);
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
          gap: 40px;
          width: calc(100% - 48px);
          max-width: 680px;
          margin: 40px auto 0;
          perspective: 1600px;
          z-index: 20;
        }
        .gallery-card {
          position: relative;
          margin: 0;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.12);
          background: #080d19;
          transform-style: preserve-3d;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .gallery-card:hover {
          box-shadow: 0 35px 80px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(56, 189, 248, 0.3), 0 0 0 1px rgba(56, 189, 248, 0.5);
        }
        .gallery-media {
          position: relative;
          overflow: hidden;
          background: #020617;
        }
        .gallery-caption {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .gallery-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
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
            top: 4vh;
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
            gap: 6vw;
            width: max-content;
            margin: 0;
            padding: 22vh 20vw 4vh;
            perspective: 1600px;
            max-width: none;
          }
          .gallery-card {
            position: relative;
            flex: 0 0 auto;
            width: min(52vw, 680px);
          }
        }
      `}</style>
    </>
  );
}
