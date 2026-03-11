import Link from "next/link";

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Отзывы</div>
            <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Отзывы учеников</h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Здесь будет полноценная страница отзывов. Пока — демо-блоки.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm">
            <Link href="/site" className="text-slate-300 hover:text-white">
              На главную
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            "Спокойствие и ясность стали моим новым состоянием.",
            "Я начала слышать себя и опираться на внутренние сигналы.",
            "Кризис перестал пугать — появился путь и шаги."
          ].map((t, idx) => (
            <div key={idx} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="text-sm text-slate-200">{t}</div>
              <div className="mt-6 text-xs uppercase tracking-[0.24em] text-slate-400">Отзыв</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

