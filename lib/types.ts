export type PersonalInfo = {
  fullName: string;
  role: string;
  intro: string;
  /** Public HTTPS URL to profile photo (see README for Notion setup). */
  profileImage?: string;
  bio?: string;
  interests?: string[];
  careerGoals?: string;
  domains?: string[];
  education?: Array<{
    institution?: string;
    program?: string;
    startYear?: number;
    endYear?: number;
    details?: string;
  }>;
  resumeUrl?: string;
  email?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  medium?: string;
};

export type Skill = { _id: string; name: string; category: string; level?: string };
export type Project = {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  githubUrl?: string;
  demoUrl?: string;
  techStack?: string[];
  tags?: string[];
  difficulty?: string;
  category?: string;
  featured?: boolean;
};

export type BlogPreview = {
  _id: string;
  title: string;
  summary: string;
  coverImage?: string;
  mediumUrl: string;
  tags?: string[];
  category?: string;
  readingTime?: string;
  publishedAt?: string;
  featured?: boolean;
};

export type Certification = {
  _id: string;
  name: string;
  issuer: string;
  badgeImage?: string;
  credentialUrl?: string;
  date?: string;
};

export type Achievement = {
  _id: string;
  title: string;
  description: string;
  type?: string;
  date?: string;
  link?: string;
};
