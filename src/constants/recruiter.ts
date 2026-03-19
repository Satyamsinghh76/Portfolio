export const recruiterProfile = {
  name: "Satyam Singh",
  role: "Full Stack Developer",
  tagline:
    "Building scalable SaaS platforms, real-time systems, and AI-driven applications.",
  summary:
    "Full Stack Developer with hands-on experience building production-grade applications across SaaS, real-time systems, and machine learning. Strong focus on system design, data integrity, and performance.",
  experiences: [
    "Designing scalable backend architectures",
    "Building real-time applications with live data synchronization",
    "Implementing secure authentication and API systems",
    "Solving real-world problems using data-driven and AI-based approaches",
  ],
  skillCategories: [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Responsive UI"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "REST APIs", "Auth Systems"],
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "MongoDB", "Firebase Firestore"],
    },
    {
      title: "Systems & Architecture",
      skills: ["Real-time (Convex, WebSockets)", "Cron Jobs", "Modular Architecture"],
    },
    {
      title: "AI / ML",
      skills: ["Logistic Regression", "Class Imbalance", "Probability Predictions"],
    },
    {
      title: "Tools & Integrations",
      skills: ["Stripe", "Google OAuth", "Cloudinary", "Firebase", "JWT"],
    },
  ],
  strengths: [
    "Strong system design thinking (SaaS, real-time, ML systems)",
    "Focus on real-world problems instead of demo projects",
    "Ability to build end-to-end applications (frontend → backend → database)",
    "Clean architecture and modular code practices",
  ],
  projects: [
    {
      id: "bookflow",
      title: "BookFlow",
      subtitle: "SaaS Booking Platform",
      bullets: [
        "Built a full-stack SaaS system for managing bookings, payments, and analytics",
        "Implemented database-level double-booking prevention using PostgreSQL constraints",
        "Designed role-based dashboards (admin + user)",
        "Integrated Google OAuth and calendar sync",
        "Developed secure backend with JWT authentication and rate limiting",
      ],
      tech: ["Next.js", "Node.js", "PostgreSQL"],
      repoUrl: "https://github.com/Satyamsinghh76/SaaS_Booking_system",
      liveUrl: "https://booking-system-by-satyam.vercel.app",
    },
    {
      id: "spendsense",
      title: "SpendSense",
      subtitle: "Real-Time Finance Tracker",
      bullets: [
        "Developed real-time finance tracking system with live data updates",
        "Implemented double-entry bookkeeping for financial accuracy",
        "Built budget tracking with analytics and overspend detection",
        "Added recurring transaction automation using cron jobs",
        "Designed guest mode with localStorage fallback",
      ],
      tech: ["React", "TypeScript", "Convex"],
      repoUrl: "https://github.com/Satyamsinghh76/SpendSense",
      liveUrl: "https://spend-sense-one-tau.vercel.app",
    },
    {
      id: "fraud-detection",
      title: "Fraud Detection",
      subtitle: "ML Classification System",
      bullets: [
        "Built a fraud detection model handling extreme class imbalance (1:578 ratio)",
        "Implemented logistic regression with probability-based predictions",
        "Designed real-time prediction interface using Streamlit",
        "Focused on precision vs recall trade-offs for real-world scenarios",
      ],
      tech: ["Python", "scikit-learn"],
      repoUrl: "https://github.com/Satyamsinghh76/Credit-card-fraud-detection",
    },
    {
      id: "travel-planner",
      title: "Travel Planner",
      subtitle: "Recommendation System",
      bullets: [
        "Built a recommendation engine using multi-factor weighted scoring",
        "Ranked destinations based on budget, interests, and timing",
        "Implemented server-side PDF generation",
        "Designed modular REST API architecture",
      ],
      tech: ["React", "Node.js", "MongoDB"],
      repoUrl: "https://github.com/Satyamsinghh76/Travel-Itinerary-Generator",
    },
    {
      id: "memory-gallery",
      title: "Memory Gallery",
      subtitle: "Visual Timeline Platform",
      bullets: [
        "Built a cinematic timeline UI with custom scroll animations",
        "Developed image pipeline using Cloudinary CDN",
        "Implemented Firestore real-time sync with offline fallback",
        "Designed full UI without external frameworks",
      ],
      tech: ["Vanilla JS", "Node.js", "Firebase"],
      repoUrl: "https://github.com/Satyamsinghh76/little_memory_gallery",
    },
  ],
  contact: {
    github: "https://github.com/Satyamsinghh76",
    linkedin: "https://www.linkedin.com/in/satyam-singh-88988a279",
    email: "satyamsinghlko48@gmail.com",
  },
} as const;
