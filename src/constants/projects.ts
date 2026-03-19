import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "bookflow",
    title: "BookFlow",
    subtitle: "SaaS Booking Platform",
    description:
      "A production-grade full-stack SaaS platform that enables businesses to manage bookings, payments, notifications, and analytics from a unified dashboard.",
    problem:
      "Businesses struggle with managing appointments, availability, payments, and customer communication across multiple tools, leading to inefficiencies and booking conflicts.",
    solution:
      "Built a full-stack SaaS platform that centralizes booking management, payments, notifications, and analytics into a single system with real-time availability handling.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    tech: [
      "Next.js", "React", "Node.js", "Express", "PostgreSQL",
      "Tailwind CSS", "Zustand", "Framer Motion", "Stripe", "Twilio", "Google APIs",
    ],
    features: [
      "Real-time booking system with database-level double-booking prevention (PostgreSQL constraints)",
      "Role-based dashboards for admins and customers",
      "Google OAuth authentication and calendar integration",
      "Multi-channel notifications (email, SMS, in-app)",
      "Revenue analytics with dynamic charts",
      "Secure backend with JWT authentication, rate limiting, and validation",
    ],
    highlight:
      "Designed with production-level architecture, including secure authentication, API rate limiting, and scalable database design.",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    color: "#60a5fa",
    icon: "calendar",
    repoUrl: "https://github.com/Satyamsinghh76/SaaS_Booking_system",
    liveUrl: "https://booking-system-by-satyam.vercel.app",
  },
  {
    id: "spendsense",
    title: "SpendSense",
    subtitle: "Real-Time Finance Tracker",
    description:
      "A real-time personal finance platform supporting multi-account tracking, double-entry bookkeeping, and automated recurring transactions.",
    problem:
      "Most personal finance tools are either too simplistic or overly complex, lacking real-time updates and accurate financial tracking across multiple accounts.",
    solution:
      "Developed a real-time finance management system with double-entry accounting and live data synchronization, enabling users to track finances accurately without manual refresh.",
    tags: ["React", "TypeScript", "Convex", "Recharts"],
    tech: [
      "React", "TypeScript", "Convex", "Tailwind CSS", "Recharts", "Vite",
    ],
    features: [
      "Real-time updates using WebSocket-based subscriptions (Convex backend)",
      "Double-entry bookkeeping system ensuring financial accuracy",
      "Budget tracking with overspend alerts and analytics",
      "Automated recurring transactions using cron jobs",
      "Guest mode with localStorage fallback for offline usability",
      "Interactive dashboards with charts and net worth calculation",
    ],
    highlight:
      "Implements production-level financial logic with real-time architecture and data integrity guarantees.",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    color: "#34d399",
    icon: "chart",
    repoUrl: "https://github.com/Satyamsinghh76/SpendSense",
    liveUrl: "https://spend-sense-one-tau.vercel.app",
  },
  {
    id: "fraud-detection",
    title: "Fraud Detection",
    subtitle: "ML Classification System",
    description:
      "A machine learning system for detecting fraudulent credit card transactions in real time, handling extreme class imbalance with calibrated predictions.",
    problem:
      "Fraud detection systems must identify rare fraudulent transactions in real time while minimizing false positives, especially under extreme class imbalance.",
    solution:
      "Built a machine learning pipeline using logistic regression to detect fraudulent transactions with calibrated probability outputs for decision-based systems.",
    tags: ["Python", "scikit-learn", "Streamlit", "NumPy"],
    tech: ["Python", "scikit-learn", "pandas", "NumPy", "Streamlit"],
    features: [
      "Handles extreme class imbalance (1:578) using undersampling",
      "Logistic regression model with probability-based predictions",
      "Real-time prediction interface using Streamlit",
      "Data validation and preprocessing pipeline",
      "Sub-second inference for transaction scoring",
    ],
    highlight:
      "Focused on real-world ML challenges like class imbalance, cost-sensitive errors, and probability calibration instead of just accuracy optimization.",
    gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    color: "#f87171",
    icon: "shield",
    repoUrl: "https://github.com/Satyamsinghh76/Credit-card-fraud-detection",
  },
  {
    id: "travel-planner",
    title: "Travel Planner",
    subtitle: "Intelligent Recommendation System",
    description:
      "A full-stack travel planning app that generates personalized itineraries using a multi-factor recommendation algorithm based on budget, interests, and dates.",
    problem:
      "Planning travel involves comparing multiple options manually, making it time-consuming and inefficient to find destinations that match preferences.",
    solution:
      "Built a recommendation engine that ranks destinations using a weighted scoring algorithm based on budget, interests, activities, and travel dates.",
    tags: ["React", "Node.js", "MongoDB", "PDFKit"],
    tech: ["React", "Node.js", "Express", "MongoDB", "Mongoose", "PDFKit"],
    features: [
      "Multi-factor scoring algorithm for ranking destinations",
      "Flexible budget matching using percentage-based filtering",
      "Dynamic UI with database-driven filters",
      "Server-side PDF itinerary generation",
      "RESTful API with modular architecture",
    ],
    highlight:
      "Built a recommendation engine from scratch with weighted scoring logic similar to real-world systems.",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    color: "#a78bfa",
    icon: "globe",
    repoUrl: "https://github.com/Satyamsinghh76/Travel-Itinerary-Generator",
  },
  {
    id: "memory-gallery",
    title: "Memory Gallery",
    subtitle: "Cinematic Timeline Experience",
    description:
      "A full-stack visual storytelling platform that transforms family memories into an immersive, scroll-driven timeline with real-time sync and CDN delivery.",
    problem:
      "Family photos are often scattered and lack structure, making it difficult to relive memories in a meaningful way.",
    solution:
      "Created a cinematic timeline-based platform that organizes memories chronologically with immersive animations and real-time cloud sync.",
    tags: ["JavaScript", "Firebase", "Cloudinary", "Vite"],
    tech: [
      "Vanilla JavaScript", "Node.js", "Express",
      "Firebase Firestore", "Cloudinary", "Vite",
    ],
    features: [
      "Scroll-driven animation system using SVG and Intersection Observer",
      "Cloudinary-based image upload and CDN delivery",
      "Firestore real-time database with auto-sync",
      "localStorage fallback for offline resilience",
      "Secure API with token-based authentication",
    ],
    highlight:
      "Engineered a fully custom animation and rendering system without external libraries, focusing on performance and UX.",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    color: "#f472b6",
    icon: "image",
    repoUrl: "https://github.com/Satyamsinghh76/little_memory_gallery",
  },
];
