"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { name: "About", href: "/#about" },
  { name: "Work", href: "/#work" },
  { name: "Services", href: "/#services" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar({ onOpenResume }: { onOpenResume?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["about", "work", "services", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-3" : "py-5 sm:py-7"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Floating Luxury Glass Pill */}
          <div className="rounded-full bg-[#0b0c11]/85 border border-white/[0.12] backdrop-blur-xl px-5 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_10px_35px_-5px_rgba(0,0,0,0.8)]">
            {/* Wordmark in Luxury Editorial Serif */}
            <Link
              href="/"
              onClick={handleLinkClick}
              className="group flex items-center gap-2 focus-visible:outline-none"
              aria-label="Ridam Grover Home"
            >
              <span className="font-serif text-lg sm:text-xl tracking-tight text-white group-hover:text-orange-400 transition-colors">
                Ridam Grover
              </span>
            </Link>

            {/* Desktop Navigation Links (About -> Work -> Services -> Experience -> Contact) */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("/#", "");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`transition-colors duration-200 ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Cluster */}
            <div className="flex items-center gap-3">
              {/* Curriculum Vitae trigger (if provided) */}
              {onOpenResume && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white font-mono text-[11px] tracking-wider transition-colors"
                >
                  <span>CV</span>
                </button>
              )}

              {/* Main Pill CTA: Let's talk */}
              <Link
                href="/#contact"
                onClick={handleLinkClick}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white font-mono text-xs uppercase tracking-wider transition-all duration-300"
              >
                <span>Let&apos;s talk</span>
                <ArrowUpRight className="size-3.5 text-orange-400 group-hover:text-black" />
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden size-8 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-zinc-300"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="size-4 text-orange-400" />
                ) : (
                  <Menu className="size-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl flex flex-col justify-center px-8">
          <nav className="flex flex-col gap-6 text-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="font-serif text-3xl text-zinc-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
              <Link
                href="/#contact"
                onClick={handleLinkClick}
                className="inline-flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="size-4" />
              </Link>

              {onOpenResume && (
                <button
                  type="button"
                  onClick={() => {
                    handleLinkClick();
                    onOpenResume();
                  }}
                  className="py-3 rounded-full border border-white/15 text-zinc-300 font-mono text-xs uppercase tracking-wider"
                >
                  Curriculum Vitae
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
