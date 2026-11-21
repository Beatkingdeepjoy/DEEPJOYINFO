export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  readingTime: string;
  publishedAt: string;
  tags: string[];
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "btech-hostel-life-tripura",
    title: "Hostel Life & 2 AM Code in Agartala: The Tripura Engineering Story",
    excerpt: "The authentic reality of studying B.Tech in Northeast India, balancing lab assignments with YouTube filmmaking, and debugging code at 2 AM.",
    readingTime: "5 min read",
    publishedAt: "February 24, 2026",
    tags: ["BTechLife", "Tripura", "HostelLife", "Engineering"],
    content: `
### The 2:00 AM Rhythm in Agartala

When the university hostel quiets down after midnight, the real building begins. For many engineering students across India, late nights mean cramming for end-semester exams. But for me, it is the golden window where the internet bandwidth is pristine, the campus breeze cools the room, and I can switch between writing full-stack components and editing YouTube B-roll.

### Why I Started Filming the Journey

When I began my B.Tech in Computer Science at ICFAI University Tripura, I noticed a huge gap on YouTube. Almost all popular student engineering vlogs came from tier-1 metro cities like Delhi, Bangalore, or Mumbai. Very few creators were documenting the raw, inspiring day-to-day life of an engineering student in Northeast India.

I wanted to show:
- How we build world-class web applications from hostel desks.
- The joy of simple canteen chai breaks after completing hard algorithms.
- How you don't need a multimillion-dollar setup to build impactful software.

### The Balancing Equation: Code vs Lens

People often ask: *"Deepjoy, how do you manage 43 GitHub repos, a full-time degree, an e-commerce platform, and YouTube?"*

The secret is simple: **Documentation over invention**.
When I'm solving a complex PHP session bug or refactoring Next.js state, I don't stop my life to make a scripted video. I document what I'm genuinely learning and building. My channel tagline says it all: *"Coding is my hobby, vlogging is my passion."*
`
  },
  {
    slug: "building-shudh-desi-ecommerce",
    title: "Architecting SHUDH DESI: Building an E-Commerce Platform for Northeast Flavors",
    excerpt: "Why I founded an e-commerce platform for Northeast Indian snacks, reaching 80% completion, and overcoming regional logistics and payment gateway integrations.",
    readingTime: "7 min read",
    publishedAt: "March 8, 2026",
    tags: ["NextJS", "ECommerce", "MongoDB", "Startup"],
    content: `
### The Untapped Heritage of Northeast Indian Delicacies

Northeast India is blessed with vibrant culinary traditions, artisanal spice blends, and handcrafted traditional snacks that are virtually impossible to find fresh in mainland retail stores. Local artisans in Tripura and surrounding states make authentic treats with generations of heritage, but lack direct-to-consumer digital infrastructure.

That became the driving spark behind **SHUDH DESI** (shudhdesi.store).

### Technical Architecture & Milestones

As Founder and Lead Developer, I set out to architect an e-commerce engine that could handle perishable inventory, calculate complex regional postal logistics, and offer zero-friction mobile checkout.

1. **Modern Frontend with Next.js & Tailwind CSS**:
   Fast server-rendered pages and instant client navigation, ensuring lightning load times even on spotty 4G connections.

2. **MongoDB Atlas Schemas**:
   Flexible document structures for product variations, regional pin code delivery rules, and order histories.

3. **Current Progress: 80% Ring**:
   We are now finishing secure payment gateway callbacks, automated invoice generation, and real-time inventory locking before our official commercial release!
`
  },
  {
    slug: "google-gemini-student-ambassador-guide",
    title: "Prompting with Purpose: My Journey as a Google Gemini Student Ambassador",
    excerpt: "Behind the scenes of organizing the 'Career Glow-up Night' workshop on campus, onboarding 30+ students into generative AI, and teaching multi-agent concepts.",
    readingTime: "6 min read",
    publishedAt: "March 19, 2026",
    tags: ["GeminiAI", "GoogleAmbassador", "GenAI", "Mentorship"],
    content: `
### Stepping Up as Campus AI Ambassador

In March 2026, I was selected as the **Google Student Ambassador (Gemini AI)** for Ping Digital Broadcast's on-campus initiative in Agartala. My mission: demystify generative AI for student builders and show that AI is not a replacement for engineers, but a monumental amplifier for your curiosity.

### The "Career Glow-up Night" Breakthrough

To kick off the initiative, I designed and hosted the **"Career Glow-up Night"** product-pitch workshop at our university campus. 

Key pillars we explored:
- **Multimodal Prompting with Gemini**: Using image inputs, video frames, and structured code analysis in a single prompt.
- **Context Grounding & Guardrails**: How to prevent hallucinations by grounding responses strictly in verified documentation.
- **Agentic Workflows**: Breaking massive engineering tasks into specialized coordinated agents.

Over 30+ active student participants successfully built their first generative AI prototypes during the workshop, and this is just the beginning!
`
  }
];
