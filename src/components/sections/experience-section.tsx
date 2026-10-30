"use client";

import React from "react";
import { experiencesData } from "@/data/experience";
import { Reveal } from "@/components/animations/reveal";
import { soundManager } from "@/lib/sound";
import { Calendar, MapPin, ExternalLink, Briefcase } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-28 sm:py-36 relative border-t border-white/[0.08] bg-[#060709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-orange-400 uppercase mb-4">
            <span>04 / EXPERIENCE</span>
            <span className="text-zinc-600">{"//"}</span>
            <span>TIMELINE &amp; DELIVERIES</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1]">
                Where I&apos;ve engineered &amp; delivered.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl font-sans">
                Timeline distinguishing current independent freelance client engineering, platform projects, previous developer positions, and internships.
              </p>
            </div>

            <div className="text-xs font-mono text-zinc-400 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08]">
              Available for Freelance Contracts &amp; Remote Teams
            </div>
          </div>
        </Reveal>

        {/* Timeline Container */}
        <div className="mt-16 relative">
          {/* Vertical Guide Line */}
          <div className="hidden lg:block absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-orange-500 via-white/10 to-transparent" />

          <div className="space-y-12">
            {experiencesData.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.1}>
                <div className="relative lg:pl-20">
                  {/* Glowing Node on Desktop */}
                  <div className="hidden lg:flex absolute left-6 top-6 -translate-x-1/2 size-5 rounded-full border-2 border-[#060709] bg-[#090a0f] items-center justify-center">
                    <span
                      className={`size-2 rounded-full ${
                        item.current
                          ? "bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]"
                          : "bg-orange-400"
                      }`}
                    />
                  </div>

                  {/* Experience Card */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#090a0f] border border-white/[0.08] hover:border-orange-500/30 transition-all duration-300 shadow-xl group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-2">
                          {item.current ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Active • Open to Clients
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                              {item.workType}
                            </span>
                          )}

                          <span className="text-xs font-mono text-zinc-500">
                            {item.workType === "Freelance" ? "Client Solutions" : "Platform Work"}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-orange-300 transition-colors">
                          {item.role}
                        </h3>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm sm:text-base font-semibold text-orange-400 font-mono">
                            @ {item.company}
                          </span>
                          {item.companyUrl && (
                            <a
                              href={item.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => soundManager.playClick()}
                              className="text-zinc-500 hover:text-white transition-colors"
                              title="Visit Platform"
                            >
                              <ExternalLink className="size-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Metadata right */}
                      <div className="flex flex-col md:items-end gap-1.5 text-xs font-mono text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="size-3.5 text-orange-400" />
                          <span>{item.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="size-3.5 text-zinc-500" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="size-3.5 text-zinc-500" />
                          <span>{item.workType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="mt-6 text-sm text-zinc-300 leading-relaxed font-sans">
                      {item.summary}
                    </p>

                    {/* Responsibilities list */}
                    <div className="mt-6">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">
                        Key Responsibilities &amp; Impact
                      </span>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300 font-sans">
                        {item.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="size-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mt-8 pt-5 border-t border-white/[0.04] flex flex-wrap items-center gap-2 font-mono">
                      <span className="text-[11px] text-zinc-500 mr-2">
                        Stack:
                      </span>
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.03] text-zinc-300 border border-white/[0.06] hover:border-orange-500/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
