import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Database,
  Server,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Ridam Grover",
    };
  }

  return {
    title: `${project.title} — Case Study | Ridam Grover`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Case Study by Ridam Grover`,
      description: project.summary,
      images: [
        {
          url: project.previewImage,
          width: 1200,
          height: 750,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const prevProject = projectsData.find((p) => p.slug === project.prevSlug);
  const nextProject = projectsData.find((p) => p.slug === project.nextSlug);

  return (
    <div className="min-h-screen bg-[#060709] text-white flex flex-col selection:bg-orange-500/30">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Portfolio
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/work" className="hover:text-white transition-colors">
            Work
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-orange-400">{project.title}</span>
        </div>

        {/* Project Header Banner */}
        <div className="max-w-4xl mb-12">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
              {project.status}
            </span>
            <span className="text-xs font-mono text-zinc-400">
              {project.category}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-tight">
            {project.title}
          </h1>
          <p className="mt-3 text-lg sm:text-xl font-mono text-orange-400">
            {project.tagline}
          </p>

          <p className="mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
            {project.summary}
          </p>

          {/* Metadata quick stats */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
            <div>
              <span className="text-zinc-500 block mb-1">ROLE &amp; FOCUS</span>
              <span className="text-white font-semibold">{project.myRole}</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1">STATUS</span>
              <span className="text-emerald-400 font-semibold">{project.status}</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1">LINKS</span>
              <div className="flex items-center gap-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    <span>Live App</span>
                    <ExternalLink className="size-3" />
                  </a>
                ) : (
                  <span className="text-zinc-500">Internal / Proprietary</span>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Repository</span>
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Preview */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#090a0f] aspect-[16/9] shadow-2xl mb-16">
          <Image
            src={project.previewImage}
            alt={`${project.title} Preview Screen`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Detailed Case Study Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Case Study Column */}
          <div className="lg:col-span-8 space-y-16">
            {/* Section 1: Problem & Goals */}
            <section>
              <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest mb-3">
                <span>01 // PROBLEM STATEMENT</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white tracking-tight mb-4">
                The Engineering Challenge &amp; Problem Space
              </h2>
              <p className="text-base text-zinc-300 leading-relaxed font-sans">
                {project.problemStatement}
              </p>
            </section>

            {/* Section 2: What I Built & Contribution */}
            <section>
              <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest mb-3">
                <span>02 // CONTRIBUTIONS</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white tracking-tight mb-4">
                What I Built &amp; Engineering Contributions
              </h2>
              <div className="space-y-3">
                {project.contributionHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#090a0f] border border-white/[0.06] flex items-start gap-3.5"
                  >
                    <div className="size-6 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="size-3.5 text-orange-400" />
                    </div>
                    <span className="text-sm text-zinc-300 leading-relaxed font-sans">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Technical Architecture */}
            <section id="architecture">
              <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest mb-3">
                <span>03 // ARCHITECTURE</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white tracking-tight mb-4">
                Technical Architecture &amp; Data Flow
              </h2>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed font-sans">
                {project.technicalArchitecture.overview}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#090a0f] border border-white/[0.06]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white mb-2">
                    <Code2 className="size-4 text-orange-400" />
                    <span>Frontend Tier</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {project.technicalArchitecture.frontend}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#090a0f] border border-white/[0.06]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white mb-2">
                    <Server className="size-4 text-orange-400" />
                    <span>Backend Services</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {project.technicalArchitecture.backend}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#090a0f] border border-white/[0.06]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white mb-2">
                    <Database className="size-4 text-emerald-400" />
                    <span>Database &amp; Storage</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {project.technicalArchitecture.database}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#090a0f] border border-white/[0.06]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white mb-2">
                    <ShieldCheck className="size-4 text-purple-400" />
                    <span>Security &amp; Auth</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {project.technicalArchitecture.security}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Key Features */}
            <section>
              <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest mb-3">
                <span>04 // FEATURES</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white tracking-tight mb-6">
                Key Features Breakdown
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#090a0f] border border-white/[0.06]"
                  >
                    <h3 className="text-sm font-bold text-white mb-1.5 font-sans">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Challenges & Solutions */}
            <section>
              <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest mb-3">
                <span>05 // PROBLEM SOLVING</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white tracking-tight mb-6">
                Challenges Encountered &amp; Engineered Solutions
              </h2>
              <div className="space-y-4">
                {project.challengesAndSolutions.map((cs, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#090a0f] border border-white/[0.06] space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="size-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-mono text-amber-400 font-semibold block mb-1">
                          THE CHALLENGE
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                          {cs.challenge}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-3 border-t border-white/[0.04]">
                      <Lightbulb className="size-4 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-mono text-orange-400 font-semibold block mb-1">
                          ENGINEERED SOLUTION
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                          {cs.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: Verified Results */}
            <section>
              <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest mb-3">
                <span>06 // IMPACT &amp; OUTCOMES</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white tracking-tight mb-4">
                Verified Deliverables
              </h2>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] space-y-3 font-sans">
                {project.verifiedResults.map((result, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-200">
                    <Sparkles className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{result}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Sidebar: Tech Stack & Actions */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Tech Stack Card */}
              <div className="p-6 rounded-3xl bg-[#090a0f] border border-white/[0.08] shadow-xl">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-4">
                  Full Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2 font-mono">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] text-zinc-200 border border-white/[0.08]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Inquiry Prompt Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-950/20 to-[#090a0f] border border-white/[0.08] shadow-xl">
                <h3 className="text-base font-bold text-white mb-2">
                  Need a similar platform or mobile app built?
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4 font-sans">
                  I can build custom full-stack web applications and cross-platform mobile apps for iOS &amp; Android.
                </p>
                <Link
                  href="/#contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Previous / Next Project Navigation Bar */}
        <div className="mt-24 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-6">
          {prevProject && (
            <Link
              href={`/work/${prevProject.slug}`}
              className="p-6 rounded-2xl bg-[#090a0f] border border-white/[0.06] hover:border-white/20 transition-all group flex flex-col"
            >
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1 mb-1">
                <ArrowLeft className="size-3" /> PREVIOUS CASE STUDY
              </span>
              <span className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                {prevProject.title}
              </span>
              <span className="text-xs font-mono text-zinc-400 mt-1">
                {prevProject.category}
              </span>
            </Link>
          )}

          {nextProject && (
            <Link
              href={`/work/${nextProject.slug}`}
              className="p-6 rounded-2xl bg-[#090a0f] border border-white/[0.06] hover:border-white/20 transition-all group flex flex-col sm:items-end sm:text-right"
            >
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1 mb-1">
                NEXT CASE STUDY <ArrowRight className="size-3" />
              </span>
              <span className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                {nextProject.title}
              </span>
              <span className="text-xs font-mono text-zinc-400 mt-1">
                {nextProject.category}
              </span>
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
