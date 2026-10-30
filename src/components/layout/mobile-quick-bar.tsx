"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { soundManager } from "@/lib/sound";

export function MobileQuickBar() {
  return (
    <aside
      aria-label="Direct Quick Contact Bar"
      className="md:hidden fixed bottom-4 inset-x-3 z-40 flex items-center justify-between gap-2 rounded-2xl border border-white/15 bg-[#090b10]/90 p-2 shadow-2xl shadow-black/80 backdrop-blur-xl"
    >
      {/* Direct Call Button */}
      <a
        href="tel:+916239477727"
        onClick={() => soundManager.playClick()}
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 px-3 py-3 text-xs font-bold tracking-tight shadow-lg shadow-orange-500/25 transition-transform active:scale-95"
      >
        <Phone className="size-4 shrink-0 fill-current" />
        <span className="truncate">Call: +91 6239477727</span>
      </a>

      {/* WhatsApp Direct Button */}
      <a
        href="https://wa.me/916239477727?text=Hi%20Ridam,%20I%20am%20interested%20in%20discussing%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => soundManager.playClick()}
        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 px-3.5 py-3 text-xs font-bold tracking-tight shadow-md transition-transform active:scale-95 shrink-0"
      >
        <MessageCircle className="size-4 shrink-0 fill-current" />
        <span>WhatsApp</span>
      </a>
    </aside>
  );
}

