import { CheckCircle, Sliders, User } from "lucide-react";

const AuthorSection = () => {
  return (
    <section id="author" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-5xl p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
          {/* Text Content */}
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight text-foreground uppercase tracking-tight">
              Кто ведет <br />
              <span className="gradient-text">интенсив?</span>
            </h2>

            <p className="text-muted-foreground/80 text-lg mb-8 font-light leading-relaxed">
              Эксперт по личной эффективности и управлению состоянием. Более 7
              лет помогаю предпринимателям и топ-менеджерам находить баланс и
              расти без выгорания.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1 uppercase tracking-wider">
                    500+ учеников
                  </h4>
                  <p className="text-xs text-muted-foreground font-light leading-snug">
                    Прошли через авторские программы и изменили жизнь.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1 uppercase tracking-wider">
                    7 лет практики
                  </h4>
                  <p className="text-xs text-muted-foreground font-light leading-snug">
                    В теме психологии достижений и биохакинга.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground italic font-light">
              «Моя задача — дать вам не теорию, а реальные инструменты, которые
              работают уже сегодня.»
            </div>
          </div>

          {/* Author Image Placeholder */}
          <div className="w-full lg:w-[450px] relative">
            <div className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%] bg-gradient-radial from-secondary/20 to-transparent rounded-full -z-10" />
            <div className="aspect-[4/5] rounded-4xl bg-gradient-to-b from-foreground/10 to-transparent border border-foreground/10 flex items-center justify-center overflow-hidden relative">
              {/* Placeholder for Photo */}
              <div className="text-center p-8">
                <User className="w-20 h-20 text-foreground/20 mx-auto mb-4" />
                <p className="text-foreground/30 font-bold uppercase tracking-widest text-xs italic">
                  Фото эксперта
                </p>
              </div>
              {/* Name Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-2xl border-foreground/20">
                <p className="text-foreground font-black text-xl tracking-tight uppercase">
                  Имя Эксперта
                </p>
                <p className="text-primary text-[10px] font-bold uppercase tracking-widest">
                  Автор программы
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
