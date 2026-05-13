import type { Achievement, BlogPreview, Certification, PersonalInfo, Project, Skill } from "@/lib/types";

export const fallbackPersonalInfo: PersonalInfo = {
  fullName: "Your Name",
  role: "Cybersecurity Student",
  intro:
    "I build secure systems, perform offensive security research, and publish practical writeups for real-world defense.",
  bio: "Focused on blue-team and offensive testing foundations. I enjoy solving CTFs, building security tooling, and documenting hands-on learnings.",
  interests: ["CTFs", "Threat Hunting", "Secure SDLC", "Reverse Engineering"],
  careerGoals: "Grow into a security engineer role focused on application and cloud security.",
  domains: ["Web Security", "Network Security", "Cloud Security", "Forensics", "OSINT"],
  education: [
    {
      institution: "University Name",
      program: "B.Tech Cyber Security",
      startYear: 2023,
      endYear: 2027,
      details: "Relevant coursework: Network Security, DFIR, Secure Coding.",
    },
  ],
  email: "you@example.com",
  phone: "+91 90000 00000",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  medium: "https://medium.com",
  resumeUrl: "#",
};

export const fallbackSkills: Skill[] = [
  "Web Security",
  "Network Security",
  "Reverse Engineering",
  "Forensics",
  "OSINT",
  "Linux",
  "Programming",
  "Cloud Security",
].map((category, idx) => ({
  _id: `${category}-${idx}`,
  name: category === "Programming" ? "Python" : "Burp Suite",
  category,
  level: "Intermediate",
}));

export const fallbackProjects: Project[] = [
  {
    _id: "p1",
    title: "Web App Pentest Toolkit",
    description:
      "Automated reconnaissance and vulnerability triage workflow for student pentesting labs.",
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    techStack: ["Next.js", "Python", "Docker"],
    tags: ["OWASP", "Automation"],
    difficulty: "Intermediate",
    category: "Web Security",
    featured: true,
  },
];

export const fallbackBlogs: BlogPreview[] = [
  {
    _id: "b1",
    title: "IDOR Hunting Workflow in Student Labs",
    summary:
      "A structured process to discover and validate IDOR vulnerabilities using low-noise testing.",
    mediumUrl: "https://medium.com",
    tags: ["IDOR", "OWASP"],
    category: "Web Security",
    readingTime: "7 min read",
    publishedAt: new Date().toISOString(),
    featured: true,
  },
];

export const fallbackCertifications: Certification[] = [
  {
    _id: "c1",
    name: "Google Cybersecurity",
    issuer: "Google",
    credentialUrl: "https://example.com",
    date: "2025-10-10",
  },
];

export const fallbackAchievements: Achievement[] = [];
