export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold tracking-tight text-cyan-300 md:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-2 max-w-2xl text-sm text-zinc-400 md:text-base">{subtitle}</p> : null}
    </div>
  );
}
