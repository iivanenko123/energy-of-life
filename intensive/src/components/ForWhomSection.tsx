import { Check } from "lucide-react";
const targetAudience = ["часто чувствуешь усталость, даже без очевидных причин", "живёшь на напряжении и «надо», а не из желания", "быстро выгораешь или теряешь интерес", "много отдаёшь другим, но себе — в последнюю очередь", "чувствуешь, что потенциал есть, а сил на его реализацию не хватает", "хочешь научиться жить из ресурса, а не выживать"];
const ForWhomSection = () => {
  return <section className="py-24 md:py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-foreground uppercase tracking-tight">
            Для кого этот{" "}
            <span className="gradient-text">интенсив</span>
          </h2>
          <p className="text-xl text-muted-foreground font-light">
            Этот интенсив для тебя, если ты:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-16">
          {targetAudience.map((item, index) => <div key={index} className="glass-card rounded-2xl p-6 flex items-start gap-4 group hover:border-primary/30 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <p className="text-foreground font-medium leading-relaxed">
                {item}
              </p>
            </div>)}
        </div>

        <div className="glass-card rounded-4xl p-8 md:p-12 text-center border-secondary/20">
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-4">Не важно, как ты привык справляться раньше.</p>
          <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed">
            Важно только одно —{" "}
            <span className="text-secondary">
              готовность честно посмотреть, где ты теряешь энергию и где она
              тебя ждёт.
            </span>
          </p>
        </div>
      </div>
    </section>;
};
export default ForWhomSection;