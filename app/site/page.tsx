import Image from "next/image";
import Link from "next/link";
import Starfield from "./Starfield";

type ProductCard = {
  title: string;
  subtitle: string;
  price: string;
  href: string;
  badge?: string;
  image: string;
  imageAlt: string;
};

const products: ProductCard[] = [
  {
    title: "Интуиция",
    subtitle: "Онлайн-курс в записи · 1 месяц · 4 модуля",
    price: "6 000 ₽",
    href: "/products/intuition",
    badge: "В продаже",
    image:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Звёздное небо — интуиция"
  },
  {
    title: "Медитация Mindfulness",
    subtitle: "Онлайн-курс в записи · 1 месяц · 15 уроков + 15 аудио",
    price: "6 000 ₽",
    href: "/products/mindfulness",
    badge: "Скоро",
    image:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Тихая медитация — mindfulness"
  },
  {
    title: "Марафон 10 парамит",
    subtitle: "10 дней · бесплатно",
    price: "0 ₽",
    href: "/products/10-paramit",
    badge: "Бесплатно",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Горный путь — практика"
  },
  {
    title: "Марафон Mindfulness 5 дней",
    subtitle: "5 дней · бесплатно",
    price: "0 ₽",
    href: "/products/mindfulness-5-days",
    badge: "Бесплатно",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Туманная природа — ясность"
  },
  {
    title: "Энергия жизни",
    subtitle: "Текущий лендинг курса",
    price: "—",
    href: "/energy-of-life",
    badge: "Лендинг",
    image:
      "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Рассвет — энергия жизни"
  },
  {
    title: "Интенсив: Где мой ресурс?",
    subtitle: "Текущий лендинг интенсива",
    price: "—",
    href: "/intens",
    badge: "Лендинг",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Озеро в горах — ресурс"
  }
];

function SectionTitle(props: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {props.eyebrow ? <div className="text-xs uppercase tracking-[0.35em] text-slate-400">{props.eyebrow}</div> : null}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">{props.title}</h2>
      {props.description ? <p className="mt-4 text-base text-slate-300 md:text-lg">{props.description}</p> : null}
    </div>
  );
}

export default function SiteHomePage() {
  return (
    <div className="relative z-10 min-h-screen bg-transparent text-slate-50">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_80%_65%,rgba(168,85,247,0.16),transparent_45%),radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay [background-image:radial-gradient(1px_1px_at_10%_10%,#fff_100%,transparent),radial-gradient(1px_1px_at_30%_70%,#fff_100%,transparent),radial-gradient(1px_1px_at_80%_40%,#fff_100%,transparent)] [background-size:220px_220px]" />
        <div className="absolute inset-0 opacity-[0.14] mix-blend-screen blur-3xl [background-image:radial-gradient(circle_at_15%_70%,rgba(34,211,238,0.25),transparent_40%),radial-gradient(circle_at_78%_25%,rgba(192,132,252,0.22),transparent_42%),radial-gradient(circle_at_55%_88%,rgba(56,189,248,0.18),transparent_45%)]" />
      </div>

      <Starfield />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/20 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/site" className="text-sm font-semibold tracking-wide text-white">
            Ирина Иваненко
          </Link>
          <nav className="hidden items-center gap-3 text-sm text-slate-300 md:flex">
            <a
              href="#states"
              className="group inline-flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white"
            >
              <svg className="h-4 w-4 text-cyan-200/80 drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
              <span>Состояния</span>
            </a>
            <a
              href="#about"
              className="group inline-flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white"
            >
              <svg className="h-4 w-4 text-violet-200/80 drop-shadow-[0_0_10px_rgba(167,139,250,0.35)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2l2 6h7l-5.6 4.1L17 20l-5-3.2L7 20l1.6-7.9L3 8h7l2-6z" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              <span>Обо мне</span>
            </a>
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white"
            >
              <svg className="h-4 w-4 text-cyan-200/80 drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="4" y="4" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.2" />
                <rect x="13" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <rect x="4" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <rect x="13" y="13" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <span>Программы</span>
            </a>
            <a
              href="#reviews"
              className="group inline-flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white"
            >
              <svg className="h-4 w-4 text-amber-100/80 drop-shadow-[0_0_10px_rgba(251,191,36,0.25)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.08" />
                <path d="M12 7v5l4 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
              </svg>
              <span>Отзывы</span>
            </a>
            <a
              href="#consult"
              className="group inline-flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white"
            >
              <svg className="h-4 w-4 text-teal-100/80 drop-shadow-[0_0_10px_rgba(45,212,191,0.25)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 10h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-3l-4 3v-3H7a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2z" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <circle cx="9" cy="13.2" r="1" fill="currentColor" />
                <circle cx="12" cy="13.2" r="1" fill="currentColor" />
                <circle cx="15" cy="13.2" r="1" fill="currentColor" />
              </svg>
              <span>Консультация</span>
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/auth"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Вход
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-20 pt-16 md:grid-cols-2 md:items-center md:pt-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">
                Работа с состоянием · целостное развитие
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Возвращаю свет
                <span className="block bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  в сердца людей
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                Если вы в кризисе и чувствуете: «по-старому не хочу, по-новому не знаю как», мы начнём с главного —
                состояния. Спокойствие, ясность и опора на себя становятся базой, на которой выстраивается новая жизнь.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#products" className="btn-cta-primary">
                  Выбрать программу
                </a>
                <a href="#consult" className="btn-cta-secondary">
                  Бесплатная консультация
                </a>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4 text-sm text-slate-300 md:grid-cols-3">
                <div className="matte-panel rounded-2xl p-4 backdrop-blur">
                  <div className="text-2xl font-semibold text-white">20</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">лет практики</div>
                </div>
                <div className="matte-panel rounded-2xl p-4 backdrop-blur">
                  <div className="text-2xl font-semibold text-white">6</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">программ</div>
                </div>
                <div className="matte-panel rounded-2xl p-4 backdrop-blur">
                  <div className="text-2xl font-semibold text-white">2</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">бесплатных марафона</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-cyan-500/20 via-purple-500/15 to-pink-500/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-3 backdrop-blur">
                <div className="aspect-[3/4] overflow-hidden rounded-[28px] border border-white/10">
                  <Image
                    src="/irina1.jpg"
                    alt="Ирина Иваненко"
                    width={900}
                    height={1100}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <div className="mt-3 grid gap-2 rounded-3xl border border-white/10 bg-black/35 p-3">
                  <div className="text-sm font-semibold text-white">Ирина Иваненко</div>
                  <div className="text-sm text-slate-300">
                    Преподаватель медитации и практик осознанности, инженер биомедицинских технологий
                  </div>
                  <div className="text-xs text-slate-400">
                    Мой подход — переводить язык тонких ощущений в чёткие, понятные алгоритмы.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="states" className="py-20">
          <SectionTitle
            eyebrow="Актуальность"
            title="Я работаю с состояниями — с основой"
            description="Глубина осознанности, целостное развитие, баланс духовного и материального начинаются с того, в каком состоянии вы живёте и принимаете решения."
          />

          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-[28px] matte-panel p-6 backdrop-blur">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Боль</div>
                  <div className="mt-3 text-lg font-semibold text-white">Кризис</div>
                  <div className="mt-2 text-slate-300">По-старому не хочу, по-новому не знаю как.</div>
                </div>
                <div className="rounded-[28px] matte-panel p-6 backdrop-blur">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Боль</div>
                  <div className="mt-3 text-lg font-semibold text-white">Поиск себя</div>
                  <div className="mt-2 text-slate-300">Не знаю кто я и чем мне заниматься.</div>
                </div>
                <div className="rounded-[28px] matte-panel p-6 backdrop-blur md:col-span-2">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Результат</div>
                  <div className="mt-3 text-lg font-semibold text-white">Спокойствие и ясность</div>
                  <div className="mt-2 text-slate-300">
                    Возвращается способность видеть суть, принимать решения и действовать без внутренней борьбы.
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative h-full overflow-hidden rounded-[28px] matte-panel p-6 backdrop-blur">
                <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
                <div className="relative">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Результат</div>
                  <div className="mt-3 text-lg font-semibold text-white">Чувствование себя · опора на себя</div>
                  <div className="mt-3 text-slate-300">
                    Вы начинаете доверять внутренним сигналам, удерживать устойчивость и выстраивать свою линию жизни.
                  </div>
                  <div className="mt-6 grid gap-3 text-sm text-slate-300">
                    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">Мягко и глубоко</div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">Алгоритмы вместо хаоса</div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">Интеграция духовного и материального</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20">
          <SectionTitle eyebrow="Обо мне" title="Путь, опыт, метод" />
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <div className="rounded-[32px] matte-panel p-6 backdrop-blur">
                <div className="mb-5 overflow-hidden rounded-[26px] border border-white/10 bg-white/5">
                  <Image
                    src="/irina1.jpg"
                    alt="Ирина Иваненко"
                    width={900}
                    height={1100}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <p className="text-slate-300">
                  Уже 20 лет я исследую законы жизни, причинно-следственные связи и внутренние процессы человека. Я не
                  предлагаю временных решений — я даю фундаментальные навыки для жизни и учу видеть суть вещей.
                </p>
                <p className="mt-4 text-slate-300">
                  Мой подход — переводить язык тонких ощущений в чёткие, понятные алгоритмы.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200">
                    Mindfulness
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200">
                    Интуиция
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200">
                    Системность
                  </span>
                </div>
                <div className="mt-8">
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-[28px] matte-panel p-6 backdrop-blur md:col-span-2">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Метод</div>
                  <div className="mt-3 text-lg font-semibold text-white">Состояние → ясность → действие</div>
                  <div className="mt-2 text-slate-300">
                    Мы не “чинем симптомы”. Мы возвращаем опору и настраиваем внутренние процессы так, чтобы решения были
                    естественными.
                  </div>
                </div>
                <div className="rounded-[28px] matte-panel p-6 backdrop-blur">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Фокус</div>
                  <div className="mt-3 text-lg font-semibold text-white">Целостность</div>
                  <div className="mt-2 text-slate-300">Интеграция опыта в реальную жизнь.</div>
                </div>
                <div className="rounded-[28px] matte-panel p-6 backdrop-blur">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Формат</div>
                  <div className="mt-3 text-lg font-semibold text-white">Практики</div>
                  <div className="mt-2 text-slate-300">Видео, аудио, тексты, домашние задания.</div>
                </div>
                <div className="rounded-[28px] matte-panel p-6 backdrop-blur md:col-span-2">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Поддержка</div>
                  <div className="mt-3 text-lg font-semibold text-white">Эфиры и обратная связь</div>
                  <div className="mt-2 text-slate-300">Живые встречи в Zoom/Telegram/ВК, разбор домашних заданий.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="py-20">
          <SectionTitle eyebrow="Программы" title="Курсы и марафоны" description="Выберите формат: платные курсы в записи и бесплатные марафоны." />
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group relative neon-panel matte-panel overflow-hidden p-0 transition hover:border-white/20"
              >
                <div className="relative aspect-[16/11] w-full shrink-0 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/40 to-transparent" />
                  {p.badge ? (
                    <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs text-slate-100 backdrop-blur">
                      {p.badge}
                    </div>
                  ) : null}
                </div>
                <div className="relative p-6 pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-lg font-semibold text-white">{p.title}</div>
                  </div>
                  <div className="mt-2 text-sm text-slate-300">{p.subtitle}</div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-slate-400">Стоимость</div>
                    <div className="text-base font-semibold text-white">{p.price}</div>
                  </div>
                  <div className="mt-4 text-sm font-semibold text-cyan-100/90 transition group-hover:text-cyan-50">
                    Подробнее →
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mx-auto mt-10 flex max-w-6xl justify-center px-6">
            <Link
              href="/products"
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Все программы
            </Link>
          </div>
        </section>

        <section id="reviews" className="py-20">
          <SectionTitle eyebrow="Отзывы" title="Как это ощущается у учеников" />
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
            {[
              {
                text: "После практик появилось спокойствие и ясность. Я перестала спорить с собой и начала действовать мягко.",
                name: "Анна"
              },
              {
                text: "Мне стало проще слышать себя. Самое ценное — ощущение опоры и понятные шаги, что делать дальше.",
                name: "Екатерина"
              },
              {
                text: "Кризис перестал быть тупиком. Я увидела, где утекает ресурс, и начала собирать его обратно.",
                name: "Мария"
              }
            ].map((r) => (
              <div key={r.name} className="rounded-[28px] matte-panel p-6 backdrop-blur">
                <div className="text-sm text-slate-200">{r.text}</div>
                <div className="mt-6 text-xs uppercase tracking-[0.24em] text-slate-400">{r.name}</div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 flex max-w-6xl justify-center px-6">
            <Link
              href="/reviews"
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Все отзывы
            </Link>
          </div>
        </section>

        <section id="consult" className="py-20">
          <SectionTitle
            eyebrow="Консультация"
            title="Бесплатная запись"
            description="Оставьте заявку или напишите в Telegram — это быстрее и удобнее."
          />
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2">
            <div className="rounded-[32px] matte-panel p-6 backdrop-blur">
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
            <div className="rounded-[32px] matte-panel p-6 backdrop-blur">
              <div className="text-sm font-semibold text-white">Ссылки</div>
              <div className="mt-4 grid gap-3 text-sm">
                <Link href="/products" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-200 hover:bg-black/40">
                  Программы и курсы
                </Link>
                <Link href="/cabinet" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-200 hover:bg-black/40">
                  Кабинет ученика (демо)
                </Link>
                <Link href="/admin" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-200 hover:bg-black/40">
                  Админка (демо)
                </Link>
                <Link href="/energy-of-life" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-200 hover:bg-black/40">
                  Лендинг курса «Энергия жизни»
                </Link>
                <Link href="/intens" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-200 hover:bg-black/40">
                  Лендинг интенсива
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.25)]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Ирина Иваненко</div>
              <div className="mt-2 text-sm text-slate-400">Осознанность · медитация · работа с состоянием</div>
            </div>
            <div className="grid gap-2 text-sm text-slate-300">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 hover:text-white transition"
              >
                <svg className="h-4 w-4 text-violet-200/80 drop-shadow-[0_0_10px_rgba(167,139,250,0.35)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2l2 6h7l-5.6 4.1L17 20l-5-3.2L7 20l1.6-7.9L3 8h7l2-6z" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
                <span>Обо мне</span>
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 hover:text-white transition"
              >
                <svg className="h-4 w-4 text-cyan-200/80 drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="4" y="4" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="13" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="4" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="13" y="13" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span>Программы</span>
              </Link>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 hover:text-white transition"
              >
                <svg className="h-4 w-4 text-amber-100/80 drop-shadow-[0_0_10px_rgba(251,191,36,0.25)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3.5" y="5" width="17" height="14" rx="3" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.06" />
                  <path d="M10 9.2v5.6l5-2.8-5-2.8z" fill="currentColor" fillOpacity="0.85" />
                </svg>
                <span>Статьи</span>
              </Link>
              <Link
                href="/reviews"
                className="group inline-flex items-center gap-2 hover:text-white transition"
              >
                <svg className="h-4 w-4 text-teal-100/80 drop-shadow-[0_0_10px_rgba(45,212,191,0.25)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 10h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-3l-4 3v-3H7a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2z" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  <circle cx="9" cy="13.2" r="1" fill="currentColor" />
                  <circle cx="12" cy="13.2" r="1" fill="currentColor" />
                  <circle cx="15" cy="13.2" r="1" fill="currentColor" />
                </svg>
                <span>Отзывы</span>
              </Link>
            </div>
            <div className="text-sm text-slate-300">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Контакты</div>
              <div className="mt-2">
                <a
                  className="inline-flex items-center gap-2 hover:text-white transition"
                  href="https://t.me/irina_ivanenko11"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg className="h-4 w-4 text-teal-100/80 drop-shadow-[0_0_10px_rgba(45,212,191,0.25)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M21 3L3 10l7 2 2 7 7-21z" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                    <path d="M10 12l11-9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                  </svg>
                  <span>Telegram: @irina_ivanenko11</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 text-xs text-slate-500">© {new Date().getFullYear()} Ирина Иваненко. Все права защищены.</div>
        </div>
      </footer>
    </div>
  );
}

