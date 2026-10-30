export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  featured: boolean;
  status: "Production" | "In Development" | "Personal Project" | "Academic Project";
  statusColor: string;
  previewImage: string;
  summary: string;
  problemStatement: string;
  myRole: string;
  contributionHighlights: string[];
  technicalArchitecture: {
    overview: string;
    frontend: string;
    backend: string;
    database: string;
    security: string;
  };
  keyFeatures: Array<{
    title: string;
    description: string;
  }>;
  challengesAndSolutions: Array<{
    challenge: string;
    solution: string;
  }>;
  techStack: string[];
  verifiedResults: string[];
  liveUrl?: string;
  githubUrl?: string;
  prevSlug: string;
  nextSlug: string;
}

export const projectsData: Project[] = [
  {
    slug: "radiotangy",
    title: "RadioTangy",
    tagline: "Audio Stories & Episodic Media Streaming Platform",
    category: "Full-Stack Web Application",
    featured: true,
    status: "Production",
    statusColor: "emerald",
    previewImage: "/images/projects/radiotangy.svg",
    summary:
      "A high-fidelity episodic audio platform engineered with Next.js, Supabase, and PostgreSQL, featuring hierarchical season/episode organization, waveform seeking, and secured audio streaming.",
    problemStatement:
      "Digital storytelling listeners and creators required an immersive, interruption-free web listening experience capable of delivering large episodic media with minimal latency, protected subscriber access, and stateful playback persistence across page navigation.",
    myRole: "MERN Stack Developer & Full-Stack Engineer",
    contributionHighlights: [
      "Engineered the full frontend interface with Next.js App Router and responsive Tailwind CSS.",
      "Architected the database schema in Supabase / PostgreSQL for seasons, stories, and episodic metadata.",
      "Implemented HTML5 audio streaming hooks with persistent audio state and waveform seeking.",
      "Built role-based authorization ensuring protected access to premium series episodes.",
      "Optimized media asset caching and response headers to minimize audio buffer latency.",
    ],
    technicalArchitecture: {
      overview:
        "Built on a decoupled Jamstack architecture with Next.js App Router delivering server-rendered catalog views and client-side audio player context.",
      frontend:
        "Next.js 14/15, TypeScript, Tailwind CSS, Framer Motion for episodic transitions and drawer menus.",
      backend:
        "Supabase Edge Functions, RESTful endpoints, and Node.js microservices for media handling.",
      database:
        "PostgreSQL hosted on Supabase with foreign-key relational hierarchies for series -> seasons -> episodes.",
      security:
        "JWT-based session authentication, Supabase Row-Level Security (RLS) policies, and signed media token delivery.",
    },
    keyFeatures: [
      {
        title: "Hierarchical Episodic Navigation",
        description:
          "Intuitive nesting allowing listeners to browse audio series by season, chapter, and bonus content with progress indicators.",
      },
      {
        title: "Persistent Audio Player",
        description:
          "Global playback engine that remains unbroken as listeners navigate between stories, with interactive scrub bar and speed adjustment.",
      },
      {
        title: "Protected Media Streaming",
        description:
          "Role-based gating that prevents direct asset scraping and restricts premium series to authenticated, active subscribers.",
      },
      {
        title: "Adaptive Audio Preloading",
        description:
          "Smart segment buffering that minimizes start-time delays while preventing bandwidth waste on unfinished streams.",
      },
    ],
    challengesAndSolutions: [
      {
        challenge:
          "Preventing audio stream stutter and loss of playback state during route navigation in Next.js.",
        solution:
          "Lifted audio control into a root React Context provider decoupled from page layouts, synchronizing playback position with browser local storage and HTML5 Audio events.",
      },
      {
        challenge:
          "Securing direct audio URLs from unauthorized extraction and hotlinking.",
        solution:
          "Implemented signed audio access tokens and Supabase Row-Level Security to authorize streams only for verified user sessions.",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Framer Motion",
      "HTML5 Web Audio",
    ],
    verifiedResults: [
      "Engineered end-to-end media streaming platform handling multidimensional series and episodes.",
      "Reduced media startup latency through optimized Supabase storage CDN delivery.",
      "Delivered 100% responsive cross-device layout tested across mobile Safari, Chrome, and desktop browsers.",
    ],
    prevSlug: "face-attendance",
    nextSlug: "logistics-crm",
  },
  {
    slug: "logistics-crm",
    title: "Logistics CRM & Freight Suite",
    tagline: "Freight Broker Dispatch & Carrier Management Hub",
    category: "Enterprise Business Web App",
    featured: true,
    status: "In Development",
    statusColor: "amber",
    previewImage: "/images/projects/logistics-crm.svg",
    summary:
      "A centralized operational CRM for freight brokers to manage carrier onboarding, real-time load boards, team dispatching, and planned telecommunication workflows.",
    problemStatement:
      "Freight brokerages often grapple with fragmented spreadsheets, disconnected communication channels, and manual dispatch workflows that increase rate errors and slow load fulfillment.",
    myRole: "Full-Stack Developer",
    contributionHighlights: [
      "Architected the relational schema for carriers, loads, customers, brokers, and rate quotes.",
      "Developed high-density data tables with sorting, filtering, and status progression workflows.",
      "Created backend REST API endpoints for dispatch state machines and load assignment tracking.",
      "Designed extensible integration hooks for RingCentral VoIP calls and Gmail/Outlook email syncing (currently in development).",
    ],
    technicalArchitecture: {
      overview:
        "Modern modular application designed for real-time freight dispatching, rate calculation, and multi-team collaboration.",
      frontend:
        "Next.js, TypeScript, Tailwind CSS, high-performance data tables with virtualized scrolling.",
      backend:
        "Node.js, Express.js REST API with modular controllers and transaction management.",
      database:
        "PostgreSQL / SQL database with normalized schemas for load manifests, carrier safety scores, and broker teams.",
      security:
        "Role-based access control (Admin, Broker, Dispatcher, Accounting) secured via JWT tokens.",
    },
    keyFeatures: [
      {
        title: "Active Load Dispatch Board",
        description:
          "Real-time visual tracking of freight from dispatch to transit, delivery confirmation, and invoice readiness.",
      },
      {
        title: "Carrier & Driver Directory",
        description:
          "Detailed compliance tracking including DOT/MC credentials, equipment types, and verified insurance status.",
      },
      {
        title: "RingCentral VoIP Integration (In Development)",
        description:
          "Click-to-dial direct calling and automated call logging linked to specific load records.",
      },
      {
        title: "Email Synchronization (In Development)",
        description:
          "Planned bidirectional sync with Google Workspace and Outlook to attach rate confirmation PDFs to load threads.",
      },
    ],
    challengesAndSolutions: [
      {
        challenge:
          "Managing complex load status lifecycles with strict regulatory and billing checkpoints.",
        solution:
          "Designed a predictable state machine in TypeScript ensuring loads cannot skip mandatory dispatch or document verification gates.",
      },
      {
        challenge:
          "Rendering dense tabular data without sluggishness on low-tier office computers.",
        solution:
          "Implemented clean pagination, memoized cell renderers, and optimized REST query projections.",
      },
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
      "Tailwind CSS",
    ],
    verifiedResults: [
      "Streamlined load status progression from booking through transit and delivery.",
      "Structured extensible API architecture ready for carrier rating and VOIP webhook consumption.",
      "Standardized multi-role permissions for enterprise logistics teams.",
    ],
    prevSlug: "radiotangy",
    nextSlug: "zenith-mobile",
  },
  {
    slug: "zenith-mobile",
    title: "Zenith Mobile Suite (iOS & Android)",
    tagline: "Cross-Platform Mobile Ecosystem with Verified App Store & Play Store Approvals",
    category: "Mobile Applications (iOS & Android)",
    featured: true,
    status: "Production",
    statusColor: "emerald",
    previewImage: "/images/projects/mobile-apps.svg",
    summary:
      "Enterprise cross-platform mobile suite built with React Native and Expo, featuring offline synchronization, biometric authentication, push notification orchestration, and 100% first-pass production approval on Apple App Store & Google Play Console.",
    problemStatement:
      "Companies require unified mobile user experiences across iOS and Android without maintaining diverging native codebases, requiring strict compliance with Apple Human Interface Guidelines and Google Play privacy security policies.",
    myRole: "Mobile Systems Architect & Full-Stack Developer",
    contributionHighlights: [
      "Architected cross-platform mobile architecture in React Native with Expo Application Services (EAS).",
      "Achieved 100% first-pass human review approval on both Apple App Store and Google Play Console.",
      "Engineered biometric FaceID / TouchID authentication with encrypted keychain credential storage.",
      "Built offline-first SQLite cache layer syncing seamlessly upon network reconnection.",
      "Configured high-density automated build pipelines reducing release turnaround to under 20 minutes.",
    ],
    technicalArchitecture: {
      overview:
        "Unified TypeScript codebase sharing 92% business logic across iOS and Android, backed by serverless microservices and real-time push infrastructure.",
      frontend:
        "React Native 0.74, Expo SDK, TypeScript, NativeWind / Tailwind CSS, Reanimated 3, Gesture Handler.",
      backend:
        "Node.js, Express, Firebase Cloud Messaging (FCM), Apple Push Notification service (APNs).",
      database:
        "Local SQLite with WatermelonDB offline-first reactive sync, cloud PostgreSQL database.",
      security:
        "Encrypted SecureStore / iOS Keychain, biometric FaceID / Fingerprint gating, TLS certificate pinning.",
    },
    keyFeatures: [
      {
        title: "Apple App Store & Google Play Store Verified",
        description:
          "Production builds vetted through rigorous review stages with zero policy violations and 100% first-pass release success.",
      },
      {
        title: "60 FPS Fluid Reanimated Physics",
        description:
          "Smooth gesture-driven navigation and buttery transitions running directly on the native UI thread.",
      },
      {
        title: "Offline-First Synchronization",
        description:
          "Full app operational capacity without active internet, auto-syncing optimistic updates whenever network restores.",
      },
      {
        title: "Biometric Hardware Security",
        description:
          "Hardware-backed secure enclave integration for instant FaceID and fingerprint biometric unlock.",
      },
    ],
    challengesAndSolutions: [
      {
        challenge:
          "Meeting Apple's stringent App Store Review Guideline 4.8 (Sign in with Apple) and privacy manifest requirements.",
        solution:
          "Integrated native Apple Authentication bridges and automated privacy manifest generation in Expo build workflows, clearing review on initial submission.",
      },
      {
        challenge:
          "Eliminating frame drops during heavy list rendering and image caching on mid-range Android devices.",
        solution:
          "Adopted FlashList for ultra-fast list recycling and configured native memory-cached WebP image decoders.",
      },
    ],
    techStack: [
      "React Native",
      "Expo EAS",
      "iOS Swift Bridge",
      "Android Kotlin",
      "TypeScript",
      "Tailwind CSS",
      "SQLite",
      "Firebase FCM",
    ],
    verifiedResults: [
      "100% first-pass production approval rate on Apple App Store & Google Play Store.",
      "Maintained constant 60 FPS scrolling benchmark across iOS and Android devices.",
      "92% shared cross-platform code coverage reducing maintenance overhead.",
    ],
    prevSlug: "logistics-crm",
    nextSlug: "ecommerce-platform",
  },
  {
    slug: "ecommerce-platform",
    title: "Nexus E-Commerce Platform",
    tagline: "High-Performance Full-Stack Shopping Experience",
    category: "Full-Stack MERN Application",
    featured: true,
    status: "Production",
    statusColor: "emerald",
    previewImage: "/images/projects/ecommerce.svg",
    summary:
      "A scalable MERN stack e-commerce web application featuring Google OAuth 2.0, JWT authentication, dynamic catalog filtering, cart persistence, and an administrative product control panel.",
    problemStatement:
      "Small-to-medium retail brands need an agile, responsive shopping portal that delivers rapid page loads, friction-free guest/OAuth checkout, and clear product management without vendor lock-in.",
    myRole: "Full-Stack MERN Developer",
    contributionHighlights: [
      "Engineered end-to-end MERN architecture using MongoDB, Express.js, React.js, and Node.js.",
      "Implemented dual authentication supporting both email/password with JWT and Google OAuth 2.0.",
      "Crafted polished, responsive UI using Ant Design and custom Tailwind CSS components.",
      "Built administrative dashboard for adding products, updating inventory, and monitoring order statuses.",
      "Optimized MongoDB indexing on product categories, tags, and pricing filters.",
    ],
    technicalArchitecture: {
      overview:
        "Client-server architecture with React SPA frontend consuming authenticated Express.js REST API backed by MongoDB Atlas.",
      frontend:
        "React.js, Tailwind CSS, Ant Design UI components, Axios HTTP client, Context API for state.",
      backend:
        "Node.js, Express.js, Passport.js for OAuth, Bcrypt for password hashing, JWT for token management.",
      database:
        "MongoDB Atlas with Mongoose ODM schemas, compound index optimization, and aggregation pipelines.",
      security:
        "HTTP-only authentication cookies, CORS protection, sanitize-input middleware, and input validation.",
    },
    keyFeatures: [
      {
        title: "Secure Dual Authentication",
        description:
          "Seamless login via Google OAuth 2.0 or verified email credentials with hashed password protection.",
      },
      {
        title: "Dynamic Filter & Search Matrix",
        description:
          "Instant category, price range, and tag filtering powered by debounced client requests and indexed queries.",
      },
      {
        title: "Persistent Cart & Wishlist",
        description:
          "State synchronization between browser local storage and cloud database upon authenticated login.",
      },
      {
        title: "Merchant Admin Console",
        description:
          "Dedicated administrative control for inventory changes, product uploads, order tracking, and sales overview.",
      },
    ],
    challengesAndSolutions: [
      {
        challenge:
          "Handling cart synchronization when an unauthenticated visitor logs in with items already in their local cart.",
        solution:
          "Built a merge reconciliation algorithm on the backend that merges anonymous cart arrays with stored user cart profiles upon login.",
      },
      {
        challenge:
          "Ensuring fast search results as the product catalog grows.",
        solution:
          "Created compound text indexes in MongoDB on product titles, categories, and tags, returning paginated subsets.",
      },
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Ant Design",
      "Tailwind CSS",
      "JWT",
      "Google OAuth",
    ],
    verifiedResults: [
      "Engineered production-ready full-stack shopping and admin workflow from scratch.",
      "Delivered sub-100ms API response times for catalog search and category queries.",
      "Implemented rock-solid authentication flow with zero credential exposure.",
    ],
    prevSlug: "zenith-mobile",
    nextSlug: "gadgetsworld",
  },
  {
    slug: "gadgetsworld",
    title: "GadgetsWorld",
    tagline: "Consumer Electronics Discovery & Spec Comparison Matrix",
    category: "Frontend Web Application",
    featured: false,
    status: "Personal Project",
    statusColor: "blue",
    previewImage: "/images/projects/gadgetsworld.svg",
    summary:
      "A fast, modern consumer electronics exploration web app built with React.js and Tailwind CSS, offering side-by-side device spec benchmarking, dynamic search, and responsive filtering.",
    problemStatement:
      "Tech enthusiasts and consumers often struggle with convoluted tech specification sheets across manufacturer websites when trying to compare competing smartphones and laptops.",
    myRole: "Frontend Creator & Developer",
    contributionHighlights: [
      "Designed and coded a mobile-first interface optimized for rapid device discovery.",
      "Implemented multi-device comparison matrix showing key hardware benchmarks side by side.",
      "Structured modular component architecture for spec badges, rating meters, and category tabs.",
      "Integrated real-time text search with category filtering for immediate feedback.",
    ],
    technicalArchitecture: {
      overview:
        "Lightweight, snappy React client application leveraging Context API for comparison state and Tailwind CSS for utility-first responsive styling.",
      frontend: "React.js, Tailwind CSS, Lucide Icons, React Context.",
      backend: "Client-side structured JSON datasets and REST API consumer.",
      database: "Normalized device specification repository.",
      security: "Sanitized search queries and client-side defensive validation.",
    },
    keyFeatures: [
      {
        title: "Side-by-Side Spec Matrix",
        description:
          "Instant comparison of CPU/GPU scores, battery capacities, camera sensors, and display resolutions.",
      },
      {
        title: "Live Category Filtering",
        description:
          "Fast switching across smartphones, ultrabooks, audio devices, and smart wearables.",
      },
      {
        title: "Responsive Matrix Layout",
        description:
          "Adaptive table view that cleanly pivots into swipeable cards on mobile viewports.",
      },
    ],
    challengesAndSolutions: [
      {
        challenge:
          "Displaying dense technical tables on narrow smartphone screens without horizontal breakage.",
        solution:
          "Engineered a responsive comparative column card layout that highlights differences while preserving touch ergonomics.",
      },
    ],
    techStack: [
      "React.js",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "Context API",
      "Responsive UI",
    ],
    verifiedResults: [
      "Built clean, intuitive UI for comparing multi-attribute hardware specs.",
      "100% client-side instant filtering with 0 perceptible latency.",
    ],
    prevSlug: "ecommerce-platform",
    nextSlug: "face-attendance",
  },
  {
    slug: "face-attendance",
    title: "Face Recognition Attendance System",
    tagline: "Biometric Computer Vision Automated Attendance Tracker",
    category: "Computer Vision & Engineering Project",
    featured: false,
    status: "Academic Project",
    statusColor: "purple",
    previewImage: "/images/projects/face-attendance.svg",
    summary:
      "An automated biometric attendance platform using Python, OpenCV, and NumPy that detects facial features via webcam feed, verifies identities against a database, and logs timestamped records.",
    problemStatement:
      "Manual classroom and office attendance logging is slow, prone to proxy attendance, and burdensome to transcribe into administrative records.",
    myRole: "Engineer & Algorithm Developer",
    contributionHighlights: [
      "Developed face detection and feature extraction pipeline using OpenCV Haar cascades and deep embeddings.",
      "Built automated dataset collection tool to train and register new individual faces.",
      "Engineered real-time identity recognition with Euclidean distance thresholding.",
      "Integrated automated timestamp logging to SQLite database with daily CSV export capabilities.",
    ],
    technicalArchitecture: {
      overview:
        "Real-time computer vision processing pipeline capturing video frames, performing facial landmark localization, and matching feature vectors against enrolled profiles.",
      frontend: "Tkinter / GUI desktop interface with live OpenCV video canvas overlay.",
      backend: "Python 3, OpenCV (cv2), NumPy for vector mathematics.",
      database: "SQLite database storing attendee IDs, timestamps, and enrolled vector encodings.",
      security: "Anti-spoofing basic checks and confidence threshold verification.",
    },
    keyFeatures: [
      {
        title: "Real-Time Face Localization",
        description:
          "High-frame-rate bounding box tracking and landmark estimation on standard webcams.",
      },
      {
        title: "Automated Attendance Registry",
        description:
          "Instantaneous logging of verified individuals with exact check-in time and date.",
      },
      {
        title: "CSV & Report Generation",
        description:
          "One-click export of daily or monthly attendance records for administrative auditing.",
      },
    ],
    challengesAndSolutions: [
      {
        challenge:
          "Handling varying lighting conditions and slight angle tilts without false rejections.",
        solution:
          "Applied histogram equalization to normalize illumination across video frames and trained on multi-angle sample sets per subject.",
      },
    ],
    techStack: ["Python", "OpenCV", "NumPy", "SQLite", "Computer Vision"],
    verifiedResults: [
      "Demonstrated reliable automated facial verification in real-time camera feed testing.",
      "Eliminated manual attendance sheets with automated digital report generation.",
    ],
    prevSlug: "gadgetsworld",
    nextSlug: "radiotangy",
  },
];

