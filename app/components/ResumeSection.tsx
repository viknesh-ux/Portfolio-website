import type { PersonalInfo } from "@/lib/types";
import SectionTitle from "./SectionTitle";

export default function ResumeSection({ info }: { info: PersonalInfo }) {
  return (
    <section id="resume" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <SectionTitle title="Resume" subtitle="Set your resume URL in the Notion Personal database (Resume URL field)." />
      <article className="glass flex flex-col items-start gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-zinc-400">Keep this updated with internships, projects, certifications, and CTF highlights.</p>
        </div>
        <a
          href={info.resumeUrl || "#"}
          target="_blank"
          rel="noreferrer"
          className="btn-neon"
          aria-disabled={!info.resumeUrl}
        >
          {info.resumeUrl ? "View / Download Resume" : "Add Resume URL in Notion"}
        </a>
      </article>
    </section>
  );
}
