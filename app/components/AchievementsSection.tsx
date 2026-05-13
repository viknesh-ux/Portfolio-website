import type { Achievement } from "@/lib/types";
import SectionTitle from "./SectionTitle";

export default function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  return (
    <section id="achievements" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <SectionTitle title="Achievements" subtitle="CTF rankings, internships, competitions, and awards." />
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((item) => (
          <article key={item._id} className="glass p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <span className="chip">{item.type}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
              <span>{item.date ? new Date(item.date).toLocaleDateString() : ""}</span>
              {item.link ? <a href={item.link} target="_blank" rel="noreferrer" className="text-cyan-200">More</a> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
