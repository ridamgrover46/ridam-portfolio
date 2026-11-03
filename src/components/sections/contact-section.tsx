"use client";

import React, { useState } from "react";
import { personalData } from "@/data/personal";
import { Reveal } from "@/components/animations/reveal";
import { soundManager } from "@/lib/sound";
import { ThankYouModal } from "@/components/sections/thank-you-modal";
import {
  Copy,
  Check,
  Send,
  ExternalLink,
  MessageSquare,
  Clock,
  Sparkles,
  AlertCircle,
  Phone,
  MessageCircle,
} from "lucide-react";

export function ContactSection({
  preselectedService = "",
}: {
  preselectedService?: string;
}) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: preselectedService || "Full-Stack Web Application",
    budget: "$1,000 - $3,000",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [mailtoFallback, setMailtoFallback] = useState<string | null>(null);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [submittedInfo, setSubmittedInfo] = useState({
    name: "",
    email: "",
    projectType: "",
  });

  const handleCopyEmail = async () => {
    soundManager.playClick();
    try {
      await navigator.clipboard.writeText(personalData.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Clipboard fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    setLoading(true);
    setStatusMessage(null);
    setIsError(false);
    setMailtoFallback(null);

    // Basic client validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setIsError(true);
      setStatusMessage("Please fill in your name, email, and message.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setStatusMessage(data.error || "Submission error. Please email directly.");
      } else {
        soundManager.playSuccess();
        setIsError(false);
        setStatusMessage(data.message);
        if (data.mailtoUrl) {
          setMailtoFallback(data.mailtoUrl);
        }
        // Save submitted info for the Thank You modal
        setSubmittedInfo({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
        });
        // Open Thank You popup
        setIsThankYouOpen(true);

        // Reset form
        setFormData({
          name: "",
          email: "",
          projectType: "Full-Stack Web Application",
          budget: "$1,000 - $3,000",
          message: "",
        });
      }
    } catch {
      setIsError(true);
      setStatusMessage("Network error. Please email directly at ridamgrover43@gmail.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 sm:py-36 relative border-t border-white/[0.08] bg-[#060709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-orange-400 uppercase mb-4">
            <span>06 / CONTACT</span>
            <span className="text-zinc-600">{"//"}</span>
            <span>START A CONVERSATION</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1]">
            Let&apos;s build something remarkable together.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl font-sans">
            Whether you have an upcoming web project, need a cross-platform mobile app shipped, or want to discuss a contract role, my inbox is open.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Info & Social Profiles */}
          <div className="lg:col-span-5 space-y-8">
            {/* Email Contact Card */}
            <Reveal delay={0.1}>
              <div className="p-6 sm:p-8 rounded-3xl bg-[#090a0f] border border-white/[0.08] shadow-xl">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  Direct Inquiries
                </span>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${personalData.email}`}
                    className="text-lg sm:text-xl font-bold text-white hover:text-orange-400 transition-colors break-all font-mono"
                  >
                    {personalData.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="size-10 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white transition-all shrink-0"
                    title="Copy Email Address"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? (
                      <Check className="size-4 text-emerald-400" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </button>
                </div>
                {copiedEmail && (
                  <p className="text-xs font-mono text-emerald-400 mt-2">
                    ✓ Email address copied to clipboard!
                  </p>
                )}
              </div>
            </Reveal>

            {/* Direct Phone & WhatsApp Call Card */}
            <Reveal delay={0.15}>
              <div className="p-6 sm:p-8 rounded-3xl bg-[#090a0f] border border-white/[0.08] shadow-xl">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  Direct Phone &amp; WhatsApp
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <a
                    href="tel:+916239477727"
                    className="text-lg sm:text-2xl font-bold text-white hover:text-orange-400 transition-colors font-mono tracking-tight"
                  >
                    +91 6239477727
                  </a>
                  <div className="flex items-center gap-2">
                    <a
                      href="tel:+916239477727"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-black border border-orange-500/20 font-mono text-xs uppercase tracking-wider transition-all"
                      title="Direct Phone Call"
                    >
                      <Phone className="size-3.5" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href="https://wa.me/916239477727"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/20 font-mono text-xs uppercase tracking-wider transition-all"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle className="size-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
                <p className="text-xs font-mono text-zinc-400 mt-2">
                  Available for direct calls, discovery discussions, and rapid project scoping.
                </p>
              </div>
            </Reveal>

            {/* Availability & Location Card */}
            <Reveal delay={0.2}>
              <div className="p-6 sm:p-8 rounded-3xl bg-[#090a0f] border border-white/[0.08] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
                  <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                    Current Freelance Status
                  </span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Actively accepting freelance web &amp; mobile projects, MVP architecture contracts, and remote engineering opportunities. Fast turnaround, daily asynchronous updates, and clean communication.
                </p>
                <div className="pt-3 border-t border-white/[0.06] flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-orange-400" />
                    Average response: &lt; 24h
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Social Links */}
            <Reveal delay={0.3}>
              <div className="space-y-3 font-mono">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                  Profiles &amp; Connect
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalData.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="p-4 rounded-2xl bg-[#090a0f] border border-white/[0.08] hover:border-pink-500/30 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-semibold text-white group-hover:text-pink-300 block">
                        Instagram
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        @_ridam.grover
                      </span>
                    </div>
                    <ExternalLink className="size-3.5 text-zinc-500 group-hover:text-white" />
                  </a>

                  <a
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="p-4 rounded-2xl bg-[#090a0f] border border-white/[0.08] hover:border-orange-500/30 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-semibold text-white group-hover:text-orange-300 block">
                        LinkedIn
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        /in/ridam-grover
                      </span>
                    </div>
                    <ExternalLink className="size-3.5 text-zinc-500 group-hover:text-white" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Validated Interactive Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div className="p-8 sm:p-10 rounded-3xl bg-[#090a0f] border border-white/[0.08] shadow-2xl relative">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="size-4 text-orange-400" />
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Send a Project Inquiry
                  </h3>
                </div>

                {statusMessage && (
                  <div
                    className={`mb-6 p-4 rounded-2xl border text-xs sm:text-sm flex flex-col gap-2 ${
                      isError
                        ? "bg-rose-500/10 border-rose-500/20 text-rose-300"
                        : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {isError ? (
                        <AlertCircle className="size-4 shrink-0 mt-0.5" />
                      ) : (
                        <Sparkles className="size-4 shrink-0 mt-0.5" />
                      )}
                      <span>{statusMessage}</span>
                    </div>

                    {mailtoFallback && (
                      <div className="mt-2 pt-2 border-t border-emerald-500/20">
                        <a
                          href={mailtoFallback}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
                        >
                          <span>Open in Your Email Client</span>
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-orange-400 focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors font-sans"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-orange-400 focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Project Type */}
                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        PROJECT SCOPE
                      </label>
                      <select
                        id="projectType"
                        value={formData.projectType}
                        onChange={(e) =>
                          setFormData({ ...formData, projectType: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#0f1016] border border-white/[0.08] focus:border-orange-400 focus:outline-none text-sm text-white transition-colors font-sans"
                      >
                        <option value="Full-Stack Web Application">
                          Full-Stack Web Application (Next.js / MERN)
                        </option>
                        <option value="iOS & Android Cross-Platform Mobile App">
                          iOS &amp; Android Mobile App (App Store Approval)
                        </option>
                        <option value="Business Dashboard & Admin Panel">
                          Business Dashboard &amp; Admin Panel
                        </option>
                        <option value="CRM & Dispatch Operational Tools">
                          CRM &amp; Dispatch Tools
                        </option>
                        <option value="E-Commerce Headless Store">
                          E-Commerce Platform
                        </option>
                        <option value="Website Modernization & Speed">
                          Website Modernization &amp; Speed
                        </option>
                        <option value="Freelance / Contract Collaboration">
                          Freelance / Contract Collaboration
                        </option>
                      </select>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        ESTIMATED BUDGET
                      </label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#0f1016] border border-white/[0.08] focus:border-orange-400 focus:outline-none text-sm text-white transition-colors font-sans"
                      >
                        <option value="< $1,000">&lt; $1,000</option>
                        <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                        <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                        <option value="$5,000+">$5,000+</option>
                        <option value="Flexible / Hourly">Flexible / Hourly</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2"
                    >
                      PROJECT SUMMARY *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Briefly describe your product goals, timeline, or what you'd like to build..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-orange-400 focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors resize-none font-sans"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg shadow-white/10 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="size-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="size-3.5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[10px] font-mono text-zinc-500 mt-2">
                    Direct inquiries also welcome at ridamgrover43@gmail.com
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Luxury Client Thank You Popup Modal */}
      <ThankYouModal
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
        senderName={submittedInfo.name}
        senderEmail={submittedInfo.email}
        projectScope={submittedInfo.projectType}
      />
    </section>
  );
}
