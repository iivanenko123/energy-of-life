import { Send } from "lucide-react";

const TelegramCTA = () => {
  return (
    <section id="register" className="py-40 px-6 relative overflow-hidden z-10">
      <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-primary/10 blur-[150px] -z-10 rounded-full" />

      <div className="max-w-4xl mx-auto glass-card p-12 md:p-24 rounded-5xl text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-8 text-foreground uppercase tracking-tight">
          Присоединиться к сообществу
        </h2>
        <p className="text-muted-foreground text-lg mb-12 font-light max-w-xl mx-auto">
          Вся основная движуха, ссылки на эфиры и полезные материалы интенсива
          будут публиковаться в нашей закрытой группе. Старт — 8 января.
        </p>

        <a
          href="https://t.me/your_group"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-col items-center gap-6 group"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary p-1 tg-glow shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
            <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
              <Send className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            </div>
          </div>
          <div className="btn-gradient px-12 py-5 rounded-2xl text-foreground font-black text-xl uppercase tracking-widest">
            Вступить в Telegram
          </div>
        </a>

        <p className="mt-12 text-muted-foreground text-xs font-medium tracking-wider italic">
          * Ссылка откроется в приложении Telegram
        </p>
      </div>
    </section>
  );
};

export default TelegramCTA;
