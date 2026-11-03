"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // High-Performance Mobile Check:
    // Touch/mobile devices have native hardware-accelerated momentum scrolling (120Hz ProMotion/AMOLED).
    // Disabling Lenis virtual-scroll on touch/mobile eliminates touch drag lag and restores buttery native 120 FPS!
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768 ||
        "ontouchstart" in window);

    if (isTouchDevice) {
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
      });
      return;
    }

    // Initialize Lenis ONLY on Desktop Mouse Pointer Devices
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.0,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Expose lenis instance globally for reliable smooth-scroll navigation
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      delete (window as unknown as { lenis?: Lenis }).lenis;
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}

