export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Initializing</p>
        <div className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-cyan-400" />
        </div>
      </div>
    </div>
  );
}
