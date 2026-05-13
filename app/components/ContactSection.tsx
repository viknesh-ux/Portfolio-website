import type { PersonalInfo } from "@/lib/types";
import SectionTitle from "./SectionTitle";

export default function ContactSection({ info }: { info: PersonalInfo }) {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <SectionTitle title="Contact" subtitle="Open to internships, projects, and collaboration opportunities." />
      <div className="grid gap-6 md:grid-cols-2">
        <form className="glass space-y-3 p-5" action={`mailto:${info.email || "you@example.com"}`} method="post" encType="text/plain">
          <input className="field" name="name" placeholder="Your name" required />
          <input className="field" type="email" name="email" placeholder="Your email" required />
          <textarea className="field min-h-28" name="message" placeholder="Message" required />
          <button className="btn-neon" type="submit">Send Message</button>
        </form>
        <div className="glass space-y-4 p-5">
          <a href={`mailto:${info.email || "you@example.com"}`} className="btn-secondary inline-flex">Email Me</a>
          {info.phone ? <a href={`tel:${info.phone}`} className="btn-secondary inline-flex">Call {info.phone}</a> : null}
          <a href={info.resumeUrl || "#"} className="btn-secondary inline-flex" target="_blank" rel="noreferrer">Download Resume</a>
          <div className="space-y-2 text-sm text-zinc-300">
            {info.github ? <a href={info.github} target="_blank" rel="noreferrer" className="block">GitHub</a> : null}
            {info.linkedin ? <a href={info.linkedin} target="_blank" rel="noreferrer" className="block">LinkedIn</a> : null}
            {info.medium ? <a href={info.medium} target="_blank" rel="noreferrer" className="block">Medium</a> : null}
            {info.phone ? <a href={`tel:${info.phone}`} className="block">Phone: {info.phone}</a> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
