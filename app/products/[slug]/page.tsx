import Link from "next/link";
import { notFound } from "next/navigation";

const products = {
  intuition: {
    title: "Интуиция",
    subtitle: "Онлайн-курс в записи · 1 месяц · 4 модуля",
    price: "6 000 ₽",
    description:
      "Курс для тех, кто хочет научиться слышать себя, опираться на внутренние сигналы и принимать решения из ясности.",
    bullets: ["4 модуля", "Открытие уроков по дням от старта", "Домашние задания обязательны", "Эфиры/созвоны: по расписанию"]
  },
  mindfulness: {
    title: "Медитация Mindfulness",
    subtitle: "Онлайн-курс в записи · 1 месяц · 15 уроков + 15 аудио",
    price: "6 000 ₽",
    description: "Курс про устойчивость внимания, спокойствие и ясность как основу повседневной жизни.",
    bullets: ["15 видео-уроков", "15 аудио-практик", "Ритм практики и интеграция", "Поддержка через задания"]
  },
  "10-paramit": {
    title: "Марафон 10 парамит",
    subtitle: "10 дней · бесплатно",
    price: "0 ₽",
    description: "Короткий формат для знакомства с подходом и возвращения опоры через ежедневные практики.",
    bullets: ["10 дней", "Небольшие задания", "Фокус на состоянии", "Бесплатно"]
  },
  "mindfulness-5-days": {
    title: "Марафон Mindfulness 5 дней",
    subtitle: "5 дней · бесплатно",
    price: "0 ₽",
    description: "Мягкий вход в mindfulness: практики на каждый день, чтобы почувствовать эффект и выбрать свой ритм.",
    bullets: ["5 дней", "Короткие практики", "Подходит для старта", "Бесплатно"]
  }
} as const;

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug?: string | string[] }>;
}) {
  const { slug } = await params;
  const normalizedSlug = Array.isArray(slug) ? slug[0] : slug;
  const product = normalizedSlug
    ? (products as Record<string, (typeof products)[keyof typeof products]>)[normalizedSlug]
    : undefined;
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-[#050510] text-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Продукт</div>
            <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">{product.title}</h1>
            <div className="mt-3 text-slate-300">{product.subtitle}</div>
            <div className="mt-5 text-lg font-semibold text-white">{product.price}</div>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm">
            <Link href="/site" className="text-slate-300 hover:text-white">
              На главную
            </Link>
            <Link href="/products" className="text-slate-300 hover:text-white">
              Все программы
            </Link>
            <Link href="/auth" className="text-slate-300 hover:text-white">
              Вход
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="text-sm text-slate-200">{product.description}</div>
          <ul className="mt-6 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
            {product.bullets.map((b) => (
              <li key={b} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/consult"
              className="rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-95"
            >
              Оставить заявку
            </Link>
            <a
              href="https://t.me/irina_ivanenko11"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Написать в Telegram
            </a>
          </div>
          <div className="mt-4 text-xs text-slate-500">Оплата и автодоступ будут подключены позже. Пока доступы выдаются вручную.</div>
        </div>
      </div>
    </div>
  );
}
