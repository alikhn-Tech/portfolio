// Central site configuration & content data for the Ali Khan portfolio.
// IMPORTANT: no invented details. Anything awaiting verified information is
// clearly marked as null / "PENDING" and the UI renders it as a
// clearly-labelled "details pending" placeholder.

export const siteConfig = {
  name: "Ali Khan",
  title: "Ali Khan — AI Automation & Digital Solutions Specialist",
  description:
    "Ali Khan builds intelligent digital solutions combining AI agents, workflow automation, web development and performance marketing.",
  // ---- Contact details: PENDING — supply verified values before launch ----
  email: "", // TODO: provide verified email address
  whatsapp: "", // TODO: international format, e.g. +923001234567
  cvUrl: "", // TODO: provide CV/resume file under public/ once ready
  // ---- Social profile URLs: PENDING — leave empty until provided ----
  socials: {
    linkedin: "",
    github: "",
    twitter: "",
    facebook: "",
    instagram: "",
    youtube: "",
  },
};

// Canonical URL helper — returns an absolute URL only when
// NEXT_PUBLIC_SITE_URL is configured; otherwise root-relative.
export function absoluteUrl(path = "/") {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return path;
  return `${base.replace(/\/+$/, "")}${path === "/" ? "" : path}`;
}

export const navItems = [
  { label: "Home", href: "/", scrollHref: "home" },
  { label: "About", href: "/about", scrollHref: "profile" },
  { label: "Process", href: "/about#work-process", scrollHref: "process" },
  { label: "Expertise", href: "/expertise", scrollHref: "service" },
  { label: "Projects", href: "/projects", scrollHref: "portfolio" },
  { label: "Blog", href: "/blog", scrollHref: "blogs" },
];

// Legacy hash routes -> real pages (fixes old Vite one-page links).
export const legacyHashRoutes = {
  home: "/",
  intro: "/",
  profile: "/about",
  process: "/about#work-process",
  service: "/expertise",
  portfolio: "/projects",
  testimonials: "/about#testimonials",
  clients: "/about#clients",
  blogs: "/blog",
  contact: "/contact",
};

export const heroData = {
  designerTitle: "AI Automation &",
  developerTitle: "Digital Solutions Specialist",
  description:
    "I build intelligent digital solutions that combine AI automation, AI agents, workflow automation, web development and performance marketing to help businesses grow.",
  ctaPrimary: "Hire Me",
  ctaSecondary: "View Projects",
};

export const aboutData = {
  name: "Ali Khan",
  profession: "AI Automation & Digital Solutions Specialist",
  experienceLine: "Professional since 2025",
  description:
    "I am Ali Khan, an AI Automation & Digital Solutions Specialist. I started my professional journey in 2025 as a Junior Front-End Web Developer at Webistic Marketing Solutions, where I worked on four client websites. Alongside front-end development, I manage Google Ads campaigns, build AI voice calling agents and create workflow automations that save businesses time and money.",
  facts: [
    { label: "Name", value: "Ali Khan" },
    { label: "Role", value: "AI Automation & Digital Solutions Specialist" },
    { label: "Based in", value: "PENDING — please provide your city/country" },
    { label: "Freelance", value: "Available" },
  ],
};

// Work process — adapted from the original Picto "Work Process" section.
export const workProcess = [
  {
    step: "01",
    icon: "fa-lightbulb",
    title: "Discover",
    text: "Understand your business goals, audience and the manual work slowing you down.",
  },
  {
    step: "02",
    icon: "fa-pencil-ruler",
    title: "Design",
    text: "Plan the solution — website structure, automation flow or agent conversation design.",
  },
  {
    step: "03",
    icon: "fa-code",
    title: "Build",
    text: "Develop with React, Next.js, n8n, OpenAI, Retell AI and other modern tools.",
  },
  {
    step: "04",
    icon: "fa-rocket",
    title: "Launch & Grow",
    text: "Deploy, measure with GA4, optimise with Google Ads and iterate for results.",
  },
];

// Expertise / services — mapped onto the original Picto service cards.
export const expertiseAreas = [
  {
    id: "ai-automation",
    icon: "fa-robot",
    title: "AI Automation & AI Agents",
    text: "Intelligent agents and automated systems that handle real business tasks around the clock.",
  },
  {
    id: "workflow-automation",
    icon: "fa-diagram-project",
    title: "Workflow Automation",
    text: "End-to-end workflows built in n8n and Make.com that connect your tools and remove repetitive work.",
  },
  {
    id: "integrations",
    icon: "fa-plug",
    title: "n8n & API Integrations",
    text: "Reliable integrations between CRMs, spreadsheets, messaging platforms and custom APIs.",
  },
  {
    id: "whatsapp-agents",
    icon: "fa-comment-dots",
    title: "WhatsApp AI Agents & Chatbots",
    text: "Conversational WhatsApp assistants that answer, qualify and engage customers instantly.",
  },
  {
    id: "voice-agents",
    icon: "fa-phone-volume",
    title: "Voice AI & Calling Agents",
    text: "AI calling agents powered by Retell AI and ElevenLabs for bookings, follow-ups and support.",
  },
  {
    id: "web-development",
    icon: "fa-laptop-code",
    title: "Web & Front-End Development",
    text: "Fast, responsive websites built with React, Next.js, Tailwind CSS and modern standards.",
  },
  {
    id: "performance-marketing",
    icon: "fa-chart-line",
    title: "Google Ads & Performance Marketing",
    text: "Search campaigns managed and measured with GA4 to turn ad spend into qualified leads.",
  },
  {
    id: "digital-growth",
    icon: "fa-seedling",
    title: "Digital Growth Solutions",
    text: "Combining automation, web and marketing into one growth system for your business.",
  },
];

export const techStack = [
  "React",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Next.js",
  "Tailwind CSS",
  "n8n",
  "OpenAI API",
  "Claude",
  "Retell AI",
  "ElevenLabs",
  "Twilio",
  "Make.com",
  "Google Ads",
  "GA4",
];

// Experience timeline (used on /about). Strictly factual.
export const experienceTimeline = [
  {
    period: "2025 — Present",
    role: "Junior Front-End Web Developer",
    org: "Webistic Marketing Solutions",
    points: [
      "Worked on four websites for Webistic clients.",
      "Managed Google Ads for a driving school client in Birmingham, UK.",
      "Built several AI calling agents.",
    ],
  },
  {
    period: "2025 — Present",
    role: "AI Automation & Digital Solutions Specialist (Freelance)",
    org: "Independent",
    points: [
      "Building AI voice agents, WhatsApp chatbots and n8n workflow automations.",
      "Combining web development with performance marketing for digital growth.",
    ],
  },
];

// ------------------------------------------------------------------
// PROJECTS — real engagement types, but client names / URLs / screenshots /
// metrics are NOT yet supplied. Every unverified field is null and the UI
// renders it as a clearly-labelled "details pending" placeholder.
// ------------------------------------------------------------------
export const projects = [
  {
    slug: "webistic-client-websites",
    title: "Client Websites — Webistic Marketing Solutions",
    category: "Web Development",
    status: "delivered",
    summary:
      "Four client websites developed while working as a Junior Front-End Web Developer at Webistic Marketing Solutions.",
    client: null,
    url: null,
    image: null,
    tags: ["React", "JavaScript", "HTML5", "CSS3"],
    details: [
      "Scope: front-end development of four separate client websites.",
      "Client names, live URLs and screenshots are pending verification.",
    ],
  },
  {
    slug: "google-ads-driving-school",
    title: "Google Ads — Driving School (Birmingham, UK)",
    category: "Performance Marketing",
    status: "delivered",
    summary:
      "Managed Google Ads campaigns for a driving school client in Birmingham, UK, while at Webistic Marketing Solutions.",
    client: null,
    url: null,
    image: null,
    tags: ["Google Ads", "GA4", "Performance Marketing"],
    details: [
      "Scope: campaign management and performance tracking.",
      "Campaign metrics and results are pending — none are published here.",
    ],
  },
  {
    slug: "ai-voice-calling-agents",
    title: "AI Voice Calling Agents",
    category: "AI Automation",
    status: "delivered",
    summary:
      "Built several AI calling agents using voice-AI platforms for automated phone interactions.",
    client: null,
    url: null,
    image: null,
    tags: ["Retell AI", "ElevenLabs", "Twilio", "OpenAI API"],
    details: [
      "Scope: design and build of multiple AI voice calling agents.",
      "Deployment details and demos are pending verification.",
    ],
  },
  {
    slug: "whatsapp-ai-agents",
    title: "WhatsApp AI Agents & Chatbots",
    category: "AI Automation",
    status: "delivered",
    summary:
      "Conversational WhatsApp agents and chatbots that answer and qualify customers automatically.",
    client: null,
    url: null,
    image: null,
    tags: ["WhatsApp API", "OpenAI API", "n8n"],
    details: [
      "Scope: AI chatbot / agent experiences on WhatsApp.",
      "Client references and screenshots are pending.",
    ],
  },
  {
    slug: "n8n-workflow-automation",
    title: "n8n Workflow Automations",
    category: "Workflow Automation",
    status: "delivered",
    summary:
      "Business workflow automations built with n8n and Make.com, connecting APIs, CRMs and messaging tools.",
    client: null,
    url: null,
    image: null,
    tags: ["n8n", "Make.com", "API Integrations"],
    details: [
      "Scope: multi-step automation pipelines.",
      "Specific workflow case studies are pending.",
    ],
  },
  {
    slug: "ai-automation-experiments",
    title: "Other AI Automation Projects",
    category: "AI Automation",
    status: "in-progress",
    summary:
      "Ongoing experiments and builds combining AI agents, automation and web technology.",
    client: null,
    url: null,
    image: null,
    tags: ["AI Agents", "Automation", "Prototyping"],
    details: [
      "Scope: continuous R&D across AI tooling.",
      "Project specifics are pending.",
    ],
  },
];

// Testimonials — NEVER invent. Empty until authentic ones are supplied.
export const testimonials = [];

// Happy-clients marquee — only logos/names actually supplied may appear.
export const happyClientsLogos = [];

// Blog — no posts invented. When ready, add post objects here.
export const blogPosts = [];
