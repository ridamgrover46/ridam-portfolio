export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techFocus: string[];
  idealFor: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "fullstack-apps",
    title: "Full-Stack Web Applications",
    tagline: "Custom web systems built with Next.js, Node.js & MongoDB/Postgres",
    description:
      "End-to-end development of dynamic, robust web applications from database architecture to responsive, polished frontend interfaces tailored to your business model.",
    deliverables: [
      "Full architectural blueprint and database modeling",
      "Secure authentication (JWT, Google OAuth, session management)",
      "Role-based access tiers and user permission controls",
      "Clean RESTful APIs with strict validation and error handling",
      "Production deployment on Vercel with edge optimization",
    ],
    techFocus: ["Next.js", "React.js", "Node.js", "Express.js", "PostgreSQL", "MongoDB"],
    idealFor: "Startups and companies needing scalable web products built from the ground up.",
  },
  {
    id: "mobile-apps",
    title: "iOS & Android Cross-Platform Apps",
    tagline: "React Native & Next.js mobile applications with App Store approvals",
    description:
      "Design, build, and deploy high-performance cross-platform mobile apps for iOS and Android, handling push notifications, offline caching, and navigating strict Apple & Google review guidelines.",
    deliverables: [
      "Cross-platform codebase sharing business logic with web platforms",
      "Native device integration (Biometrics, Camera, Storage, Audio)",
      "Apple App Store & Google Play Store provisioning and complete approval",
      "Push notification architecture and offline-first state persistence",
      "In-App subscriptions and Stripe billing flows",
    ],
    techFocus: ["React Native", "Next.js", "Expo", "iOS App Store", "Google Play Store", "TypeScript"],
    idealFor: "Founders and businesses expanding their web product into native mobile app stores.",
  },
  {
    id: "dashboards-crm",
    title: "Business Dashboards & Admin Portals",
    tagline: "High-density data visualization and operational management consoles",
    description:
      "Transform spreadsheets and messy operational data into high-performance, intuitive internal tools, admin consoles, and CRM workflow suites.",
    deliverables: [
      "Custom analytics widgets, charts, and activity feeds",
      "Advanced sortable, filterable, and paginated data grids",
      "Role-based dashboards (Admin, Manager, Team Member)",
      "Exportable CSV and formatted reports",
      "Seamless integration with operational databases",
    ],
    techFocus: ["React.js", "Next.js", "Tailwind CSS", "shadcn/ui", "REST APIs"],
    idealFor: "Businesses requiring structured internal operations, dispatch tools, or team tracking.",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platforms & Headless Stores",
    tagline: "Speedy, modern online stores optimized for customer conversion",
    description:
      "Bespoke e-commerce web applications featuring dynamic product filtering, persistent carts, authenticated user profiles, and seamless merchant management.",
    deliverables: [
      "Dynamic catalog search, category filters, and product detail views",
      "Persistent cart state and customer wishlist sync",
      "Merchant dashboard for inventory, pricing, and order states",
      "Secure checkout flow integration and authentication",
      "Mobile-first, lightning-fast shopping UX",
    ],
    techFocus: ["MERN Stack", "React.js", "Node.js", "Tailwind CSS", "MongoDB"],
    idealFor: "Retailers and brands wanting an independent, tailored store experience.",
  },
  {
    id: "api-integrations",
    title: "API Development & Third-Party Integrations",
    tagline: "Connecting your software to payment gateways, VoIP, email, and cloud APIs",
    description:
      "Design clean, documented RESTful APIs and integrate external third-party services like Google Workspace, communications platforms, and payment providers.",
    deliverables: [
      "RESTful API design with clean resource routing and schema validation",
      "Third-party webhook listeners and asynchronous task queues",
      "Integration with VoIP (RingCentral), Email (Gmail/Outlook), and auth providers",
      "Comprehensive Postman collection and API documentation",
      "Rate-limiting and security hardening",
    ],
    techFocus: ["Node.js", "Express.js", "Postman", "JWT", "Webhooks", "Axios"],
    idealFor: "Teams connecting legacy software to modern cloud infrastructure or external APIs.",
  },
  {
    id: "frontend-modernization",
    title: "Website Modernization & Performance Tuning",
    tagline: "Upgrade legacy code to modern Next.js with stellar Core Web Vitals",
    description:
      "Refactor sluggish, outdated web interfaces into fast, accessible, responsive experiences that rank higher on search engines and delight visitors.",
    deliverables: [
      "Comprehensive performance and Core Web Vitals audit",
      "Migration from outdated UI frameworks to Tailwind CSS & modern React",
      "Asset compression, code-splitting, and render optimization",
      "Cross-browser and mobile responsive touch adaptations",
      "SEO metadata, OpenGraph, and structured JSON-LD setup",
    ],
    techFocus: ["Next.js", "TypeScript", "Tailwind CSS", "Lighthouse", "SEO"],
    idealFor: "Established sites experiencing slow load times, poor mobile UX, or low search rankings.",
  },
];
