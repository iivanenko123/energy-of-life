const EnergyDescription = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-foreground uppercase tracking-tight leading-tight">
            4 типа энергии, без которых{" "}
            <span className="gradient-text">жизнь перестаёт радовать</span>
          </h2>
        </div>

        <div className="glass-card rounded-4xl p-8 md:p-12 space-y-8">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Энергия нужна всем.
            </p>
            <p className="text-muted-foreground text-lg font-light">
              Не «когда-нибудь потом», а прямо сейчас.
            </p>
          </div>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />

          <div className="space-y-6 text-lg leading-relaxed">
            <p className="text-muted-foreground font-light">
              <span className="text-foreground font-semibold">Когда энергия есть</span> — ты
              чувствуешь опору внутри, ясность, интерес к жизни, желание
              действовать.
            </p>
            <p className="text-muted-foreground font-light">
              <span className="text-foreground font-semibold">Когда её нет</span> — даже
              любимые дела становятся тяжёлыми, появляется усталость, тревога,
              апатия, ощущение, что «я не вывожу».
            </p>
          </div>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />

          <div className="text-center py-4">
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed">
              Но дело не в том, что у тебя мало энергии.
              <br />
              <span className="text-secondary">
                Чаще всего — ты просто берёшь её не из тех источников.
              </span>
            </p>
          </div>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />

          <div className="text-center pt-4">
            <p className="text-muted-foreground text-lg font-light mb-8">
              На этом 3-дневном интенсиве мы разберёмся:
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-3 justify-center">
                <span className="text-2xl">👉</span>
                <span className="text-foreground font-medium">
                  где именно твой ресурс
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <span className="text-2xl">👉</span>
                <span className="text-foreground font-medium">
                  какие типы энергии у тебя есть
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <span className="text-2xl">👉</span>
                <span className="text-foreground font-medium">
                  почему одни способы работают, а другие — нет
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnergyDescription;
