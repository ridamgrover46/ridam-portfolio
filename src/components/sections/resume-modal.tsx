"use client";

import React, { useEffect } from "react";
import { personalData } from "@/data/personal";
import { experiencesData } from "@/data/experience";
import { skillsCategories } from "@/data/skills";
import { X, Download, Mail, ExternalLink, GraduationCap, Briefcase, Phone } from "lucide-react";
import { soundManager } from "@/lib/sound";

export function ResumeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => {
          soundManager.playClick();
          onClose();
        }}
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#090a0f] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] bg-[#0c0d14] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-orange-400">CV</span>
            </div>
            <div>
              <h2 id="resume-title" className="text-sm font-semibold text-white">
                {personalData.name} — Curriculum Vitae
              </h2>
              <p className="text-[11px] text-zinc-400 font-mono">
                Verified Document • Updated October 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={personalData.resumeUrl}
              download="Ridam_Grover_Resume.pdf"
              onClick={() => soundManager.playClick()}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold transition-colors shadow-sm"
            >
              <Download className="size-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="size-8 rounded-lg border border-white/[0.08] hover:bg-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Resume Modal"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 font-sans text-zinc-300">
          {/* Identity Header */}
          <div className="border-b border-white/[0.08] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight">
                {personalData.name}
              </h1>
              <p className="text-xs text-orange-400 font-mono mt-1">
                {personalData.role}
              </p>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                {personalData.location} • {personalData.availability}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 font-mono">
              <a
                href="tel:+916239477727"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs text-orange-400 hover:text-white hover:border-orange-500/40 transition-colors"
              >
                <Phone className="size-3.5 text-orange-400" />
                <span>+91 6239477727</span>
              </a>
              <a
                href={`mailto:${personalData.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs hover:text-white hover:border-white/20 transition-colors"
              >
                <Mail className="size-3.5 text-orange-400" />
                <span>{personalData.email}</span>
              </a>
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs hover:text-white hover:border-white/20 transition-colors"
              >
                <ExternalLink className="size-3.5 text-zinc-400" />
                <span>GitHub</span>
              </a>
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs hover:text-white hover:border-white/20 transition-colors"
              >
                <ExternalLink className="size-3.5 text-zinc-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase mb-2">
              Professional Summary
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              Full-Stack Engineer and Freelance Developer specializing in high-velocity web platforms,
              scalable REST APIs, and cross-platform mobile apps deployed to both the Apple App Store
              and Google Play Store with 100% store guideline approvals. Experienced in audio streaming
              architectures, CRM workflows, database design, and modern UI engineering.
            </p>
          </div>

          {/* Experience Timeline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="size-4 text-orange-400" />
              <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
                Engineering Track Record &amp; Client Practice
              </h3>
            </div>

            <div className="space-y-6">
              {experiencesData.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <span className="text-sm font-semibold text-white">
                        {item.role}
                      </span>
                      <span className="text-xs text-orange-400 font-mono font-medium ml-2">
                        @ {item.company}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-400">
                        {item.period}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-zinc-300">
                        {item.workType}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 mb-3">{item.summary}</p>

                  <ul className="space-y-1.5 text-xs text-zinc-300 mb-3">
                    {item.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-orange-400 mt-0.5">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-300 border border-orange-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="size-4 text-orange-400" />
              <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
                Education
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <h4 className="text-sm font-semibold text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-orange-300 font-mono mt-0.5">
                    {edu.institution}
                  </p>
                  <p className="text-[11px] font-mono text-zinc-500 mt-1">
                    {edu.period}
                  </p>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Overview */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase mb-4">
              Technical Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skillsCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
                >
                  <h4 className="text-xs font-semibold text-white mb-2">
                    {cat.title}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 font-mono">
                    {cat.skills.map((s) => (
                      <span
                        key={s.name}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-[#0c0d14] flex items-center justify-between text-xs text-zinc-400 font-mono">
          <span>Ready for freelance contracts &amp; remote onboarding</span>
          <a
            href={personalData.resumeUrl}
            download="Ridam_Grover_Resume.pdf"
            className="text-orange-400 hover:underline inline-flex items-center gap-1.5"
          >
            Direct File Download (.pdf)
            <Download className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

