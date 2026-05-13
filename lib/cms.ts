import path from 'path';
import { readFileSync } from 'fs';
import type { PersonalInfo, Skill, Project, BlogPreview, Certification, Achievement } from './types';

/**
 * Load a JSON file from the `content` directory and parse it.
 */
function loadJson<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'content', filename);
  const fileContents = readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContents) as T;
}

/**
 * Return the full portfolio content for the site. The content is stored as static JSON
 * files under the top‑level `content/` folder. This function is used by the page component
 * to provide data at build time.
 */
export async function getPortfolioContent(): Promise<{
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  blogs: BlogPreview[];
  certifications: Certification[];
  achievements: Achievement[];
}> {
  return {
    personalInfo: loadJson<PersonalInfo>('personalInfo.json'),
    skills: loadJson<Skill[]>('skills.json'),
    projects: loadJson<Project[]>('projects.json'),
    blogs: loadJson<BlogPreview[]>('blogs.json'),
    certifications: loadJson<Certification[]>('certifications.json'),
    achievements: loadJson<Achievement[]>('achievements.json'),
  };
}
