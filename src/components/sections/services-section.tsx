"use client";

import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { Reveal } from "@/components/animations/reveal";
import { soundManager } from "@/lib/sound";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Code2,
  Database,
  LayoutDashboard,
  Zap,
  ShoppingBag,
  Smartphone,
} from "lucide-react";

export function ServicesSection({
  onSelectService,
}: {
  onSelectService?: (serviceTitle: string) => void;
}) {
  const getServiceIcon = (id: string) => {
    switch (id) {
      case "fullstack-apps":
        return Layers;
      case "mobile-apps":
        return Smartphone;
      case "dashboards-crm":
        return LayoutDashboard;
      case "ecommerce":
        return ShoppingBag;
      case "api-integrations":
        return Database;
      case "frontend-modernization":
        return Zap;
      default:
        return Code2;
    }
  };

  return (
    <section id="services" className="py-28 sm:py-36 relative border-t border-white/[0.08] bg-[#060709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-orange-400 uppercase mb-4">
            <span>05 / SERVICES</span>
            <span className="text-zinc-600">{"//"}</span>
            <span>FREELANCE &amp; CONSULTING</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1]">
                Bespoke services for ambitious founders &amp; teams.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl font-sans">
                Outcome-focused engineering solutions for startups and brands looking for high-velocity web platforms and cross-platform mobile apps.
              </p>
            </div>

            <Link
              href="/#contact"
              onClick={() => soundManager.playClick()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-zinc-200 transition-all shadow-md"
            >
              <span>Schedule Discovery Call</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </Reveal>

        {/* Services Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, index) => {
            const Icon = getServiceIcon(service.id);

            return (
              <Reveal key={service.id} delay={index * 0.08}>
                <div className="h-full p-6 sm:p-8 rounded-3xl bg-[#090a0f] border border-white/[0.08] hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1">
                  <div>
                    {/* Card Top: Icon & Counter */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="size-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-orange-400 group-hover:scale-110 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all">
                        <Icon className="size-6" />
                      </div>
                      <span className="text-xs font-mono text-zinc-500">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-orange-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono text-orange-400 mt-1 mb-4">
                      {service.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-sans">
                      {service.description}
                    </p>

                    {/* Deliverables */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                        Deliverables:
                      </span>
                      {service.deliverables.slice(0, 4).map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300 font-sans">
                          <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-6 font-mono">
                      {service.techFocus.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-zinc-400 border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500 font-mono">
                      Bespoke scope
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        if (onSelectService) {
                          onSelectService(service.title);
                        }
                        const contactEl = document.getElementById("contact");
                        if (contactEl) {
                          contactEl.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-orange-400 hover:text-white transition-colors"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <Reveal delay={0.3}>
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-orange-950/20 via-zinc-950 to-[#090a0f] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="size-6 text-orange-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  Have a specific technical blueprint in mind?
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-sans">
                  Let&apos;s evaluate your current requirements or design a tailored web &amp; mobile architecture.
                </p>
              </div>
            </div>

            <Link
              href="/#contact"
              onClick={() => soundManager.playClick()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-zinc-200 transition-all shrink-0 shadow-lg"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
