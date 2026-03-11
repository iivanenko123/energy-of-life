import Link from "next/link";

const products = [
  { title: "Интуиция", subtitle: "1 месяц · 4 модуля · 6 000 ₽", href: "/products/intuition", badge: "В продаже" },
  { title: "Медитация Mindfulness", subtitle: "1 месяц · 15 уроков + 15 аудио · 6 000 ₽", href: "/products/mindfulness", badge: "Скоро" },
  { title: "Марафон 10 парамит", subtitle: "10 дней · бесплатно", href: "/products/10-paramit", badge: "Бесплатно" },
  { title: "Марафон Mindfulness 5 дней", subtitle: "5 дней · бесплатно", href: "/products/mindfulness-5-days", badge: "Бесплатно" },
  { title: "Энергия жизни", subtitle: "Лендинг курса", href: "/energy-of-life", badge: "Лендинг" },
  { title: "Интенсив: Где мой ресурс?", subtitle: "Лендинг интенсива", href: "/intens", badge: "Лендинг" }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Программы</div>
            <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Курсы и марафоны</h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Здесь собраны платные курсы в записи и бесплатные марафоны. Доступы пока выдаются вручную.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm">
            <Link href="/site" className="text-slate-300 hover:text-white">
              На главную
            </Link>
            <Link href="/auth" className="text-slate-300 hover:text-white">
              Вход
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-lg font-semibold text-white">{p.title}</div>
                <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-slate-200">{p.badge}</div>
              </div>
              <div className="mt-3 text-sm text-slate-300">{p.subtitle}</div>
              <div className="mt-6 text-sm font-semibold text-cyan-200">Открыть →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

