const Header = () => {
  return <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-background/20 backdrop-blur-md border-b border-foreground/5">
      <div className="text-2xl font-black italic tracking-tighter text-foreground">ЭНЕРГИЯ ЖИЗНИ<span className="text-primary">ЖИЗНИ</span>
      </div>
      <div className="hidden md:flex space-x-8 text-sm font-semibold tracking-wide text-muted-foreground">
        <a href="#program" className="hover:text-foreground transition-colors">
          Программа
        </a>
        <a href="#author" className="hover:text-foreground transition-colors">
          Автор
        </a>
        <a href="#register" className="hover:text-foreground transition-colors">
          Присоединиться
        </a>
      </div>
      <a href="#register" className="px-6 py-2 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-all text-sm font-bold text-foreground">
        Вход
      </a>
    </nav>;
};
export default Header;