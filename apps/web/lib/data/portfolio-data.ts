import { Project, YouTubeStats, GitHubStats, LeetCodeStats } from "@deepjoy/shared-types";

export const PERSONAL_INFO = {
  name: "Deepjoy Bhowmik",
  location: "Agartala, Tripura, India",
  roles: [
    "Full-Stack Developer",
    "Tech & Campus YouTuber",
    "Google Student Ambassador (Gemini AI)",
    "Creative Problem Solver"
  ],
  brandLine: "Coding is my hobby, vlogging is my passion.",
  heroTagline: "I build the web by night and film the journey by day.",
  bio: "B.Tech Computer Science student at ICFAI University Tripura. I bridge the gap between engineering robust web architectures and sharing authentic student developer life in Northeast India with thousands of aspiring builders.",
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "ICFAI University Tripura",
    period: "2023 - Present",
    location: "Agartala, Tripura",
  },
  contacts: {
    developerEmail: "deepjoydeveloper@gmail.com",
    collabEmail: "deepjoyallcollab@gmail.com",
    linkedin: "https://www.linkedin.com/in/deepjoy-bhowmik-692451320/",
    github: "https://github.com/Beatkingdeepjoy",
    youtube: "https://www.youtube.com/@deepjoybhowmikofficial",
    youtubeChannelId: "UCztCtzW52UO_iOONZZzQnQw",
    leetcode: "https://leetcode.com/u/beatking_deepjoy/",
    oldPortfolio: "https://myportfolio-six-wheat.vercel.app/",
  },
  counters: {
    studentsOnboarded: "30+",
    publicRepos: 43,
    projectsBuilt: 4,
    yearsCoding: "3+",
  },
};

export const EXPERIENCES = [
  {
    role: "Google Student Ambassador (Gemini AI)",
    company: "Ping Digital Broadcast (On-Campus Initiative)",
    location: "Agartala, Tripura",
    period: "March 2026 - Present",
    current: true,
    badge: "Leadership & Generative AI",
    bullets: [
      "Selected as a student leader to drive adoption, education, and awareness of Google Gemini AI tools on campus.",
      "Spearheaded and hosted the 'Career Glow-up Night' product-pitch workshop, onboarding 30+ active student participants.",
      "Conducted practical hands-on workshops on generative AI paradigms, multimodal prompt engineering, and multi-agent system concepts."
    ],
    tech: ["Gemini AI API", "Prompt Engineering", "Multi-Agent Workflows", "Public Speaking", "Community Leadership"]
  },
  {
    role: "Full Stack Developer Intern",
    company: "NIELIT Agartala",
    location: "Agartala, Tripura",
    period: "Dec 2024 - Mar 2025",
    current: false,
    badge: "Government Web Systems",
    bullets: [
      "Built a Tripura state government website featuring secure login, role-based registration, and document verification.",
      "Developed high-performance, mobile-responsive UI interfaces with semantic HTML, modern CSS, and JavaScript.",
      "Engineered a rock-solid PHP backend architecture handling user authentication, session security, and relational database operations."
    ],
    tech: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Secure Authentication"]
  }
];

export const PROJECTS: Project[] = [
  {
    slug: "shudh-desi",
    title: "SHUDH DESI",
    summary: "E-Commerce platform dedicated to authentic traditional Northeast Indian snacks, spices, and regional delicacies.",
    problem: "Traditional Northeast Indian snacks and authentic handcrafted spices lack direct-to-consumer digital channels, leaving artisans disconnected from nationwide food enthusiasts.",
    solution: "Architected a custom digital marketplace with optimized product cataloging, regional logistics calculators, and seamless checkout flows tailored to perishable Northeast culinary goods.",
    tech: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "Payment Gateway"],
    category: "E-Commerce",
    liveUrl: "https://shudhdesi.store/",
    images: ["/assets/images/projects/shudhdesi.png"],
    progress: 80,
    order: 1,
    featured: true,
    metrics: [
      { label: "Completion", value: "80% (Launching Soon)" },
      { label: "Role", value: "Founder & Lead Developer" },
      { label: "Target Market", value: "Northeast India & Pan-India" }
    ],
    architectureDiagram: `flowchart LR
    Buyer[Customer Browser] --> CDN[Next.js Storefront]
    CDN --> API[Checkout & Catalog API]
    API --> DB[(MongoDB Atlas)]
    API --> Gateway[Secure Payment Gateway]`
  },
  {
    slug: "aroweather",
    title: "AroWeather",
    summary: "Real-time global weather intelligence application with atmospheric visual dynamics and predictive forecasting.",
    problem: "Standard weather applications are cluttered with intrusive ads, high battery consumption, and complex data visual representations.",
    solution: "Engineered an ultra-clean, real-time meteorological portal consuming weather API feeds, dynamically adjusting themes based on target coordinate climate conditions.",
    tech: ["JavaScript", "HTML5", "CSS3", "OpenWeather API", "Geolocation API"],
    category: "Frontend",
    liveUrl: "https://aroweather.vercel.app/",
    githubUrl: "https://github.com/Beatkingdeepjoy",
    images: ["/assets/images/projects/aroweather.png"],
    progress: 100,
    order: 2,
    featured: true,
    metrics: [
      { label: "Latency", value: "<150ms API response" },
      { label: "Coverage", value: "Global Coordinate Fetch" },
      { label: "Status", value: "Live on Vercel" }
    ],
    architectureDiagram: `flowchart LR
    User[Client Browser] --> WeatherApp[AroWeather UI]
    WeatherApp --> Geo[HTML5 Geolocation]
    WeatherApp --> API[OpenWeather REST API]`
  },
  {
    slug: "code-charcha",
    title: "Code Charcha",
    summary: "Collaborative developer discussion and peer debugging forum designed for computer science students.",
    problem: "Beginner developers often find mainstream developer forums intimidating, lacking localized peer encouragement and approachable code snippet discussions.",
    solution: "Designed and developed an intuitive, modern code forum interface with syntax highlighted snippets, categorized question tags, and discussion threads.",
    tech: ["React", "JavaScript", "CSS3", "Vercel", "Tailwind CSS"],
    category: "Full Stack",
    liveUrl: "https://code-charcha.vercel.app/",
    githubUrl: "https://github.com/Beatkingdeepjoy",
    images: ["/assets/images/projects/codecharcha.png"],
    progress: 100,
    order: 3,
    featured: true,
    metrics: [
      { label: "Focus", value: "Student Developer Community" },
      { label: "UI Rating", value: "Modern Interactive UI" },
      { label: "Status", value: "Live on Vercel" }
    ],
    architectureDiagram: `flowchart LR
    Visitor[Student Developer] --> Forum[Code Charcha Web]
    Forum --> SnippetRenderer[Syntax Highlighter]
    Forum --> State[Interactive Thread Store]`
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio Evolution v1",
    summary: "The foundational HTML, CSS, and Vanilla JavaScript personal website that started the web development journey.",
    problem: "Establishing the initial web footprint and personal showcase as a first-year computer science undergraduate.",
    solution: "Crafted a clean, responsive static portfolio demonstrating raw core language proficiency in HTML5, CSS3, and DOM scripting.",
    tech: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    category: "Frontend",
    liveUrl: "https://myportfolio-six-wheat.vercel.app/",
    githubUrl: "https://github.com/Beatkingdeepjoy",
    images: ["/assets/images/projects/portfoliov1.png"],
    progress: 100,
    order: 4,
    featured: true,
    metrics: [
      { label: "Milestone", value: "First-generation Web Portfolio" },
      { label: "Stack", value: "Vanilla Web Standards" },
      { label: "Evolution", value: "Predecessor to 3D Platform" }
    ],
    architectureDiagram: `flowchart LR
    Client --> HTML5[Vanilla HTML/CSS/JS]
    HTML5 --> VercelEdge[Vercel Edge Network]`
  }
];

export const SKILL_CATEGORIES = [
  {
    name: "Languages",
    skills: ["HTML5", "CSS3", "JavaScript", "Python", "C", "C++"],
    color: "#22D3EE"
  },
  {
    name: "Backend",
    skills: ["API Integration", "PHP", "RESTful Architecture"],
    color: "#7C3AED"
  },
  {
    name: "CS Fundamentals",
    skills: ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "Operating Systems"],
    color: "#E879F9"
  },
  {
    name: "Database",
    skills: ["MongoDB"],
    color: "#10B981"
  },
  {
    name: "Tools & DevOps",
    skills: ["Git", "GitHub Actions", "VS Code", "Digital Marketing"],
    color: "#F59E0B"
  },
  {
    name: "Data & Analytics",
    skills: ["NumPy", "Pandas", "Excel"],
    color: "#3B82F6"
  },
  {
    name: "Automation",
    skills: ["Python Scripting", "API Automation"],
    color: "#EC4899"
  },
];

export const CURRENTLY_LEARNING = [
  "React / Next.js 15",
  "TypeScript",
  "Node.js",
  "AI Autonomous Agents"
];

export const CERTIFICATIONS = [
  {
    title: "Full Stack Web Development",
    issuer: "NIELIT Agartala",
    badge: "Govt. Accredited",
    description: "Intensive training in modern full stack development, relational databases, backend engineering, and web security."
  },
  {
    title: "Data Structures & Algorithms using Python",
    issuer: "Certified Training Course",
    badge: "Core CS",
    description: "Deep dive into algorithmic complexity, asymptotic analysis, trees, graphs, sorting, and dynamic programming."
  },
  {
    title: "Introduction to Web Development (HTML, CSS, JS)",
    issuer: "Foundational Certification",
    badge: "Frontend Core",
    description: "Mastery of semantic markup, CSS box models, responsive layouts, and interactive client-side JavaScript."
  },
  {
    title: "Python Programming Fundamentals",
    issuer: "Programming Academy",
    badge: "Language Mastery",
    description: "Object-oriented programming, data structures, file handling, modular scripting, and standard libraries in Python."
  }
];

export const YOUTUBE_CHANNEL_DEFAULTS: YouTubeStats = {
  channelId: "UCztCtzW52UO_iOONZZzQnQw",
  channelTitle: "Deepjoy Bhowmik",
  customUrl: "@deepjoybhowmikofficial",
  subscriberCount: "Verified Creator",
  videoCount: 28,
  viewCount: "50K+",
  isFallback: true,
  latestVideos: [
    {
      id: "demo1",
      title: "A Day in the Life of a B.Tech CSE Student in Tripura | Hostel & Coding",
      description: "Come with me through a regular college day: lectures at ICFAI University Tripura, hostel meals, and late-night coding sessions.",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
      publishedAt: "2026-02-15",
      viewCount: "4.8K"
    },
    {
      id: "demo2",
      title: "Career Glow-up Night: Leading the Google Gemini Workshop on Campus",
      description: "Behind the scenes organizing the Google Student Ambassador AI workshop and onboarding 30+ students into generative AI.",
      thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
      publishedAt: "2026-03-05",
      viewCount: "3.2K"
    },
    {
      id: "demo3",
      title: "Building SHUDH DESI E-Commerce: Behind the Scenes of Northeast Snacks",
      description: "Why I started building an e-commerce platform for Northeast India delicacies, tech challenges, and reaching 80% completion.",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      publishedAt: "2026-03-18",
      viewCount: "5.1K"
    }
  ],
  popularVideos: [
    {
      id: "pop1",
      title: "Hostel Room Tour & Late Night Coding Setup | Agartala",
      description: "My minimalist desk setup in the hostel where every project and video is born.",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
      publishedAt: "2026-01-20",
      viewCount: "12K"
    },
    {
      id: "pop2",
      title: "How I Cracked NIELIT Web Development Internship",
      description: "Everything about preparing, interviewing, and building government web portals as an intern.",
      thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
      publishedAt: "2025-12-10",
      viewCount: "9.5K"
    }
  ]
};

export const GITHUB_DEFAULTS: GitHubStats = {
  username: "Beatkingdeepjoy",
  publicRepos: 43,
  totalStars: 18,
  featuredRepos: [
    {
      name: "coa-prep",
      description: "Computer Organization and Architecture revision notes, assembly programs, and exam prep guide.",
      html_url: "https://github.com/Beatkingdeepjoy/coa-prep",
      language: "C",
      stargazers_count: 5,
      forks_count: 2,
      updated_at: "2026-02-10"
    },
    {
      name: "BEATKING-Business",
      description: "Business analytics, digital marketing pipelines, and client lead generation automation scripts.",
      html_url: "https://github.com/Beatkingdeepjoy/BEATKING-Business",
      language: "Python",
      stargazers_count: 4,
      forks_count: 1,
      updated_at: "2026-01-28"
    },
    {
      name: "portfolio.2.0",
      description: "Interactive portfolio exploration repository featuring dynamic modern UI paradigms.",
      html_url: "https://github.com/Beatkingdeepjoy/portfolio.2.0",
      language: "JavaScript",
      stargazers_count: 6,
      forks_count: 3,
      updated_at: "2026-03-01"
    },
    {
      name: "convertaltool",
      description: "Versatile conversion utility tool supporting file formats, base conversions, and encoding schemas.",
      html_url: "https://github.com/Beatkingdeepjoy/convertaltool",
      language: "Python",
      stargazers_count: 3,
      forks_count: 1,
      updated_at: "2025-11-14"
    }
  ]
};

export const LEETCODE_DEFAULTS: LeetCodeStats = {
  username: "beatking_deepjoy",
  totalSolved: 145,
  easySolved: 85,
  mediumSolved: 52,
  hardSolved: 8,
  ranking: 284520
};

export const DAY_IN_LIFE_EVENTS = [
  { time: "07:30 AM", title: "Morning Tea & Plan", desc: "Tripura morning breeze, reviewing daily GitHub issues and video edits." },
  { time: "09:00 AM", title: "ICFAI Campus Lectures", desc: "Data structures, operating systems, and attending computer lab sessions." },
  { time: "02:30 PM", title: "Gemini Ambassador Hub", desc: "Collaborating with student developers, answering GenAI questions." },
  { time: "06:00 PM", title: "Vlog Shooting & Edit", desc: "Capturing everyday moments, campus insights, and video B-rolls." },
  { time: "10:30 PM", title: "Late Night Code", desc: "Focus hours: committing to Shudh Desi, solving DSA, and debugging." }
];
