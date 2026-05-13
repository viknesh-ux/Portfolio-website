"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () =>
      typeof window !== "undefined"
        ? (localStorage.getItem("theme") ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) ===
          "dark"
        : true,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggle = () => {
    setDark((prev) => !prev);
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="rounded-full border border-cyan-500/40 bg-zinc-900/70 px-3 py-1 text-xs text-cyan-200 backdrop-blur transition hover:border-cyan-300 dark:bg-zinc-900"
    >
      {dark ? "Light" : "Dark"} mode
    </button>
  );
}
