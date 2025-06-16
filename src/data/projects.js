const projects = [
  {
    id: "project-1",
    title: "NeoBank Dashboard",
    thumbnail: "/images/neobank-thumb.webp",
    date: "2024-11-15",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    industry: "FinTech",
    description: "A cutting-edge banking dashboard with real-time analytics, transaction monitoring, and cyberpunk-inspired UI design. Features glassmorphism effects, dynamic data visualization, and seamless user experience.",
    detailedDescription: "This project showcases a modern banking interface that combines functionality with aesthetic appeal. Built with React and TypeScript for robust type safety, the dashboard features real-time transaction monitoring, advanced analytics charts, and a responsive design that works seamlessly across all devices. The cyberpunk-inspired design uses glassmorphism effects and neon accents to create an engaging user experience while maintaining accessibility standards.",
    screenshots: [
      "/images/neobank-dashboard.webp",
      "/images/neobank-analytics.webp",
      "/images/neobank-transactions.webp",
      "/images/neobank-mobile.webp"
    ],
    websiteUrl: "https://neobank-demo.vercel.app",
    githubUrl: "https://github.com/andre/neobank-dashboard",
    featured: true,
    status: "completed"
  },
  {
    id: "project-2",
    title: "CyberShield Security Platform",
    thumbnail: "/images/cybershield-thumb.webp",
    date: "2024-09-22",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "D3.js"],
    industry: "Cybersecurity",
    description: "Advanced cybersecurity monitoring platform with threat detection, real-time alerts, and comprehensive security analytics. Built for enterprise-level security operations.",
    detailedDescription: "CyberShield represents the next generation of cybersecurity platforms, offering real-time threat detection, automated response systems, and comprehensive security analytics. The platform integrates with multiple security tools and provides a unified dashboard for security operations teams. Features include machine learning-powered threat detection, customizable alert systems, and detailed forensic analysis capabilities.",
    screenshots: [
      "/images/cybershield-dashboard.webp",
      "/images/cybershield-threats.webp",
      "/images/cybershield-analytics.webp",
      "/images/cybershield-reports.webp"
    ],
    websiteUrl: "https://cybershield-demo.vercel.app",
    githubUrl: "https://github.com/andre/cybershield-platform",
    featured: true,
    status: "completed"
  },
  {
    id: "project-3",
    title: "Neural Creative Studio",
    thumbnail: "/images/neural-studio-thumb.webp",
    date: "2024-08-10",
    technologies: ["React", "Three.js", "WebGL", "Python", "TensorFlow"],
    industry: "Creative Tech",
    description: "AI-powered creative studio for generating and manipulating digital art using neural networks. Features real-time rendering and interactive 3D visualizations.",
    detailedDescription: "Neural Creative Studio combines artificial intelligence with creative expression, allowing users to generate, modify, and interact with digital art using advanced neural networks. The platform features real-time 3D rendering, interactive visualizations, and a user-friendly interface that makes AI art creation accessible to both artists and technologists. Built with React and Three.js for smooth performance and stunning visual effects.",
    screenshots: [
      "/images/neural-studio-main.webp",
      "/images/neural-studio-gallery.webp",
      "/images/neural-studio-editor.webp",
      "/images/neural-studio-3d.webp"
    ],
    websiteUrl: "https://neural-studio-demo.vercel.app",
    githubUrl: "https://github.com/andre/neural-creative-studio",
    featured: true,
    status: "completed"
  },
  {
    id: "project-4",
    title: "QuantumCommerce Platform",
    thumbnail: "/images/quantum-commerce-thumb.webp",
    date: "2024-06-18",
    technologies: ["Vue.js", "Express.js", "MongoDB", "Stripe API"],
    industry: "E-commerce",
    description: "Next-generation e-commerce platform with quantum-inspired design, advanced product visualization, and seamless checkout experience.",
    detailedDescription: "QuantumCommerce redefines online shopping with its quantum-inspired design language and advanced product visualization capabilities. The platform features 3D product previews, AR integration for mobile devices, and a lightning-fast checkout process. Built with modern web technologies to ensure optimal performance and scalability for high-traffic e-commerce operations.",
    screenshots: [
      "/images/quantum-commerce-home.webp",
      "/images/quantum-commerce-product.webp",
      "/images/quantum-commerce-cart.webp",
      "/images/quantum-commerce-admin.webp"
    ],
    websiteUrl: "https://quantum-commerce-demo.vercel.app",
    githubUrl: "https://github.com/andre/quantum-commerce",
    featured: false,
    status: "completed"
  },
  {
    id: "project-5",
    title: "Neural Network Visualizer",
    thumbnail: "/images/neural-viz-thumb.webp",
    date: "2024-04-25",
    technologies: ["D3.js", "Python", "Flask", "WebSockets"],
    industry: "Data Science",
    description: "Interactive neural network visualization tool for understanding and debugging machine learning models in real-time.",
    detailedDescription: "This powerful visualization tool helps data scientists and machine learning engineers understand complex neural network architectures through interactive diagrams and real-time training visualization. Features include layer-by-layer analysis, weight visualization, gradient flow monitoring, and performance metrics tracking. The tool supports multiple ML frameworks and provides intuitive insights into model behavior.",
    screenshots: [
      "/images/neural-viz-architecture.webp",
      "/images/neural-viz-training.webp",
      "/images/neural-viz-weights.webp",
      "/images/neural-viz-metrics.webp"
    ],
    websiteUrl: "https://neural-viz-demo.vercel.app",
    githubUrl: "https://github.com/andre/neural-network-visualizer",
    featured: false,
    status: "completed"
  },
  {
    id: "project-6",
    title: "CryptoTracker Pro",
    thumbnail: "/images/crypto-tracker-thumb.webp",
    date: "2024-02-14",
    technologies: ["React Native", "Redux", "WebSocket", "CoinGecko API"],
    industry: "Cryptocurrency",
    description: "Professional cryptocurrency tracking mobile app with real-time price monitoring, portfolio management, and advanced analytics.",
    detailedDescription: "CryptoTracker Pro delivers comprehensive cryptocurrency portfolio management with real-time price tracking, advanced analytics, and professional-grade charting tools. The app features push notifications for price alerts, portfolio performance tracking, news integration, and support for over 5000 cryptocurrencies. Built with React Native for seamless cross-platform performance.",
    screenshots: [
      "/images/crypto-tracker-portfolio.webp",
      "/images/crypto-tracker-charts.webp",
      "/images/crypto-tracker-alerts.webp",
      "/images/crypto-tracker-news.webp"
    ],
    websiteUrl: "https://crypto-tracker-demo.vercel.app",
    githubUrl: "https://github.com/andre/crypto-tracker-pro",
    featured: false,
    status: "completed"
  },
  {
    id: "project-7",
    title: "MedFlow Healthcare Platform",
    thumbnail: "/images/medflow-thumb.webp",
    date: "2024-01-10",
    technologies: ["Angular", "Spring Boot", "PostgreSQL", "Docker"],
    industry: "Healthcare",
    description: "Comprehensive healthcare management platform connecting patients, doctors, and medical facilities with secure data handling and telemedicine capabilities.",
    detailedDescription: "MedFlow revolutionizes healthcare management by providing a unified platform for patient records, appointment scheduling, telemedicine consultations, and medical data analytics. The platform ensures HIPAA compliance with end-to-end encryption and features real-time communication tools, prescription management, and integrated billing systems. Built with enterprise-grade security and scalability in mind.",
    screenshots: [
      "/images/medflow-dashboard.webp",
      "/images/medflow-appointments.webp",
      "/images/medflow-telemedicine.webp",
      "/images/medflow-records.webp"
    ],
    websiteUrl: "https://medflow-demo.vercel.app",
    githubUrl: "https://github.com/andre/medflow-platform",
    featured: true,
    status: "completed"
  },
  {
    id: "project-8",
    title: "Nexus Social Network",
    thumbnail: "/images/nexus-social-thumb.webp",
    date: "2023-12-05",
    technologies: ["Svelte", "FastAPI", "Redis", "AWS S3"],
    industry: "Social Media",
    description: "Next-generation social networking platform with AI-powered content curation, real-time messaging, and immersive media sharing capabilities.",
    detailedDescription: "Nexus redefines social networking with AI-driven content discovery, advanced privacy controls, and seamless multimedia sharing. The platform features real-time messaging, group collaboration tools, and an innovative feed algorithm that prioritizes meaningful connections. Built with modern web technologies for lightning-fast performance and includes advanced moderation tools and content analytics.",
    screenshots: [
      "/images/nexus-feed.webp",
      "/images/nexus-messaging.webp",
      "/images/nexus-profile.webp",
      "/images/nexus-groups.webp"
    ],
    websiteUrl: "https://nexus-social-demo.vercel.app",
    githubUrl: "https://github.com/andre/nexus-social-network",
    featured: false,
    status: "completed"
  },
  {
    id: "project-9",
    title: "EduVerse Learning Platform",
    thumbnail: "/images/eduverse-thumb.webp",
    date: "2023-10-20",
    technologies: ["Nuxt.js", "Supabase", "Stripe", "WebRTC"],
    industry: "Education",
    description: "Immersive online learning platform with interactive courses, live virtual classrooms, and gamified progression tracking for enhanced student engagement.",
    detailedDescription: "EduVerse transforms online education through interactive multimedia courses, live virtual classrooms, and gamified learning experiences. The platform features adaptive learning algorithms, real-time collaboration tools, progress tracking with achievements, and integrated assessment systems. Designed for scalability to support thousands of concurrent users with high-quality video streaming and interactive content delivery.",
    screenshots: [
      "/images/eduverse-courses.webp",
      "/images/eduverse-classroom.webp",
      "/images/eduverse-progress.webp",
      "/images/eduverse-assignments.webp"
    ],
    websiteUrl: "https://eduverse-demo.vercel.app",
    githubUrl: "https://github.com/andre/eduverse-platform",
    featured: false,
    status: "completed"
  }
];

export default projects;
