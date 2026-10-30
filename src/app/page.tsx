"use client";

import React, { useState } from "react";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll";
import { CustomCursor } from "@/components/animations/custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";
import { ResumeModal } from "@/components/sections/resume-modal";

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#060709] text-[#f4f4f6] overflow-x-hidden selection:bg-orange-500/25 selection:text-white">
        {/* Desktop Custom Cursor */}
        <CustomCursor />

        {/* Global Navigation */}
        <Navbar onOpenResume={() => setResumeOpen(true)} />

        {/* Main Content Sections */}
        <main className="relative z-10 flex flex-col">
          <Hero onOpenResume={() => setResumeOpen(true)} />
          <ProofStrip />
          <AboutSection />
          <ProjectsSection />
          <ServicesSection onSelectService={handleSelectService} />
          <SkillsSection />
          <ContactSection preselectedService={selectedService} />
        </main>

        {/* Global Minimalist Footer */}
        <Footer />

        {/* Interactive Curriculum Vitae Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </div>
    </SmoothScrollProvider>
  );
}
