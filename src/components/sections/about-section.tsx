"use client";

import React, { useState } from "react";
import { personalData } from "@/data/personal";
import { Reveal } from "@/components/animations/reveal";
import { soundManager } from "@/lib/sound";
import {
  GraduationCap,
  Code2,
  ShieldCheck,
  Zap,
  Server,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<"principles" | "education">("principles");

  const corePrinciples = [
    {
      icon: Code2,
      title: "Frontend Craft & Systems",
      desc: "Pixel-perfect, accessible user interfaces built with React, Next.js, and TypeScript. Interfaces that feel tactile, responsive, and immediate.",
    },
    {
      icon: Smartphone,
      title: "iOS & Android Cross-Platform",
      desc: "Engineering mobile applications with React Native & Next.js wrappers, passing strict Apple App Store and Google Play Store review guidelines with 100% approval.",
    },
    {
      icon: Server,
      title: "Scalable Full-Stack Backends",
      desc: "Robust backend architectures with Node.js, Express, PostgreSQL, and MongoDB that effortlessly handle high concurrency, media streaming, and real-time state.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Auth & Data Security",
      desc: "Hardened authentication pipelines with JWT tokens, Google OAuth 2.0, Supabase Row-Level Security, and granular role-based access control (RBAC).",
    },
    {
      icon: Zap,
      title: "Performance & Conversion Focus",
      desc: "Zero bloat, sub-second API latencies, optimized asset streaming, and stellar Core Web Vitals designed to boost user retention and business conversion.",
    },
  ];

  return (
    <section id="about" className="py-28 sm:py-36 relative border-t border-white/[0.08] bg-[#060709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-orange-400 uppercase mb-4">
            <span>02 / ABOUT</span>
            <span className="text-zinc-600">{"//"}</span>
            <span>IDENTITY &amp; PHILOSOPHY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white max-w-4xl leading-[1.1]">
            Engineering software with craft, precision, and business intent.
          </h2>
        </Reveal>

        {/* Split Editorial Layout */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-6 space-y-6 text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
            <Reveal delay={0.1}>
              <p>
                I am <strong className="text-white font-semibold">Ridam Grover</strong>, an independent full-stack engineer and freelance developer based in India. I specialize in building end-to-end web platforms and cross-platform applications for founders, digital brands, and growing businesses globally.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p>
                My expertise spans the entire modern stack: from crafting silky, high-conversion frontend interfaces in <span className="text-white font-medium">React and Next.js</span>, to building robust RESTful APIs and cloud databases in <span className="text-white font-medium">Node.js, PostgreSQL, and MongoDB</span>.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-orange-500/20 flex items-start gap-4">
                <div className="size-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Smartphone className="size-5 text-orange-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Cross-Platform Mobile Deployments (iOS &amp; Android)
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Proven track record building and shipping cross-platform apps with full approval from both the <strong className="text-zinc-200 font-medium">Apple App Store</strong> and <strong className="text-zinc-200 font-medium">Google Play Store</strong>, navigating complex provisioning, push notifications, and store review requirements.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p>
                Among my notable portfolio projects is <span className="text-white font-medium">RadioTangy</span>, a high-fidelity audio storytelling platform engineered with Next.js App Router, Supabase, and PostgreSQL, featuring hierarchical episodic chapters, persistent audio playback, and protected subscriber streaming.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <p>
                I currently work independently, taking on freelance projects, technical architecture contracts, and remote engineering opportunities.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Interactive Tabs for Tenets & Academic Credentials */}
          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              {/* Tab Selector */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab("principles");
                  }}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-medium tracking-wider uppercase transition-all ${
                    activeTab === "principles"
                      ? "bg-white text-black shadow-md font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Core Pillars
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab("education");
                  }}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-medium tracking-wider uppercase transition-all ${
                    activeTab === "education"
                      ? "bg-white text-black shadow-md font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Education &amp; Degrees
                </button>
              </div>

              {/* Tab 1: Principles */}
              {activeTab === "principles" && (
                <div className="space-y-3.5">
                  {corePrinciples.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className="p-5 rounded-2xl bg-[#090a0f] border border-white/[0.06] hover:border-orange-500/30 transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="size-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-orange-500/40 group-hover:bg-orange-500/10 transition-colors">
                            <Icon className="size-4 text-orange-400" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab 2: Education */}
              {activeTab === "education" && (
                <div className="space-y-4">
                  {personalData.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#090a0f] border border-white/[0.06] hover:border-orange-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="size-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                          <GraduationCap className="size-4 text-orange-400" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400">
                            {edu.period}
                          </span>
                          <h4 className="text-base font-bold text-white">
                            {edu.degree}
                          </h4>
                        </div>
                      </div>

                      <div className="mt-3 pl-12">
                        <p className="text-sm font-medium text-orange-200">
                          {edu.institution}
                        </p>
                        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                          {edu.details}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-zinc-400 font-mono flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                    <span>Rigorous academic foundations in data structures, systems architecture, and algorithms.</span>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
