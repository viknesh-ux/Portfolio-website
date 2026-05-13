import Image from "next/image";
import type { Certification } from "@/lib/types";
import SectionTitle from "./SectionTitle";

export default function CertificationsSection({ certifications }: { certifications: Certification[] }) {
  if (certifications.length === 0) {
    return (
      <section id="certifications" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <SectionTitle title="Certifications" subtitle="Credential highlights from your Notion Certifications database." />
        <div className="glass p-5 text-sm text-zinc-400">No certifications yet. Add rows in your Notion Certifications database.</div>
      </section>
    );
  }

  return (
    <section id="certifications" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <SectionTitle title="Certifications" subtitle="Credential highlights from your Notion Certifications database." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((item) => {
          const image = item.badgeImage?.trim() || null;
          return (
            <article key={item._id} className="glass p-4">
              {image ? (
                <Image src={image} alt={item.name} width={240} height={240} unoptimized className="mb-3 h-20 w-20 rounded object-cover" />
              ) : null}
              <h3 className="font-semibold text-white">{item.name}</h3>
              <p className="text-sm text-zinc-400">{item.issuer}</p>
              <p className="mt-2 text-xs text-zinc-500">{item.date ? new Date(item.date).toLocaleDateString() : ""}</p>
              {item.credentialUrl ? <a href={item.credentialUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm text-cyan-200">View credential</a> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
