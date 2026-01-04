import { Zap, Lightbulb, Heart } from "lucide-react";

const programDays = [
  {
    number: "01",
    title: "1 урок",
    description:
      "Разбираем физический, эмоциональный, ментальный и духовный уровни. Ищем, куда уходят ваши силы.",
    tag: "Диагностика утечек",
    icon: Zap,
    colorClass: "primary",
    bgClass: "bg-primary/20",
    textClass: "text-primary",
    dotClass: "bg-primary",
  },
  {
    number: "02",
    title: "2 урок",
    description:
      "Практики для ясности ума. Техники «быстрого включения» и способы борьбы с инфо-шумом.",
    tag: "Техники здесь и сейчас",
    icon: Lightbulb,
    colorClass: "secondary",
    bgClass: "bg-secondary/20",
    textClass: "text-secondary",
    dotClass: "bg-secondary",
  },
  {
    number: "03",
    title: "3 урок",
    description:
      "Связь эмоций и количества сил. Как чувства влияют на продуктивность. План внедрения техник.",
    tag: "Подведение итогов",
    icon: Heart,
    colorClass: "accent",
    bgClass: "bg-accent/20",
    textClass: "text-accent",
    dotClass: "bg-accent",
  },
];

const ProgramSection = () => {
  return (
    <section id="program" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-foreground uppercase tracking-tight">
            Программа обучения
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programDays.map((day) => {
            const IconComponent = day.icon;
            return (
              <div
                key={day.number}
                className="glass-card p-10 rounded-4xl relative overflow-hidden group"
              >
                <span className="step-number text-7xl font-black absolute top-4 right-8 opacity-20 group-hover:opacity-40 transition-opacity italic">
                  {day.number}
                </span>
                <div
                  className={`w-14 h-14 rounded-2xl ${day.bgClass} flex items-center justify-center mb-8`}
                >
                  <IconComponent className={`w-8 h-8 ${day.textClass}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight text-foreground">
                  {day.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                  {day.description}
                </p>
                <div
                  className={`text-xs font-bold ${day.textClass} flex items-center gap-2`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${day.dotClass}`}
                  />
                  {day.tag}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
