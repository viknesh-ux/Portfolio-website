import type { Achievement, BlogPreview, Certification, PersonalInfo, Project, Skill } from "@/lib/types";
import { getPortfolioContent } from "@/lib/cms";

import PortfolioShell from "./components/PortfolioShell";

async function getContent(): Promise<{
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  blogs: BlogPreview[];
  certifications: Certification[];
  achievements: Achievement[];
}> {
  // Load static content from Decap CMS (markdown files) at build time
  return await getPortfolioContent();
}

export default async function Home() {
  const { personalInfo, skills, projects, blogs, certifications, achievements } = await getContent();

  const showAchievements = achievements.length > 0;

  return (
    <PortfolioShell
      personalInfo={personalInfo}
      skills={skills}
      projects={projects}
      blogs={blogs}
      certifications={certifications}
      achievements={achievements}
      showAchievements={showAchievements}
    />
  );
}
