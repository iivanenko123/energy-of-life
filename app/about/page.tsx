import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Обо мне</div>
            <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Ирина Иваненко</h1>
            <div className="mt-3 text-slate-300">
              Преподаватель медитации и практик осознанности, инженер биомедицинских технологий.
            </div>
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

        <div className="mt-10 space-y-6 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
          <p className="text-slate-300">
            Уже 20 лет я исследую законы жизни, причинно-следственные связи и внутренние процессы человека. Я не предлагаю
            временных решений — я даю фундаментальные навыки для жизни и учу видеть суть вещей.
          </p>
          <p className="text-slate-300">
            Мой подход — переводить язык тонких ощущений в чёткие, понятные алгоритмы. Мы начинаем с состояния: спокойствия,
            ясности, опоры на себя. И только потом выстраиваем действия и решения, которые реально работают в материальной жизни.
          </p>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200">
            «По-старому не хочу, по-новому не знаю как» — это не тупик. Это переход. И его можно пройти мягко и глубоко.
          </div>
        </div>
      </div>
    </div>
  );
}

