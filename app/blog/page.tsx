import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Статьи</div>
            <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Блог</h1>
            <p className="mt-4 max-w-2xl text-slate-300">Раздел в разработке. Здесь будут тексты и практики из вашего опыта.</p>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm">
            <Link href="/site" className="text-slate-300 hover:text-white">
              На главную
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {["Состояние как основа", "Как вернуть ясность", "Опора на себя"].map((t) => (
            <div key={t} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="text-lg font-semibold text-white">{t}</div>
              <div className="mt-3 text-sm text-slate-300">Скоро</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

