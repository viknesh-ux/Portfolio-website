import type { PersonalInfo } from "@/lib/types";
import AnimatedWrapper from "./AnimatedWrapper";
import SectionTitle from "./SectionTitle";

export default function AboutSection({ info }: { info: PersonalInfo }) {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <SectionTitle title="About" subtitle="Cybersecurity student profile, interests, goals, and learning timeline." />
      <AnimatedWrapper>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="glass p-5">
            <p className="text-zinc-300">{info.bio}</p>
            <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-cyan-300">Career Goals</h3>
            <p className="mt-2 text-zinc-400">{info.careerGoals}</p>
          </article>
          <article className="glass p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Interests</h3>
            <div className="mt-3 flex flex-wrap gap-2">{info.interests?.map((item) => <span key={item} className="chip">{item}</span>)}</div>
            <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-cyan-300">Domains</h3>
            <div className="mt-3 flex flex-wrap gap-2">{info.domains?.map((item) => <span key={item} className="chip">{item}</span>)}</div>
          </article>
        </div>
        <div className="mt-6 glass p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Education Timeline</h3>
          <div className="mt-4 space-y-4">
            {info.education?.map((item, idx) => (
              <div key={`${item.institution}-${idx}`} className="border-l border-cyan-400/30 pl-4">
                <p className="font-medium text-white">{item.program} — {item.institution}</p>
                <p className="text-sm text-zinc-400">{item.startYear} - {item.endYear}</p>
                <p className="text-sm text-zinc-400">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedWrapper>
    </section>
  );
}
