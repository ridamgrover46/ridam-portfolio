"use client";

import React, { useState } from "react";
import { skillsCategories } from "@/data/skills";
import { Reveal } from "@/components/animations/reveal";
import { soundManager } from "@/lib/sound";
import { Sparkles, CheckCircle2, Compass, Layers } from "lucide-react";

export function SkillsSection() {
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
    "iOS App Store Approval",
    "Android Play Store",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Supabase",
    "PostgreSQL",
    "MongoDB Atlas",
    "Tailwind CSS",
    "GSAP ScrollTrigger",
    "Lenis Smooth Scroll",
    "Three.js",
    "REST APIs",
    "Google OAuth 2.0",
    "JWT Security",
    "Postman",
    "Vercel",
  ];

  return (
    <section id="skills" className="py-28 sm:py-36 relative border-t border-white/[0.08] bg-[#060709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-orange-400 uppercase mb-4">
            <span>03 / CAPABILITIES</span>
            <span className="text-zinc-600">{"//"}</span>
            <span>STACK &amp; ARCHITECTURE</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1]">
                Technical competencies grounded in production.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl font-sans">
                Tools, frameworks, and deployment workflows I leverage daily to engineer high-velocity web platforms and cross-platform mobile apps.
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-400" /> Core
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-orange-400" /> Production
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-purple-400" /> Exploring
              </span>
            </div>
          </div>
        </Reveal>

        {/* Category Tabs */}
        <div className="mt-12 flex flex-wrap gap-2 font-mono">
          {skillsCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-200 ${
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
            <Reveal key={skill.name} delay={i * 0.05}>
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
    </section>
  );
}
