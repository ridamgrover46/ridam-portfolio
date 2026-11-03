"use client";

import React, { useState } from "react";
import { skillsCategories } from "@/data/skills";
import { Reveal } from "@/components/animations/reveal";
import { soundManager } from "@/lib/sound";
import {
  Sparkles,
  CheckCircle2,
  Compass,
  Layers,
  Play,
  Pause,
  Orbit,
  Grid,
  Cpu,
} from "lucide-react";

interface GalaxySkill {
  name: string;
  category: "frontend" | "backend" | "mobile" | "database" | "tools";
  orbit: 1 | 2 | 3;
  angle: number; // Angle in degrees along the orbit
  status: "Core" | "Production" | "Advanced";
  experience: string;
  projects: string;
  color: string;
}

const GALAXY_SKILLS: GalaxySkill[] = [
  // Orbit 1: Inner Core (Frontend & Core Language) - Radius ~130px
  {
    name: "Next.js 15",
    category: "frontend",
    orbit: 1,
    angle: 0,
    status: "Core",
    experience: "App Router, SSR, Server Components",
    projects: "RadioTangy, Logistics CRM",
    color: "#f97316",
  },
  {
    name: "TypeScript",
    category: "frontend",
    orbit: 1,
    angle: 90,
    status: "Core",
    experience: "Strict Generics, Scalable Types",
    projects: "All Production Apps",
    color: "#38bdf8",
  },
  {
    name: "React 19",
    category: "frontend",
    orbit: 1,
    angle: 180,
    status: "Core",
    experience: "Hooks, Concurrent Mode, Virtual DOM",
    projects: "Nexus Store, GadgetsWorld",
    color: "#60a5fa",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    orbit: 1,
    angle: 270,
    status: "Core",
    experience: "Design Systems, Micro-Interactions",
    projects: "Portfolio, RadioTangy",
    color: "#34d399",
  },

  // Orbit 2: Middle Orbit (Backend & Database Systems) - Radius ~215px
  {
    name: "Node.js",
    category: "backend",
    orbit: 2,
    angle: 30,
    status: "Core",
    experience: "Event-driven APIs, Microservices",
    projects: "Logistics CRM, Nexus Commerce",
    color: "#4ade80",
  },
  {
    name: "Supabase",
    category: "database",
    orbit: 2,
    angle: 90,
    status: "Production",
    experience: "PostgreSQL, RLS Security, Edge Auth",
    projects: "RadioTangy Audio Stories",
    color: "#2dd4bf",
  },
  {
    name: "PostgreSQL",
    category: "database",
    orbit: 2,
    angle: 150,
    status: "Core",
    experience: "Relational Schemas, Complex Joins, Indexes",
    projects: "Logistics CRM, RadioTangy",
    color: "#38bdf8",
  },
  {
    name: "Express.js",
    category: "backend",
    orbit: 2,
    angle: 210,
    status: "Core",
    experience: "REST Architecture, Auth Middleware",
    projects: "Nexus E-Commerce Server",
    color: "#fbbf24",
  },
  {
    name: "MongoDB",
    category: "database",
    orbit: 2,
    angle: 270,
    status: "Production",
    experience: "Aggregation Pipelines, Compound Indexes",
    projects: "Nexus E-Commerce Platform",
    color: "#10b981",
  },
  {
    name: "REST APIs",
    category: "backend",
    orbit: 2,
    angle: 330,
    status: "Core",
    experience: "Payload Optimization, Webhooks, VoIP",
    projects: "Freight Telemetry Engine",
    color: "#f97316",
  },

  // Orbit 3: Outer Orbit (Cross-Platform Mobile, Architecture & Cloud) - Radius ~300px
  {
    name: "React Native",
    category: "mobile",
    orbit: 3,
    angle: 15,
    status: "Production",
    experience: "Cross-platform iOS & Android, Reanimated 3",
    projects: "Zenith Mobile Suite",
    color: "#60a5fa",
  },
  {
    name: "iOS App Store",
    category: "mobile",
    orbit: 3,
    angle: 75,
    status: "Production",
    experience: "100% First-Pass Human Review Approvals",
    projects: "Zenith Mobile App",
    color: "#f8fafc",
  },
  {
    name: "Google Play",
    category: "mobile",
    orbit: 3,
    angle: 135,
    status: "Production",
    experience: "Target API 34+, Release Track Orchestration",
    projects: "Fleet Companion App",
    color: "#34d399",
  },
  {
    name: "Expo EAS",
    category: "mobile",
    orbit: 3,
    angle: 195,
    status: "Production",
    experience: "Automated Cloud Builds, OTA Updates",
    projects: "Zenith Mobile Suite",
    color: "#a78bfa",
  },
  {
    name: "Python OpenCV",
    category: "tools",
    orbit: 3,
    angle: 255,
    status: "Advanced",
    experience: "Haar Cascades, Facial Landmark Extraction",
    projects: "Face Recognition Attendance",
    color: "#fbbf24",
  },
  {
    name: "Git & Vercel",
    category: "tools",
    orbit: 3,
    angle: 315,
    status: "Core",
    experience: "CI/CD Deployment Pipelines, Edge CDN",
    projects: "Global Infrastructure",
    color: "#f97316",
  },
];

export function SkillsSection() {
  const [viewMode, setViewMode] = useState<"galaxy" | "grid">("galaxy");
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<GalaxySkill | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("frontend");

  const currentCategoryData =
    skillsCategories.find((c) => c.id === activeCategory) ||
    skillsCategories[0];

  const getStatusBadge = (status: "Professional" | "Exploring" | "Core") => {
    switch (status) {
      case "Core":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="size-3" />
            <span>Core</span>
          </span>
        );
      case "Professional":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Layers className="size-3" />
            <span>Production</span>
          </span>
        );
      case "Exploring":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
            <Compass className="size-3" />
            <span>R&amp;D</span>
          </span>
        );
    }
  };

  const allSkillNames = [
    "Next.js App Router",
    "React 19",
    "React Native",
    "iOS App Store",
    "Google Play Console",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Supabase",
    "PostgreSQL",
    "MongoDB Atlas",
    "Tailwind CSS",
    "GSAP ScrollTrigger",
    "Three.js",
    "REST APIs",
    "Google OAuth 2.0",
    "JWT Security",
    "Python OpenCV",
    "Vercel",
  ];

  return (
    <section id="skills" className="py-24 sm:py-32 relative border-t border-white/[0.08] bg-[#060709] overflow-hidden">
      {/* Background Ambient Cosmic Core Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-orange-500/5 via-amber-500/5 to-transparent blur-[120px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-orange-400 font-mono text-xs tracking-[0.2em] uppercase backdrop-blur-md">
              <Orbit className="h-3.5 w-3.5 text-orange-400" />
              <span>03 / SKILLS GALAXY &amp; ARCHITECTURE</span>
            </div>

            {/* View Mode Controls (Galaxy vs Grid) */}
            <div className="flex items-center gap-2 bg-[#0c0e16] p-1.5 rounded-full border border-white/10 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setViewMode("galaxy");
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono transition-all cursor-pointer ${
                  viewMode === "galaxy"
                    ? "bg-orange-500 text-slate-950 font-bold shadow-md shadow-orange-500/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Orbit className="size-3.5" />
                <span>Galaxy View</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setViewMode("grid");
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-orange-500 text-slate-950 font-bold shadow-md shadow-orange-500/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Grid className="size-3.5" />
                <span>Matrix View</span>
              </button>

              {viewMode === "galaxy" && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setIsOrbitPaused((prev) => !prev);
                  }}
                  title={isOrbitPaused ? "Resume Orbit" : "Pause Orbit"}
                  className="size-7 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 ml-1 transition-colors"
                >
                  {isOrbitPaused ? <Play className="size-3" /> : <Pause className="size-3" />}
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1]">
                Technical competencies grounded in production.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl font-sans">
                An interactive planetary galaxy representing core engineering systems, databases, mobile engines, and cloud pipelines.
              </p>
            </div>

            {/* Orbit System Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-orange-400" /> Orbit 1: Core Frameworks
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-400" /> Orbit 2: Backend &amp; DBs
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-sky-400" /> Orbit 3: Mobile &amp; Systems
              </span>
            </div>
          </div>
        </Reveal>

        {/* ----------------- VIEW 1: INTERACTIVE SKILLS GALAXY (ORBITAL PLANETARY SYSTEM) ----------------- */}
        {viewMode === "galaxy" ? (
          <div className="mt-14 relative flex flex-col items-center justify-center min-h-[580px] sm:min-h-[640px] w-full select-none">
            {/* The Solar Galaxy Stage Container */}
            <div className="relative flex items-center justify-center w-[340px] h-[340px] sm:w-[580px] sm:h-[580px] lg:w-[680px] lg:h-[680px]">
              {/* Central Glowing Sun / Engine Core */}
              <div className="relative z-20 flex flex-col items-center justify-center size-24 sm:size-32 rounded-full bg-[#0a0c14] border-2 border-orange-500/50 shadow-2xl shadow-orange-500/40 text-center p-2 group cursor-pointer transition-transform duration-300 hover:scale-105">
                {/* Corona Flare Glow */}
                <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-md animate-pulse" />
                <Cpu className="size-5 sm:size-6 text-orange-400 mb-1 z-10" />
                <span className="font-mono text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-white z-10">
                  RIDAM CORE
                </span>
                <span className="font-mono text-[8px] text-orange-300/80 z-10">SYSTEM HUB</span>
              </div>

              {/* ORBIT 1: Inner Orbit (Core Frontend) - Diameter: 230px (mobile) / 290px (desktop) */}
              <div
                className={`absolute rounded-full border border-orange-500/20 shadow-inner pointer-events-none transform-gpu will-change-transform w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[310px] lg:h-[310px] ${
                  isOrbitPaused ? "" : "animate-orbit-clockwise"
                }`}
                style={{ animationDuration: "36s" }}
              >
                {GALAXY_SKILLS.filter((s) => s.orbit === 1).map((skill) => {
                  return (
                    <div
                      key={skill.name}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${skill.angle}deg) translate(clamp(100px, 14vw, 155px)) rotate(-${skill.angle}deg)`,
                      }}
                      onMouseEnter={() => {
                        soundManager.playClick();
                        setHoveredSkill(skill);
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0e111a] sm:backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-[11px] font-mono font-semibold text-white shadow-lg shadow-black/80 transition-all duration-300 hover:scale-125 hover:border-orange-400 hover:bg-orange-500/20 cursor-pointer">
                        <span
                          className="size-1.5 sm:size-2 rounded-full"
                          style={{ backgroundColor: skill.color }}
                        />
                        <span>{skill.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ORBIT 2: Middle Orbit (Backend & Databases) - Diameter: 320px (mobile) / 450px (desktop) */}
              <div
                className={`absolute rounded-full border border-emerald-500/20 border-dashed pointer-events-none transform-gpu will-change-transform w-[270px] h-[270px] sm:w-[420px] sm:h-[420px] lg:w-[470px] lg:h-[470px] ${
                  isOrbitPaused ? "" : "animate-orbit-counter"
                }`}
                style={{ animationDuration: "50s" }}
              >
                {GALAXY_SKILLS.filter((s) => s.orbit === 2).map((skill) => {
                  return (
                    <div
                      key={skill.name}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${skill.angle}deg) translate(clamp(135px, 21vw, 235px)) rotate(-${skill.angle}deg)`,
                      }}
                      onMouseEnter={() => {
                        soundManager.playClick();
                        setHoveredSkill(skill);
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0e111a] sm:backdrop-blur-md px-2.5 py-1 text-[9.5px] sm:text-[11px] font-mono font-semibold text-white shadow-lg shadow-black/80 transition-all duration-300 hover:scale-125 hover:border-emerald-400 hover:bg-emerald-500/20 cursor-pointer">
                        <span
                          className="size-1.5 sm:size-2 rounded-full"
                          style={{ backgroundColor: skill.color }}
                        />
                        <span>{skill.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ORBIT 3: Outer Orbit (Cross-Platform Mobile, Systems & Cloud) - Diameter: 350px (mobile) / 600px (desktop) */}
              <div
                className={`absolute rounded-full border border-sky-500/20 pointer-events-none transform-gpu will-change-transform w-[340px] h-[340px] sm:w-[560px] sm:h-[560px] lg:w-[630px] lg:h-[630px] ${
                  isOrbitPaused ? "" : "animate-orbit-clockwise"
                }`}
                style={{ animationDuration: "64s" }}
              >
                {GALAXY_SKILLS.filter((s) => s.orbit === 3).map((skill) => {
                  return (
                    <div
                      key={skill.name}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${skill.angle}deg) translate(clamp(170px, 28vw, 315px)) rotate(-${skill.angle}deg)`,
                      }}
                      onMouseEnter={() => {
                        soundManager.playClick();
                        setHoveredSkill(skill);
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0e111a] sm:backdrop-blur-md px-2.5 py-1 text-[9px] sm:text-[10.5px] font-mono font-semibold text-white shadow-lg shadow-black/80 transition-all duration-300 hover:scale-125 hover:border-sky-400 hover:bg-sky-500/20 cursor-pointer">
                        <span
                          className="size-1.5 sm:size-2 rounded-full"
                          style={{ backgroundColor: skill.color }}
                        />
                        <span>{skill.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Floating Holographic Telemetry HUD (Shows when hovering any planet) */}
            <div className="mt-8 h-24 w-full max-w-lg transition-all duration-300">
              {hoveredSkill ? (
                <div className="rounded-2xl border border-orange-500/30 bg-[#0c0e17]/95 p-4 text-center shadow-2xl backdrop-blur-xl animate-fade-in">
                  <div className="flex items-center justify-between font-mono text-xs mb-1">
                    <span className="text-orange-400 font-bold uppercase tracking-wider">
                      PLANET: {hoveredSkill.name}
                    </span>
                    <span className="text-zinc-500 text-[10px]">
                      ORBIT {hoveredSkill.orbit} • {hoveredSkill.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans">
                    {hoveredSkill.experience}
                  </p>
                  <div className="mt-2 text-[10px] font-mono text-orange-300/80">
                    Deployed in: {hoveredSkill.projects}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center text-zinc-500 font-mono text-xs flex items-center justify-center gap-2">
                  <Sparkles className="size-3.5 text-orange-400 animate-pulse" />
                  <span>Hover over any skill planet in orbit to inspect telemetry &amp; live case studies.</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ----------------- VIEW 2: CATEGORY MATRIX GRID VIEW ----------------- */
          <div className="mt-12">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 font-mono">
              {skillsCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setActiveCategory(cat.id);
                  }}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-white text-black font-semibold shadow-md"
                      : "bg-white/[0.03] text-zinc-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Selected Category Description */}
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Sparkles className="size-3.5 text-orange-400" />
              <span>{currentCategoryData.subtitle}</span>
            </div>

            {/* Skills Cards Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentCategoryData.skills.map((skill, i) => (
                <Reveal key={skill.name} delay={i * 0.04}>
                  <div className="h-full p-5 rounded-2xl bg-[#090a0f] border border-white/[0.06] hover:border-orange-500/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg shadow-black/40">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <h3 className="text-base font-bold text-white group-hover:text-orange-300 transition-colors">
                          {skill.name}
                        </h3>
                        {getStatusBadge(skill.status)}
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        {skill.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      <span>{skill.category}</span>
                      <span className="text-zinc-400">{skill.badge}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Horizontal Marquee Strip */}
        <div className="mt-20 relative overflow-hidden py-4 border-y border-white/[0.06] bg-white/[0.01]">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060709] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060709] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max gap-8 animate-marquee">
            {[...allSkillNames, ...allSkillNames].map((name, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-wider text-zinc-400 whitespace-nowrap hover:text-white transition-colors"
              >
                <span className="text-orange-500">◆</span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scoped CSS Keyframes for Orbit Rotation */}
      <style>{`
        @keyframes orbitClockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbitCounter {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-orbit-clockwise {
          animation: orbitClockwise linear infinite;
        }
        .animate-orbit-counter {
          animation: orbitCounter linear infinite;
        }
      `}</style>
    </section>
  );
}
