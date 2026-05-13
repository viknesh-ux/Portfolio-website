import type { Skill } from "@/lib/types";
import AnimatedWrapper from "./AnimatedWrapper";
import SectionTitle from "./SectionTitle";

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) {
    return (
      <section id="skills" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <SectionTitle title="Skills" subtitle="Categorized cybersecurity and technical capabilities." />
        <div className="glass p-5 text-sm text-zinc-400">No skills yet. Add rows in your Notion Skills database.</div>
      </section>
    );
  }

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <SectionTitle title="Skills" subtitle="Categorized cybersecurity and technical capabilities." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(grouped).map(([category, items], idx) => (
          <AnimatedWrapper key={category} delay={idx * 0.04}>
            <article className="glass h-full p-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-300">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item._id} className="chip">{item.name}</span>
                ))}
              </div>
            </article>
          </AnimatedWrapper>
        ))}
      </div>
    </section>
  );
}
