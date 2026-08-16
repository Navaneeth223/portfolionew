export const profile = {
  name: "Navaneeth KV",
  role: "Full Stack Developer",
  roleLong: "Junior Full Stack / MERN Stack Developer",
  location: "Kerala, India",
  currentCity: "Currently in Muscat, Oman",
  remote: "Open to remote, worldwide",
  email: "navaneethkv1002@gmail.com",
  github: "https://github.com/Navaneeth223",
  linkedin: "https://www.linkedin.com/in/navaneeth-kv-270386214",
  phones: [
    { label: "India", value: "+91 8078164791" },
    { label: "Oman", value: "90416112" },
  ],
  summary:
    "I build and ship full-stack products — React and Next.js on the front end, Node, Django and PostgreSQL underneath. Four years in, currently building a real-time recruitment platform at Druv360, and running an independent freelance practice alongside it. AI-assisted daily: Claude Code, Cursor and Gemini CLI are part of how I write and ship software, not a side experiment.",
};

export const stats = [
  { value: 4, suffix: "+", label: "Years building" },
  { value: 25, suffix: "+", label: "Projects shipped" },
  { value: 200, suffix: "+", label: "Repositories" },
  { label: "Open — remote, worldwide", status: true },
];

export const skillGroups = [
  { title: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Python", "Dart", "SQL", "HTML5", "CSS3"] },
  { title: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js / WebGL", "Flutter", "Figma", "Responsive Design"] },
  { title: "Backend", items: ["Node.js", "Express.js", "Django", "REST APIs", "JWT Auth", "WebSockets", "JSON"] },
  { title: "Databases", items: ["MongoDB", "PostgreSQL", "Redis", "Firebase"] },
  { title: "Cloud & DevOps", items: ["AWS", "Docker", "Linux", "Git / GitHub", "CI/CD", "NGINX", "SSL/TLS", "SSH", "DigitalOcean", "Vercel"] },
  { title: "AI & Modern Tooling", items: ["Claude Code", "Cursor", "Gemini CLI", "GitHub Copilot", "Prompt Engineering", "LLM App Development", "AI-Assisted Workflows", "Automation"] },
];

export const experience = [
  {
    company: "Druv360",
    role: "Junior MERN Stack Developer",
    date: "Jan 2026 — Present",
    bullets: [
      "Build production features for a real-time recruitment platform using React, Django REST Framework, PostgreSQL, Redis and WebSockets.",
      "Implement secure JWT authentication, resume parsing, Cloudinary integration and scalable REST APIs.",
      "Design PostgreSQL database schemas; collaborate via Git and Agile/Scrum workflows.",
    ],
  },
  {
    company: "Self-Employed",
    role: "Freelance Full Stack Developer",
    date: "2022 — Present",
    bullets: [
      "Delivered 25+ full-stack applications (React, Next.js, Node.js, Express, MongoDB, PostgreSQL) for clients worldwide.",
      "Deployed via Docker, NGINX, DigitalOcean, Vercel and Linux (SSH, SSL).",
      "Built AI-powered tools, an open-source PDF toolkit, and a GST-compliant transport management system.",
      "Owned projects end-to-end — requirements through deployment and support — across logistics, e-commerce and productivity.",
    ],
  },
];

export const education = {
  degree: "Bachelor's in Computer Science",
  school: "Kannur University",
  date: "2019 — 2021",
  coursework: "Data Structures, Algorithms, Mathematics for Computer Science",
};

export const certifications = [
  { name: "The Complete Web Development Bootcamp", issuer: "Angela Yu · Udemy" },
  { name: "Full Stack Development with Job Placement", issuer: "Internshala" },
  { name: "Flutter & Dart — The Complete Guide", issuer: "Udemy · 2024" },
  { name: "Complete C# Unity Game Developer 3D", issuer: "GameDev.tv · Udemy" },
];

export interface Project {
  title: string;
  description: string;
  tags: string[];
  url?: string;
  note?: string;
}

export const projects: Project[] = [
  {
    title: "MindVault",
    description: "AI knowledge vault: Django REST backend behind React PWA, React Native and Electron clients — one codebase across four platforms. Multi-LLM integration with Whisper speech-to-text in English and Malayalam.",
    tags: ["Django REST", "React PWA", "React Native", "Electron", "Whisper", "Multi-LLM"],
    url: "https://mindvault-pearl.vercel.app/login",
  },
  {
    title: "PDFforge",
    description: "Self-hostable, open-source PDF toolkit with 50+ tools — merge, split, compress, convert, e-sign. TypeScript, real community stars and forks.",
    tags: ["TypeScript", "Open Source", "Self-hostable"],
    url: "https://pd-fforge.vercel.app/",
  },
  {
    title: "Transport Management System",
    description: "React, Node and MongoDB on a DigitalOcean VPS. GST-compliant invoicing, role-based access, live operations dashboards for a logistics client.",
    tags: ["React", "Node.js", "MongoDB", "DigitalOcean"],
    note: "Live demo on request — suspended over a client billing issue, not the build.",
  },
  {
    title: "Job Portal — Candidate Side",
    description: "A full recruitment platform's candidate-facing flows: browsing, applications, profile management. React against a backend API.",
    tags: ["React", "REST API"],
    url: "https://jobportal-candidate.vercel.app/",
  },
  {
    title: "OmniCut",
    description: "A web toolkit for document and media processing — practical, everyday utilities in a clean interface.",
    tags: ["Document Processing", "Media"],
    url: "https://omnicut-web.vercel.app/",
  },
];

export const moreWork: Record<string, [string, string][]> = {
  "Business & Commercial": [
    ["Interior Design Studio", "https://interior-design-studio-wine.vercel.app/"],
    ["APEX Athletics Gym, Muscat", "https://apex-athletics-muscat.vercel.app/"],
    ["Auto Garage", "https://auto-garage-neon.vercel.app/"],
    ["Barbershop", "https://barbershop-sable-nu.vercel.app/"],
    ["Restaurant / Cafe", "https://restaurant-caf-jf69.vercel.app/"],
    ["Creative Agency", "https://creative-agency-style.vercel.app/"],
    ["Premium Chocolate", "https://premium-chocolate.vercel.app/"],
    ["Premium Bakery", "https://premium-bakery.vercel.app/"],
    ["Mountain Resort", "https://mountain-resort.vercel.app/"],
    ["Serene Homeo Clinic", "https://serene-homeo-clinic.vercel.app/"],
    ["Druv360 Portfolio", "https://portfolio-website-druv1-izymm9spv-navaneeth-k-vs-projects.vercel.app/"],
  ],
  "Personal & Event": [
    ["Portfolio (previous)", "https://new-portfolio-alpha-eight-79.vercel.app/"],
    ["Valentine Theme", "https://valentine-blue-beta.vercel.app/"],
    ["Anniversary Site", "https://anniversary-sp.vercel.app/"],
    ["Project Name Generator", "https://project-name-generator-mmwdafez.vercel.app/"],
  ],
  "Games, 3D & Interactive": [
    ["3D Room", "https://3d-room-zeta.vercel.app/"],
    ["Game Portfolio", "https://game-portfolio-pi-six.vercel.app/"],
    ["Game Test Mountain", "https://game-test-mountain.vercel.app/"],
    ["Animated 2D", "https://animted2-d.vercel.app/"],
    ["2D Game — Single Site", "https://2-d-game-single-site.vercel.app/"],
  ],
};
