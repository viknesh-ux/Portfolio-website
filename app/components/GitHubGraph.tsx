"use client";

import { useEffect, useState } from "react";

export default function GitHubGraph() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const [svg, setSvg] = useState("");

  useEffect(() => {
    if (!username) return;

    const fetchSvg = async () => {
      try {
        const response = await fetch(`https://github.com/users/${username}/contributions?format=svg`);
        if (!response.ok) throw new Error("Failed to load contribution graph");
        setSvg(await response.text());
      } catch {
        setSvg("<p class='text-sm text-red-400'>Unable to load GitHub contributions.</p>");
      }
    };

    void fetchSvg();
  }, [username]);

  if (!username) return null;

  return (
    <section id="github" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-cyan-300">GitHub Activity</h2>
      <div className="glass overflow-x-auto p-4">
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
    </section>
  );
}
