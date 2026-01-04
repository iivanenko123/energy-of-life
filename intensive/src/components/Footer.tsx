const Footer = () => {
  return <footer className="py-20 border-t border-foreground/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 text-foreground">
        <div>
          <div className="text-2xl font-black italic tracking-tighter mb-4 text-glow-blue">ЭНЕРГИЯ ЖИЗНИ<span className="text-primary">PRO</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs font-light">Авторские курсы развития осознанности </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-10 text-muted-foreground font-bold uppercase text-[10px] tracking-[0.3em]">
            <a href="#" className="hover:text-foreground transition-colors">
              Telegram
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              FAQ
            </a>
          </div>
          <div className="text-muted-foreground/50 text-[10px] uppercase font-bold tracking-widest">
            © 2025 All Rights Reserved
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;