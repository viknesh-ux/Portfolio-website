"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { PersonalInfo } from "@/lib/types";

const rotating = ["Pentester", "Security Researcher", "CTF Player", "Blue Team Learner"];

type HeroProps = {
  info: PersonalInfo;
  onNavigate?: (target: "projects" | "writeups" | "contact") => void;
};

export default function Hero({ info, onNavigate }: HeroProps) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const current = rotating[index % rotating.length];
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setText(current.slice(0, i));
      if (i >= current.length) {
        clearInterval(timer);
        setTimeout(() => setIndex((prev) => prev + 1), 1200);
      }
    }, 90);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-4 py-14 md:px-6 md:py-20">
      <div className="cyber-grid" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-6 md:gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div className="space-y-8">
        <motion.p className="text-sm text-cyan-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          CYBERSECURITY PORTFOLIO
        </motion.p>
        <motion.h1 className="text-3xl font-bold tracking-tight text-white md:text-6xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          {info.fullName}
        </motion.h1>
        <p className="text-lg text-zinc-300 md:text-2xl">{info.role} • {text}<span className="animate-pulse">|</span></p>
        <p className="max-w-2xl text-sm text-zinc-400 md:text-base">{info.intro}</p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-neon min-h-12 touch-manipulation active:opacity-90" onClick={() => onNavigate?.("projects")}>View Projects</button>
          <button type="button" className="btn-secondary min-h-12 touch-manipulation active:opacity-90" onClick={() => onNavigate?.("writeups")}>Read Writeups</button>
          <button type="button" className="btn-secondary min-h-12 touch-manipulation active:opacity-90" onClick={() => onNavigate?.("contact")}>Contact Me</button>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-zinc-300 md:gap-4">
          {info.github ? <a href={info.github} target="_blank" rel="noreferrer">GitHub</a> : null}
          {info.linkedin ? <a href={info.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> : null}
          {info.medium ? <a href={info.medium} target="_blank" rel="noreferrer">Medium</a> : null}
          {info.email ? <a href={`mailto:${info.email}`}>Email</a> : null}
          {info.phone ? <a href={`tel:${info.phone}`}>Phone</a> : null}
        </div>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <div className="glass flex aspect-square items-center justify-center overflow-hidden border-dashed text-sm text-zinc-500 dark:text-zinc-300">
            {info.profileImage ? (
              <Image
                src={info.profileImage}
                alt={`${info.fullName} profile`}
                width={600}
                height={600}
                unoptimized
                className="h-full w-full object-cover"
              />
            ) : (
              <span>Profile photo — add image URL in Notion (Personal database)</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
