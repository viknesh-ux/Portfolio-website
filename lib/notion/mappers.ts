import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Achievement, BlogPreview, Certification, PersonalInfo, Project, Skill } from "@/lib/types";
import {
  getCheckbox,
  getDateIso,
  getEmail,
  getFileUrl,
  getMultiSelectNames,
  getPhone,
  getRichText,
  getSelect,
  getTitle,
  getUrl,
} from "./properties";

function parseEducation(raw: string): PersonalInfo["education"] {
  const t = raw.trim();
  if (!t) return undefined;
  try {
    if (t.startsWith("[")) {
      const parsed = JSON.parse(t) as PersonalInfo["education"];
      return Array.isArray(parsed) ? parsed : undefined;
    }
  } catch {
    /* ignore */
  }
  return t.split("\n").filter(Boolean).map((line) => {
    const parts = line.split("|").map((s) => s.trim());
    return {
      program: parts[0],
      institution: parts[1],
      startYear: parts[2] ? Number(parts[2]) : undefined,
      endYear: parts[3] ? Number(parts[3]) : undefined,
      details: parts[4],
    };
  });
}

/**
 * Expected Personal database columns (first row is used):
 * Name (title), Role, Intro, Bio, Career Goals, Education (rich_text),
 * Interests (multi_select), Domains (multi_select),
 * Resume URL (url), Email, Phone, GitHub, LinkedIn, Medium,
 * Profile Image URL (url)
 */
export function mapPersonalPage(page: PageObjectResponse): PersonalInfo {
  const { properties } = page;
  const profileImageUrl =
    getUrl(properties, "Profile Image URL") ?? getFileUrl(properties, "Profile Image");

  return {
    fullName: getTitle(properties, "Name") || getTitle(properties, "Full Name"),
    role: getRichText(properties, "Role"),
    intro: getRichText(properties, "Intro"),
    bio: getRichText(properties, "Bio"),
    interests: getMultiSelectNames(properties, "Interests"),
    careerGoals: getRichText(properties, "Career Goals"),
    domains: getMultiSelectNames(properties, "Domains"),
    education: parseEducation(getRichText(properties, "Education")),
    resumeUrl: getUrl(properties, "Resume URL"),
    email: getEmail(properties, "Email") ?? getRichText(properties, "Email"),
    phone: getPhone(properties, "Phone") ?? getRichText(properties, "Phone"),
    github: getUrl(properties, "GitHub"),
    linkedin: getUrl(properties, "LinkedIn"),
    medium: getUrl(properties, "Medium"),
    profileImage: profileImageUrl,
  };
}

/** Name (title), Category (select), Level (select) */
export function mapSkillPage(page: PageObjectResponse): Skill {
  const { properties, id } = page;
  return {
    _id: id,
    name: getTitle(properties, "Name") || getTitle(properties, "Skill"),
    category: getSelect(properties, "Category") || "General",
    level: getSelect(properties, "Level"),
  };
}

/** Title, Description, Thumbnail URL / Thumbnail (files), GitHub, Demo, Tech Stack, Tags, Difficulty, Category, Featured */
export function mapProjectPage(page: PageObjectResponse): Project {
  const { properties, id } = page;
  const thumb =
    getUrl(properties, "Thumbnail URL") ??
    getFileUrl(properties, "Thumbnail") ??
    getFileUrl(properties, "Image");

  return {
    _id: id,
    title: getTitle(properties, "Title") || getTitle(properties, "Name"),
    description: getRichText(properties, "Description"),
    thumbnail: thumb,
    githubUrl: getUrl(properties, "GitHub") ?? getUrl(properties, "GitHub URL"),
    demoUrl: getUrl(properties, "Demo") ?? getUrl(properties, "Live Demo URL"),
    techStack: getMultiSelectNames(properties, "Tech Stack"),
    tags: getMultiSelectNames(properties, "Tags"),
    difficulty: getSelect(properties, "Difficulty"),
    category: getSelect(properties, "Category"),
    featured: getCheckbox(properties, "Featured"),
  };
}

/** Title, Summary, Cover Image URL / Cover (files), Medium URL, Tags, Category, Reading Time, Published, Featured */
export function mapBlogPage(page: PageObjectResponse): BlogPreview {
  const { properties, id } = page;
  const cover =
    getUrl(properties, "Cover Image URL") ??
    getFileUrl(properties, "Cover Image") ??
    getFileUrl(properties, "Cover");

  return {
    _id: id,
    title: getTitle(properties, "Title") || getTitle(properties, "Name"),
    summary: getRichText(properties, "Summary"),
    coverImage: cover,
    mediumUrl: getUrl(properties, "Medium URL") ?? getUrl(properties, "URL") ?? "#",
    tags: getMultiSelectNames(properties, "Tags"),
    category: getSelect(properties, "Category"),
    readingTime: getRichText(properties, "Reading Time"),
    publishedAt: getDateIso(properties, "Published") ?? getDateIso(properties, "Date"),
    featured: getCheckbox(properties, "Featured"),
  };
}

/** Name (title), Issuer, Badge URL / Badge (files), Credential URL, Date */
export function mapCertificationPage(page: PageObjectResponse): Certification {
  const { properties, id } = page;
  const badge =
    getUrl(properties, "Badge URL") ?? getFileUrl(properties, "Badge Image") ?? getFileUrl(properties, "Badge");

  return {
    _id: id,
    name: getTitle(properties, "Name") || getTitle(properties, "Title"),
    issuer: getRichText(properties, "Issuer"),
    badgeImage: badge,
    credentialUrl: getUrl(properties, "Credential URL"),
    date: getDateIso(properties, "Date"),
  };
}

/** Title, Description, Type, Date, Link */
export function mapAchievementPage(page: PageObjectResponse): Achievement {
  const { properties, id } = page;
  return {
    _id: id,
    title: getTitle(properties, "Title") || getTitle(properties, "Name"),
    description: getRichText(properties, "Description"),
    type: getSelect(properties, "Type"),
    date: getDateIso(properties, "Date"),
    link: getUrl(properties, "Link") ?? getUrl(properties, "URL"),
  };
}
