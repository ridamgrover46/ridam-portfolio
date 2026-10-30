import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/data/projects";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies & Work | Ridam Grover — MERN Stack Developer",
  description:
    "Comprehensive engineering case studies by Ridam Grover across full-stack audio streaming, logistics CRM, e-commerce, and biometric computer vision.",
};

export default function WorkIndexPage() {
  return (
    <div className="min-h-screen bg-[#060709] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumb & Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Return to Portfolio Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-orange-400 tracking-widest uppercase mb-3">
            ARCHIVE &amp; CASE STUDIES
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-tight">
            Selected Works &amp; Systems.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
            Comprehensive technical breakdowns of product architecture, database design, cross-platform mobile apps, and full-stack solutions.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {projectsData.map((project, idx) => (
            <div
              key={project.slug}
              className="p-8 sm:p-10 rounded-3xl bg-[#090a0f] border border-white/[0.08] hover:border-orange-500/30 transition-all duration-300 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7">
                  <Link
                    href={`/work/${project.slug}`}
                    className="block relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] bg-zinc-950 group"
                  >
                    <Image
                      src={project.previewImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold shadow-xl">
                        Open Deep-Dive Case Study
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3 font-mono text-xs">
                      <span className="text-zinc-500">
                        PROJECT 0{idx + 1}
                      </span>
                      <span className="text-zinc-700">•</span>
                      <span className="text-orange-400">
                        {project.status}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      <Link
                        href={`/work/${project.slug}`}
                        className="hover:text-orange-300 transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h2>
                    <p className="text-xs font-mono text-zinc-400 mt-1 mb-4">
                      {project.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8 font-mono">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-zinc-200 transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="size-3.5" />
                    </Link>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1 font-mono"
                      >
                        <span>Live Site</span>
                        <ExternalLink className="size-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
