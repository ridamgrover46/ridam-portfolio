export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  workType: "Contract" | "Freelance" | "Platform";
  period: string;
  current: boolean;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export const experiencesData: ExperienceItem[] = [
  {
    id: "freelance-fullstack",
    role: "Full-Stack Engineer & Consultant",
    company: "Independent Client Practice",
    location: "Remote / Global",
    workType: "Freelance",
    period: "2023 — Present",
    current: true,
    summary:
      "Partnering directly with founders, digital brands, and startups to engineer bespoke full-stack web platforms, high-throughput cloud APIs, and conversion-focused web systems.",
    responsibilities: [
      "Architect and ship production applications with Next.js App Router, React, TypeScript, and modern headless tooling.",
      "Engineered resilient backend architectures, RESTful APIs, JWT/OAuth authentication systems, and cloud databases (MongoDB, PostgreSQL, Supabase).",
      "Optimize web performance, Core Web Vitals, and responsive UI engineering to maximize user acquisition and speed.",
      "Provide technical consulting, codebase audits, and ongoing architecture maintenance for international clients.",
    ],
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Tailwind CSS",
      "GraphQL / REST",
    ],
  },
  {
    id: "mobile-apps",
    role: "Cross-Platform Mobile Engineer",
    company: "Mobile App Deliveries",
    location: "Remote",
    workType: "Contract",
    period: "2023 — Present",
    current: true,
    summary:
      "Designed, developed, and deployed cross-platform native-feel mobile applications with 100% first-pass store approvals on both Apple App Store and Google Play Store.",
    responsibilities: [
      "Engineered cross-platform mobile applications using React Native and modern mobile tooling.",
      "Handled complete Apple Developer and Google Play Console release lifecycles, certificates, provisioning profiles, and review compliance.",
      "Implemented push notifications, offline local state caching, secure biometric authentication, and smooth 60fps gesture interactions.",
    ],
    technologies: [
      "React Native",
      "TypeScript",
      "iOS App Store",
      "Google Play Console",
      "Redux / Zustand",
      "REST APIs",
    ],
  },
  {
    id: "radiotangy",
    role: "Full-Stack Engineer (Platform Project)",
    company: "RadioTangy",
    companyUrl: "https://radiotangy.com",
    location: "Remote",
    workType: "Platform",
    period: "2024",
    current: false,
    summary:
      "Engineered the full-stack architecture for the RadioTangy audio storytelling platform, focusing on performant media streaming security, responsive Next.js frontend, and persistent audio playback.",
    responsibilities: [
      "Built the core web application using Next.js App Router, TypeScript, and Supabase.",
      "Designed relational PostgreSQL models for multi-season story hierarchies and episodic chapters.",
      "Developed custom persistent HTML5 audio player engine with scrub seeking and playback speed state.",
      "Implemented role-based access gating and signed token security to prevent unauthorized media extraction.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Framer Motion",
      "Web Audio API",
    ],
  },
];
