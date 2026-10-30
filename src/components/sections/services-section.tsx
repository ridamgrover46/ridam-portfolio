"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData } from "@/data/services";
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
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Architectural Hairline draw animation when scrolling into section (scrubs open and closes with scroll)
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 90%",
              end: "top 65%",
              scrub: 1,
            },
          }
        );
      }

      // 2. "Line se" Staggered Entrance Animation for Services Cards
      const cards = gridRef.current?.querySelectorAll(".service-card");
      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          {
            y: 55,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 sm:py-32 relative border-t border-white/[0.08] bg-[#060709] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-orange-400 uppercase mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span>04 / SERVICES &amp; SOLUTIONS</span>
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-zinc-200 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>Schedule Discovery Call</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Animated GSAP Architectural Hairline Divider */}
        <div className="mt-12 relative flex items-center justify-center">
          <div
            ref={lineRef}
            className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent origin-left"
          />
          <div className="absolute size-1.5 rounded-full bg-orange-400 shadow-sm shadow-orange-500" />
        </div>

        {/* Compact Services Cards Grid with GSAP Staggered Entrance */}
        <div
          ref={gridRef}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {servicesData.map((service, index) => {
            const Icon = getServiceIcon(service.id);

            return (
              <div
                key={service.id}
                className="service-card h-full p-5 sm:p-6 rounded-2xl bg-[#0b0d14] border border-white/[0.08] hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Glowing Amber Top Rim on Hover */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/70 transition-all duration-500" />

                <div>
                  {/* Card Top: Compact Icon & Counter */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="size-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-orange-400 group-hover:scale-110 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-orange-300 transition-colors font-sans">
                    {service.title}
                  </h3>
                  <p className="text-[11px] font-mono text-orange-400 mt-0.5 mb-3">
                    {service.tagline}
                  </p>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 font-sans line-clamp-3">
                    {service.description}
                  </p>

                  {/* Compact Deliverables */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[9.5px] font-mono text-zinc-500 uppercase tracking-widest block">
                      Key Deliverables:
                    </span>
                    {service.deliverables.slice(0, 3).map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-zinc-300 font-sans">
                        <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="truncate">{del}</span>
                      </div>
                    ))}
                  </div>

                  {/* Compact Tech Tags */}
                  <div className="flex flex-wrap gap-1 mb-4 font-mono">
                    {service.techFocus.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Compact Action Row */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 font-mono">
                    Bespoke timeline
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
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold text-orange-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-orange-950/20 via-[#0b0d14] to-[#07090e] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="size-11 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="size-5 text-orange-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white font-sans">
                Have a specific technical blueprint in mind?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 font-sans">
                Let&apos;s evaluate your current requirements or design a tailored web &amp; mobile architecture.
              </p>
            </div>
          </div>

          <Link
            href="/#contact"
            onClick={() => soundManager.playClick()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-zinc-200 transition-all shrink-0 shadow-lg cursor-pointer"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
