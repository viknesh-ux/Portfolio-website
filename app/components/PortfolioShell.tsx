"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { Achievement, BlogPreview, Certification, PersonalInfo, Project, Skill } from "@/lib/types";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import CustomCursor from "./CustomCursor";
import Hero from "./Hero";
import SkillsSection from "./SkillsSection";
import GitHubGraph from "./GitHubGraph";
import CertificationsSection from "./CertificationsSection";
import ResumeSection from "./ResumeSection";

const ProjectsSection = dynamic(() => import("./ProjectsSection"), { loading: () => <SectionLoader /> });
const BlogSection = dynamic(() => import("./BlogSection"), { loading: () => <SectionLoader /> });
const AchievementsSection = dynamic(() => import("./AchievementsSection"), { loading: () => <SectionLoader /> });

type View = "home" | "projects" | "writeups" | "contact";

function SectionLoader() {
  return <div className="mx-auto w-full max-w-6xl px-4 py-14 text-sm text-zinc-400 md:px-6 md:py-20">Loading section...</div>;
}

export default function PortfolioShell({
  personalInfo,
  skills,
  projects,
  blogs,
  certifications,
  achievements,
  showAchievements,
}: {
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  blogs: BlogPreview[];
  certifications: Certification[];
  achievements: Achievement[];
  showAchievements: boolean;
}) {
  const [view, setView] = useState<View>("home");
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const navItems: Array<{ label: string; view: View }> = useMemo(
    () => [
      { label: "Home", view: "home" },
      { label: "Projects", view: "projects" },
      { label: "Writeups", view: "writeups" },
      { label: "Contact", view: "contact" },
    ],
    [],
  );

  const goTo = (next: View) => {
    setView(next);
    setOpenMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = openMobileMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMobileMenu]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMobileMenu(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100">
      <CustomCursor />
      <header className="sticky top-0 z-[120] border-b border-zinc-800/60 bg-zinc-950/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <button type="button" onClick={() => goTo("home")} className="text-sm font-semibold tracking-[0.2em] text-cyan-400">
            SEC.PORTFOLIO
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <button
                key={item.view}
                type="button"
                onClick={() => goTo(item.view)}
                className={`rounded-md px-3 py-1 text-sm transition ${view === item.view ? "bg-cyan-400/20 text-cyan-300" : "text-zinc-300 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpenMobileMenu((prev) => !prev)}
              className="relative z-[130] inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-cyan-500/40 px-3 py-2 text-xs font-medium tracking-wide text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-400/10 active:bg-cyan-400/15 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={openMobileMenu}
            >
              {openMobileMenu ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {mounted
        ? createPortal(
            <AnimatePresence mode="sync">
              {openMobileMenu ? (
                <motion.div
                  key="mobile-nav-overlay"
                  className="mobile-menu-overlay md:!hidden"
                  role="presentation"
                  onPointerDown={(event) => {
                    if (event.target === event.currentTarget) setOpenMobileMenu(false);
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="mobile-menu-panel"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation menu"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={(event) => event.stopPropagation()}
                    initial={{ y: -18, opacity: 0, scale: 0.98 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -12, opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Navigation</p>
                      <button
                        type="button"
                        className="min-h-10 min-w-10 rounded-md border border-cyan-500/40 px-2 py-2 text-[11px] text-cyan-200 active:bg-cyan-400/15"
                        onClick={() => setOpenMobileMenu(false)}
                      >
                        Close
                      </button>
                    </div>
                    <div className="space-y-2">
                      {navItems.map((item, index) => (
                        <motion.div
                          key={item.view}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.04 }}
                        >
                          <button
                            type="button"
                            className={`mobile-menu-item ${view === item.view ? "mobile-menu-item-active" : ""}`}
                            onClick={() => goTo(item.view)}
                          >
                            <span className="mobile-menu-order">{String(index + 1).padStart(2, "0")}</span>
                            <span>{item.label}</span>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}

      <main>
        {view === "home" ? (
          <>
            <Hero info={personalInfo} onNavigate={(target) => goTo(target === "contact" ? "contact" : target)} />
            <AboutSection info={personalInfo} />
            <SkillsSection skills={skills} />
            <CertificationsSection certifications={certifications} />
            <ResumeSection info={personalInfo} />
            {showAchievements ? <AchievementsSection achievements={achievements} /> : null}
            <GitHubGraph />
          </>
        ) : null}

        {view === "projects" ? <ProjectsSection projects={projects} /> : null}
        {view === "writeups" ? <BlogSection blogs={blogs} /> : null}
        {view === "contact" ? <ContactSection info={personalInfo} /> : null}
      </main>
    </div>
  );
}
