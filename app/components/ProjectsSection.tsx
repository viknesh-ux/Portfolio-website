"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/types";
import SectionTitle from "./SectionTitle";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean) as string[]))];

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const matchesCategory = category === "All" || project.category === category;
        const searchable = [project.title, project.description, ...(project.tags || []), ...(project.techStack || [])]
          .join(" ")
          .toLowerCase();
        const matchesQuery = searchable.includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
      }),
    [projects, query, category],
  );

  const featured = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <SectionTitle title="Projects" subtitle="Notion-managed projects with filtering and quick access." />
      <div className="mb-5 flex flex-col gap-3 md:flex-row">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects" className="field" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="field md:max-w-60">
          {categories.map((cat) => <option key={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="mb-8">
        <p className="mb-3 text-sm uppercase tracking-wide text-cyan-300">Featured Projects</p>
        <div className="grid gap-4 md:grid-cols-2">{featured.map((project) => <ProjectCard key={project._id} project={project} />)}</div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass p-5 text-sm text-zinc-400">No projects yet. Add rows in your Notion Projects database.</div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{filtered.map((project) => <ProjectCard key={project._id} project={project} />)}</div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const image = project.thumbnail?.trim() || null;

  return (
    <article className="glass group flex h-full flex-col overflow-hidden transition hover:border-cyan-300/40">
      {image ? (
        <Image src={image} alt={project.title} width={600} height={360} unoptimized className="h-40 w-full object-cover" />
      ) : (
        <div className="h-40 w-full bg-zinc-800" />
      )}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-zinc-400">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">{project.tags?.map((tag) => <span className="chip" key={tag}>{tag}</span>)}</div>
        <div className="mt-4 flex gap-3 text-sm text-cyan-200">
          {project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub</a> : null}
          {project.demoUrl ? <a href={project.demoUrl} target="_blank" rel="noreferrer">Live Demo</a> : null}
        </div>
      </div>
    </article>
  );
}
