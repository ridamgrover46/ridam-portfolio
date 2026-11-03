"use client";

import { soundManager } from "@/lib/sound";

interface LenisWindow {
  lenis?: {
    scrollTo: (
      target: string | HTMLElement,
      opts?: { offset?: number; duration?: number; immediate?: boolean }
    ) => void;
  };
}

export function scrollToTarget(
  target: string,
  e?: React.MouseEvent | React.TouchEvent,
  playSound = true
) {
  if (typeof window === "undefined") return;

  if (e) {
    e.preventDefault();
  }

  if (playSound) {
    soundManager.playClick?.();
  }

  const hash = target.startsWith("#") ? target : `#${target}`;
  const el = document.querySelector(hash) as HTMLElement | null;

  if (el) {
    const win = window as unknown as LenisWindow;
    if (win.lenis) {
      win.lenis.scrollTo(el, { offset: -35, duration: 1.0 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else {
    // If element is not in current DOM (e.g. user is on /work page)
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = `/${hash}`;
  }
}
