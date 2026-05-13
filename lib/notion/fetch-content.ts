import { isFullPage } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Achievement, BlogPreview, Certification, PersonalInfo, Project, Skill } from "@/lib/types";
import { notion } from "./client";
import {
  mapAchievementPage,
  mapBlogPage,
  mapCertificationPage,
  mapPersonalPage,
  mapProjectPage,
  mapSkillPage,
} from "./mappers";

async function queryDatabase(databaseId: string): Promise<PageObjectResponse[]> {
  if (!notion) return [];
  const out: PageObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
    });
    for (const row of res.results) {
      if (isFullPage(row)) out.push(row);
    }
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);
  return out;
}

/** Accept UUID with or without hyphens (Notion often copies 32-char hex). */
function normalizeDbId(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const s = raw.trim();
  const hex = s.replace(/-/g, "");
  if (hex.length === 32 && /^[a-f0-9]+$/i.test(hex)) {
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  return s;
}

export async function fetchNotionPortfolio(): Promise<{
  personalInfo: PersonalInfo | null;
  skills: Skill[];
  projects: Project[];
  blogs: BlogPreview[];
  certifications: Certification[];
  achievements: Achievement[];
}> {
  if (!notion) {
    return {
      personalInfo: null,
      skills: [],
      projects: [],
      blogs: [],
      certifications: [],
      achievements: [],
    };
  }

  try {
  const dbPersonal = normalizeDbId(process.env.NOTION_DATABASE_PERSONAL);
  const dbSkills = normalizeDbId(process.env.NOTION_DATABASE_SKILLS);
  const dbProjects = normalizeDbId(process.env.NOTION_DATABASE_PROJECTS);
  const dbBlog = normalizeDbId(process.env.NOTION_DATABASE_BLOG);
  const dbCerts = normalizeDbId(process.env.NOTION_DATABASE_CERTIFICATIONS);
  const dbAch = normalizeDbId(process.env.NOTION_DATABASE_ACHIEVEMENTS);

  const [
    personalRows,
    skillRows,
    projectRows,
    blogRows,
    certRows,
    achRows,
  ] = await Promise.all([
    dbPersonal ? queryDatabase(dbPersonal) : Promise.resolve([]),
    dbSkills ? queryDatabase(dbSkills) : Promise.resolve([]),
    dbProjects ? queryDatabase(dbProjects) : Promise.resolve([]),
    dbBlog ? queryDatabase(dbBlog) : Promise.resolve([]),
    dbCerts ? queryDatabase(dbCerts) : Promise.resolve([]),
    dbAch ? queryDatabase(dbAch) : Promise.resolve([]),
  ]);

  const personalInfo = personalRows[0] ? mapPersonalPage(personalRows[0]) : null;

  return {
    personalInfo,
    skills: skillRows.map(mapSkillPage),
    projects: projectRows.map(mapProjectPage),
    blogs: blogRows.map(mapBlogPage),
    certifications: certRows.map(mapCertificationPage),
    achievements: achRows.map(mapAchievementPage),
  };
  } catch (err) {
    console.error("[notion] fetch failed:", err);
    return {
      personalInfo: null,
      skills: [],
      projects: [],
      blogs: [],
      certifications: [],
      achievements: [],
    };
  }
}
