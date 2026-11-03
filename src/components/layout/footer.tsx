"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { personalData } from "@/data/personal";
import { soundManager } from "@/lib/sound";
import { ArrowUp, Terminal, Phone, MessageCircle } from "lucide-react";

export function Footer() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#040507] py-16 text-zinc-400 text-xs font-mono relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-white/[0.06]">
          {/* Col 1: Brand & Role */}
          <div className="md:col-span-5 space-y-3 font-sans">
            <span className="font-serif text-2xl font-normal text-white tracking-tight block">
              Ridam Grover
            </span>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Full-Stack Engineer &amp; Freelance Developer specializing in high-performance
              Next.js web systems, cross-platform mobile apps (iOS &amp; Android), and scalable backends.
            </p>
            <div className="pt-2 flex flex-col gap-2.5 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="tel:+916239477727"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-black border border-orange-500/20 text-xs font-mono transition-all font-semibold"
                >
                  <Phone className="size-3 text-orange-400" />
                  <span>+91 6239477727</span>
                </a>
                <a
                  href="https://wa.me/916239477727"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/20 text-xs font-mono transition-all font-semibold"
                >
                  <MessageCircle className="size-3 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <Terminal className="size-3.5 text-orange-400" />
                <span>Available for freelance contracts &amp; remote products</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold block mb-3 font-mono">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link
                  href="/#about"
                  className="hover:text-white transition-colors"
                >
                  About &amp; Story
                </Link>
              </li>
              <li>
                <Link
                  href="/#work"
                  className="hover:text-white transition-colors"
                >
                  Selected Work
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="hover:text-white transition-colors"
                >
                  Freelance Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Local Time & Back to Top */}
          <div className="md:col-span-4 space-y-4 md:text-right flex flex-col md:items-end">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] inline-block text-left">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-mono">
                LOCAL TIME (INDIA IST)
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-white font-mono">
                  {currentTime || "12:00:00 AM"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.08] text-xs transition-all font-mono uppercase tracking-wider"
            >
              <span>Back to Top</span>
              <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
          <div>
            &copy; 2026 Ridam Grover. All rights reserved.
          </div>

          <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[11px]">
            <span>Designed with editorial craft • Built with Next.js &amp; TypeScript</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            <a
              href="tel:+916239477727"
              className="text-orange-400 hover:text-white transition-colors font-semibold"
            >
              +91 6239477727
            </a>
            <a
              href="https://wa.me/916239477727"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-white transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={personalData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personalData.email}`}
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
