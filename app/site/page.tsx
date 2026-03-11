import Image from "next/image";
import Link from "next/link";

type ProductCard = {
  title: string;
  subtitle: string;
  price: string;
  href: string;
  badge?: string;
};

const products: ProductCard[] = [
  {
    title: "Интуиция",
    subtitle: "Онлайн-курс в записи · 1 месяц · 4 модуля",
    price: "6 000 ₽",
    href: "/products/intuition",
    badge: "В продаже"
  },
  {
    title: "Медитация Mindfulness",
    subtitle: "Онлайн-курс в записи · 1 месяц · 15 уроков + 15 аудио",
    price: "6 000 ₽",
    href: "/products/mindfulness",
    badge: "Скоро"
  },
  {
    title: "Марафон 10 парамит",
    subtitle: "10 дней · бесплатно",
    price: "0 ₽",
    href: "/products/10-paramit",
    badge: "Бесплатно"
  },
  {
    title: "Марафон Mindfulness 5 дней",
    subtitle: "5 дней · бесплатно",
    price: "0 ₽",
    href: "/products/mindfulness-5-days",
    badge: "Бесплатно"
  },
  {
    title: "Энергия жизни",
    subtitle: "Текущий лендинг курса",
    price: "—",
    href: "/energy-of-life",
    badge: "Лендинг"
  },
  {
    title: "Интенсив: Где мой ресурс?",
    subtitle: "Текущий лендинг интенсива",
    price: "—",
    href: "/intens",
    badge: "Лендинг"
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
    <div className="min-h-screen bg-[#050510] text-slate-50">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_80%_65%,rgba(168,85,247,0.16),transparent_45%),radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay [background-image:radial-gradient(1px_1px_at_10%_10%,#fff_100%,transparent),radial-gradient(1px_1px_at_30%_70%,#fff_100%,transparent),radial-gradient(1px_1px_at_80%_40%,#fff_100%,transparent)] [background-size:220px_220px]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/site" className="text-sm font-semibold tracking-wide text-white">
            Ирина Иваненко
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#states" className="hover:text-white">
              Состояния
            </a>
            <a href="#about" className="hover:text-white">
              Обо мне
            </a>
            <a href="#products" className="hover:text-white">
              Программы
            </a>
            <a href="#reviews" className="hover:text-white">
              Отзывы
            </a>
            <a href="#consult" className="hover:text-white">
              Консультация
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
                <a
                  href="#products"
                  className="rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-95"
                >
                  Выбрать программу
                </a>
                <a
                  href="#consult"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Бесплатная консультация
                </a>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4 text-sm text-slate-300 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-2xl font-semibold text-white">20</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">лет практики</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-2xl font-semibold text-white">6</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">программ</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-2xl font-semibold text-white">2</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">бесплатных марафона</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-cyan-500/20 via-purple-500/15 to-pink-500/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="aspect-[4/5] overflow-hidden rounded-[32px] border border-white/10">
                  <Image
                    src="/irina1.jpg"
                    alt="Ирина Иваненко"
                    width={900}
                    height={1100}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <div className="mt-4 grid gap-2 rounded-3xl border border-white/10 bg-black/30 p-4">
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
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Боль</div>
                  <div className="mt-3 text-lg font-semibold text-white">Кризис</div>
                  <div className="mt-2 text-slate-300">По-старому не хочу, по-новому не знаю как.</div>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Боль</div>
                  <div className="mt-3 text-lg font-semibold text-white">Поиск себя</div>
                  <div className="mt-2 text-slate-300">Не знаю кто я и чем мне заниматься.</div>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur md:col-span-2">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Результат</div>
                  <div className="mt-3 text-lg font-semibold text-white">Спокойствие и ясность</div>
                  <div className="mt-2 text-slate-300">
                    Возвращается способность видеть суть, принимать решения и действовать без внутренней борьбы.
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
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
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
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
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur md:col-span-2">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Метод</div>
                  <div className="mt-3 text-lg font-semibold text-white">Состояние → ясность → действие</div>
                  <div className="mt-2 text-slate-300">
                    Мы не “чинем симптомы”. Мы возвращаем опору и настраиваем внутренние процессы так, чтобы решения были
                    естественными.
                  </div>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Фокус</div>
                  <div className="mt-3 text-lg font-semibold text-white">Целостность</div>
                  <div className="mt-2 text-slate-300">Интеграция опыта в реальную жизнь.</div>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Формат</div>
                  <div className="mt-3 text-lg font-semibold text-white">Практики</div>
                  <div className="mt-2 text-slate-300">Видео, аудио, тексты, домашние задания.</div>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur md:col-span-2">
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
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20"
              >
                <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-500/10 to-pink-500/10 blur-2xl transition group-hover:opacity-90" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-lg font-semibold text-white">{p.title}</div>
                    {p.badge ? (
                      <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-slate-200">
                        {p.badge}
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-2 text-sm text-slate-300">{p.subtitle}</div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-slate-400">Стоимость</div>
                    <div className="text-base font-semibold text-white">{p.price}</div>
                  </div>
                  <div className="mt-6 text-sm font-semibold text-cyan-200">Подробнее →</div>
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
              <div key={r.name} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
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
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
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
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
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

      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Ирина Иваненко</div>
              <div className="mt-2 text-sm text-slate-400">Осознанность · медитация · работа с состоянием</div>
            </div>
            <div className="grid gap-2 text-sm text-slate-300">
              <Link href="/about" className="hover:text-white">
                Обо мне
              </Link>
              <Link href="/products" className="hover:text-white">
                Программы
              </Link>
              <Link href="/blog" className="hover:text-white">
                Статьи
              </Link>
              <Link href="/reviews" className="hover:text-white">
                Отзывы
              </Link>
            </div>
            <div className="text-sm text-slate-300">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Контакты</div>
              <div className="mt-2">
                <a className="hover:text-white" href="https://t.me/irina_ivanenko11" target="_blank" rel="noreferrer">
                  Telegram: @irina_ivanenko11
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

