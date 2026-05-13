"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { BlogPreview } from "@/lib/types";
import SectionTitle from "./SectionTitle";

export default function BlogSection({ blogs }: { blogs: BlogPreview[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category).filter(Boolean) as string[]))];
  const filtered = useMemo(
    () =>
      blogs.filter((blog) => {
        const matchesCategory = category === "All" || blog.category === category;
        const searchable = [blog.title, blog.summary, ...(blog.tags || [])].join(" ").toLowerCase();
        const matchesQuery = searchable.includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
      }),
    [blogs, query, category],
  );

  const featured = blogs.filter((blog) => blog.featured);

  return (
    <section id="writeups" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <SectionTitle title="Blog & Writeups" subtitle="Curated Medium links managed in your Notion Blog database." />
      <div className="mb-5 flex flex-col gap-3 md:flex-row">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search writeups" className="field" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="field md:max-w-60">
          {categories.map((cat) => <option key={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="mb-8">
        <p className="mb-3 text-sm uppercase tracking-wide text-cyan-300">Featured Writeups</p>
        <div className="grid gap-4 md:grid-cols-2">{featured.map((blog) => <BlogCard key={blog._id} blog={blog} />)}</div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass p-5 text-sm text-zinc-400">No writeups yet. Add rows in your Notion Blog database.</div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{filtered.map((blog) => <BlogCard key={blog._id} blog={blog} />)}</div>
    </section>
  );
}

function BlogCard({ blog }: { blog: BlogPreview }) {
  const image = blog.coverImage?.trim() || null;
  return (
    <article className="glass group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:border-cyan-300/40">
      {image ? (
        <Image src={image} alt={blog.title} width={600} height={360} unoptimized className="h-40 w-full object-cover" />
      ) : (
        <div className="h-40 w-full bg-zinc-800" />
      )}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-white">{blog.title}</h3>
        <p className="mt-2 text-sm text-zinc-400">{blog.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">{blog.tags?.map((tag) => <span className="chip" key={tag}>{tag}</span>)}</div>
        <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
          <span>{blog.readingTime}</span>
          <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : ""}</span>
        </div>
        <a className="mt-4 inline-flex w-fit rounded-md border border-cyan-500/40 px-3 py-2 text-sm text-cyan-200 transition hover:border-cyan-300" href={blog.mediumUrl} target="_blank" rel="noreferrer">Read on Medium</a>
      </div>
    </article>
  );
}
