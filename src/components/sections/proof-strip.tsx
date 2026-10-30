"use client";

import React from "react";
import { motion } from "framer-motion";

const METRICS = [
  {
    value: "4+",
    unit: "YRS",
    label: "Production Engineering",
    description: "Architecting full-stack web platforms and cloud backends.",
  },
  {
    value: "100%",
    unit: "",
    label: "Mobile Store Approvals",
    description: "Verified production releases on Apple App Store & Google Play.",
  },
  {
    value: "<100",
    unit: "MS",
    label: "Telemetry Latency",
    description: "Engineered sub-second API pipelines and real-time audio feeds.",
  },
  {
    value: "Open",
    unit: "●",
    label: "Freelance & Remote",
    description: "Available for client consulting, full-stack builds, and contracts.",
  },
];

export function ProofStrip() {
  return (
    <section
      aria-label="Career and platform engineering highlights"
      className="relative z-10 border-y border-white/[0.08] bg-[#08090d]/80 backdrop-blur-md py-8 sm:py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
          {METRICS.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`flex flex-col justify-between ${
                idx > 0 ? "pt-4 lg:pt-0 lg:pl-6 xl:pl-8" : ""
              }`}
            >
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight">
                  {item.value}
                </span>
                {item.unit && (
                  <span className="text-orange-400 font-mono text-xs tracking-wider">
                    {item.unit}
                  </span>
                )}
              </div>
              <div className="mt-2">
                <p className="text-xs uppercase tracking-wider font-mono text-zinc-300 font-medium">
                  {item.label}
                </p>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

