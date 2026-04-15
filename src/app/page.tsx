export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center space-y-4">
        <p className="text-zinc-500 text-sm font-mono">PMBOK® 7 Navigator</p>
        <h1 className="text-4xl font-bold tracking-tight">
          Project Mind Vault
        </h1>
        <p className="text-zinc-400 max-w-md mx-auto">
          Sistema interativo em construção. Fase 1 — Setup concluído.
        </p>
        <div className="flex gap-3 justify-center pt-4">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
            ✓ Next.js 15
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
            ✓ TypeScript
          </span>
          <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs border border-violet-500/20">
            ✓ Tailwind 4
          </span>
        </div>
      </div>
    </main>
  );
}
