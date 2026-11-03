"use client";

import React, { useEffect } from "react";
import { soundManager } from "@/lib/sound";
import { personalData } from "@/data/personal";
import {
  CheckCircle2,
  X,
  MessageCircle,
  Phone,
  Sparkles,
  ArrowRight,
  MailCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  senderName?: string;
  senderEmail?: string;
  projectScope?: string;
}

export function ThankYouModal({
  isOpen,
  onClose,
  senderName = "Friend",
  senderEmail = "",
  projectScope = "Full-Stack Development",
}: ThankYouModalProps) {
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

  const firstName = senderName.trim().split(" ")[0] || "Friend";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="thank-you-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-lg bg-[#0a0c12] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-10 text-center"
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-44 bg-gradient-to-b from-emerald-500/20 to-transparent blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              aria-label="Close thank you modal"
              className="absolute top-4 right-4 size-9 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all active:scale-90"
            >
              <X className="size-4" />
            </button>

            {/* Glowing Success Badge */}
            <div className="relative mx-auto size-16 sm:size-20 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-400/30 border border-emerald-400/40 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-5">
              <CheckCircle2 className="size-9 sm:size-10 text-emerald-400" />
              <div className="absolute -top-1 -right-1 size-5 rounded-full bg-emerald-400 flex items-center justify-center shadow-md">
                <Sparkles className="size-3 text-slate-950" />
              </div>
            </div>

            {/* Headline */}
            <h3
              id="thank-you-title"
              className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
            >
              Thank You, {firstName}!
            </h3>

            {/* Status Pill */}
            <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] uppercase tracking-wider">
              <MailCheck className="size-3.5 text-emerald-400" />
              <span>Message Dispatched Directly to Ridam</span>
            </div>

            {/* Reassuring Body Description */}
            <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Your project inquiry has been received. I personally review all submissions and will get back to{" "}
              {senderEmail ? (
                <span className="text-cyan-300 font-medium underline underline-offset-2">
                  {senderEmail}
                </span>
              ) : (
                "your email"
              )}{" "}
              within <strong className="text-white font-semibold">12–24 hours</strong> with project thoughts and next steps.
            </p>

            {/* Scope Badge Summary */}
            {projectScope && (
              <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Project Scope</span>
                <span className="text-white font-semibold">{projectScope}</span>
              </div>
            )}

            {/* Need Faster Response? Quick WhatsApp / Call */}
            <div className="mt-6 pt-5 border-t border-white/[0.08]">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
                Need an immediate reply?
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={personalData.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-300 font-sans text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle className="size-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${personalData.phoneRaw}`}
                  onClick={() => soundManager.playClick()}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/[0.05] border border-white/15 hover:bg-white/10 text-white font-sans text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Phone className="size-3.5 text-orange-400" />
                  <span>Call Directly</span>
                </a>
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="mt-6 w-full py-3 rounded-full bg-white text-slate-950 font-sans font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-white/10 flex items-center justify-center gap-2"
            >
              <span>Back to Portfolio</span>
              <ArrowRight className="size-3.5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

