const HeroSection = () => {
  return <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-12 animate-pulse">
        Старт 8 января • Бесплатно
      </div>

      <h1 className="text-5xl md:text-[110px] font-black leading-[0.9] tracking-tighter mb-10 text-foreground">
        ГДЕ МОЙ <br />
        <span className="gradient-text text-glow-purple">РЕСУРС?</span>
      </h1>

      <p className="text-muted-foreground text-lg md:text-2xl max-w-3xl mb-16 font-light leading-relaxed">
        Пошаговый 3-дневный практикум по восполнению энергии.{" "}
        <br className="hidden md:block" /> Узнайте, как перестать уставать и
        начать жить на полную.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <a href="#register" className="btn-gradient px-12 py-6 rounded-2xl text-foreground font-black text-xl uppercase tracking-widest">
          Присоединиться к группе
        </a>
        <div className="text-left border-l border-foreground/10 pl-6">
          <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">
            Дата начала
          </p>
          <p className="text-xl font-bold text-foreground">8 января / 11:00</p>
        </div>
      </div>
    </section>;
};
export default HeroSection;