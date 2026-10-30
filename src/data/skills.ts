export interface Skill {
  name: string;
  category: "frontend" | "backend" | "database" | "motion" | "tools";
  status: "Professional" | "Exploring" | "Core";
  description: string;
  badge?: string;
}

export interface SkillCategory {
  id: "frontend" | "backend" | "database" | "motion" | "tools";
  title: string;
  subtitle: string;
  skills: Skill[];
}

export const skillsCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    subtitle: "Creating high-performance, accessible, and reactive user interfaces",
    skills: [
      {
        name: "React.js",
        category: "frontend",
        status: "Core",
        description: "Component architecture, hooks, lifecycle management, performance optimization.",
        badge: "Core Stack",
      },
      {
        name: "Next.js",
        category: "frontend",
        status: "Professional",
        description: "App Router, SSR, Server Components, dynamic routing, metadata & SEO.",
        badge: "Production",
      },
      {
        name: "TypeScript",
        category: "frontend",
        status: "Core",
        description: "Strict typing, generics, interfaces, scalable codebases.",
        badge: "Core Stack",
      },
      {
        name: "JavaScript (ES6+)",
        category: "frontend",
        status: "Core",
        description: "Modern syntax, async/await, closures, DOM APIs, event-driven patterns.",
        badge: "Core Stack",
      },
      {
        name: "Tailwind CSS",
        category: "frontend",
        status: "Professional",
        description: "Utility-first design systems, responsive layouts, design token customization.",
        badge: "Production",
      },
      {
        name: "shadcn/ui",
        category: "frontend",
        status: "Professional",
        description: "Accessible, headless primitives tailored with custom aesthetics.",
        badge: "Production",
      },
      {
        name: "Ant Design",
        category: "frontend",
        status: "Professional",
        description: "Enterprise UI patterns, data-heavy tables, forms, and modals.",
        badge: "Production",
      },
      {
        name: "HTML5 / CSS3",
        category: "frontend",
        status: "Core",
        description: "Semantic markup, modern layout techniques (Flexbox, Grid), CSS variables.",
        badge: "Core Stack",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & Systems",
    subtitle: "Robust server logic, resilient APIs, and security protocols",
    skills: [
      {
        name: "Node.js",
        category: "backend",
        status: "Core",
        description: "Event-driven runtime, asynchronous I/O, server management.",
        badge: "Core Stack",
      },
      {
        name: "Express.js",
        category: "backend",
        status: "Core",
        description: "RESTful architecture, custom middleware pipelines, error handling.",
        badge: "Core Stack",
      },
      {
        name: "REST API Development",
        category: "backend",
        status: "Professional",
        description: "Clean endpoint design, versioning, status codes, payload optimization.",
        badge: "Production",
      },
      {
        name: "JWT Authentication",
        category: "backend",
        status: "Professional",
        description: "Stateless session tokens, refresh token rotation, payload verification.",
        badge: "Production",
      },
      {
        name: "Google OAuth 2.0",
        category: "backend",
        status: "Professional",
        description: "Third-party social authentication flows and secure credential linking.",
        badge: "Production",
      },
      {
        name: "Role-Based Access Control (RBAC)",
        category: "backend",
        status: "Professional",
        description: "Granular route protection, user tiers, and permission gates.",
        badge: "Production",
      },
    ],
  },
  {
    id: "database",
    title: "Database & Cloud Architecture",
    subtitle: "Relational, document, and cloud-native persistent storage systems",
    skills: [
      {
        name: "MongoDB",
        category: "database",
        status: "Core",
        description: "Document models, Mongoose schemas, compound indexes, aggregation pipelines.",
        badge: "Core Stack",
      },
      {
        name: "PostgreSQL",
        category: "database",
        status: "Professional",
        description: "Relational data structures, foreign keys, complex joins, data integrity.",
        badge: "Production",
      },
      {
        name: "Supabase",
        category: "database",
        status: "Professional",
        description: "Postgres management, Row-Level Security (RLS), edge functions, cloud storage.",
        badge: "Production",
      },
      {
        name: "SQL",
        category: "database",
        status: "Core",
        description: "Structured querying, transactions, index optimization, normalization.",
        badge: "Core Stack",
      },
    ],
  },
  {
    id: "motion",
    title: "Motion & Creative Development",
    subtitle: "Elevating digital products with purposeful physics, transitions, and 3D",
    skills: [
      {
        name: "Framer Motion",
        category: "motion",
        status: "Professional",
        description: "Spring physics, layout animations, exit animations, gestures.",
        badge: "Production",
      },
      {
        name: "GSAP & ScrollTrigger",
        category: "motion",
        status: "Exploring",
        description: "Timeline orchestration, scroll-scrubbed reveals, complex sequences.",
        badge: "Exploring",
      },
      {
        name: "Lenis",
        category: "motion",
        status: "Exploring",
        description: "Inertial smooth scrolling synchronization with animation timelines.",
        badge: "Exploring",
      },
      {
        name: "Three.js",
        category: "motion",
        status: "Exploring",
        description: "WebGL interactive viewports, 3D geometries, materials, camera controls.",
        badge: "Exploring",
      },
    ],
  },
  {
    id: "tools",
    title: "Engineering Tools & DevOps",
    subtitle: "Collaborative workflows, version control, and production delivery",
    skills: [
      {
        name: "Git & GitHub",
        category: "tools",
        status: "Core",
        description: "Branching strategies, PR reviews, rebasing, issue tracking.",
        badge: "Daily Tool",
      },
      {
        name: "Postman",
        category: "tools",
        status: "Professional",
        description: "API testing, automated collection runs, environment mockups.",
        badge: "Daily Tool",
      },
      {
        name: "Vercel",
        category: "tools",
        status: "Professional",
        description: "Next.js continuous integration, preview deployments, domain management.",
        badge: "Production",
      },
      {
        name: "Axios",
        category: "tools",
        status: "Core",
        description: "HTTP interceptors, token injection, timeout handling, error normalization.",
        badge: "Daily Tool",
      },
      {
        name: "VS Code",
        category: "tools",
        status: "Core",
        description: "Tailored IDE setup, debugging, ESLint, Prettier, TypeScript tooling.",
        badge: "Daily Tool",
      },
    ],
  },
];

