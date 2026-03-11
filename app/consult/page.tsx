import Link from "next/link";

export default function ConsultPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Консультация</div>
            <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Бесплатная запись</h1>
            <p className="mt-4 text-slate-300">Самый быстрый способ — написать в Telegram.</p>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm">
            <Link href="/site" className="text-slate-300 hover:text-white">
              На главную
            </Link>
            <Link href="/products" className="text-slate-300 hover:text-white">
              Программы
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="text-sm font-semibold text-white">Написать в Telegram</div>
          <div className="mt-2 text-sm text-slate-300">Коротко опишите запрос — я отвечу и предложу следующий шаг.</div>
          <div className="mt-6">
            <a
              href="https://t.me/irina_ivanenko11"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-95"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

