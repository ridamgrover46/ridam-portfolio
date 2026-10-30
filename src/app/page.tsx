"use client";

import React, { useState } from "react";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll";
import { CustomCursor } from "@/components/animations/custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { AboutSection } from "@/components/sections/about-section";
import { ProcessFlow } from "@/components/sections/process-flow";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";
import { MobileQuickBar } from "@/components/layout/mobile-quick-bar";
import { CinematicPreloader } from "@/components/animations/cinematic-preloader";

export default function Home() {
  const [selectedService, setSelectedService] = useState("");

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#060709] text-[#f4f4f6] overflow-x-hidden selection:bg-orange-500/25 selection:text-white">
        {/* Cinematic Intro Preloader & Curtain Wipe */}
        <CinematicPreloader />

        {/* Desktop Custom Cursor */}
        <CustomCursor />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10 flex flex-col">
          <Hero />
          <ProofStrip />
          <AboutSection />
          <ProcessFlow />
          <ProjectsSection />
          <ServicesSection onSelectService={handleSelectService} />
          <SkillsSection />
          <ContactSection preselectedService={selectedService} />
        </main>

        {/* Global Minimalist Footer */}
        <Footer />

        {/* Mobile Sticky Quick Contact Pill Bar */}
        <MobileQuickBar />
      </div>
    </SmoothScrollProvider>
  );
}
