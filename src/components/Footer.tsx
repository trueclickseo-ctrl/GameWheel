export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full neo-border border-b-0 border-x-0 bg-cream dark:bg-retro-navy py-12 px-6 md:px-12 mt-auto transition-colors text-retro-navy dark:text-cream">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Branding */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5 font-display text-2xl font-black">
            <img 
              src="/logo.jpg" 
              alt="GameWheelClub Logo" 
              className="w-8 h-8 rounded border-2 border-retro-navy dark:border-cream object-cover"
            />
            <span>Game<span className="text-retro-orange">Wheel</span>Club</span>
          </div>
          <p className="text-sm font-semibold max-w-sm opacity-80 leading-relaxed">
            Fast, accessible, and neobrutalist-designed decision wheels, randomizers, and productivity timers. Settle choices instantly.
          </p>
        </div>

        {/* Use Cases */}
        <div className="flex flex-col gap-3">
          <h4 className="font-extrabold text-sm uppercase tracking-widest text-retro-navy/55 dark:text-cream/55">
            Use Cases
          </h4>
          <div className="flex flex-col gap-2 text-sm font-bold">
            <a href="/for-teachers" className="hover:text-retro-orange transition-colors">
              For Teachers
            </a>
            <a href="/for-business" className="hover:text-retro-orange transition-colors">
              For Business
            </a>
            <a href="/for-events" className="hover:text-retro-orange transition-colors">
              For Events
            </a>
          </div>
        </div>

        {/* Guides & Features */}
        <div className="flex flex-col gap-3">
          <h4 className="font-extrabold text-sm uppercase tracking-widest text-retro-navy/55 dark:text-cream/55">
            Guides & Info
          </h4>
          <div className="flex flex-col gap-2 text-sm font-bold">
            <a href="/guides/how-random-wheels-work" className="hover:text-retro-orange transition-colors">
              How Wheels Work
            </a>
            <a href="/guides/spin-wheel-psychology" className="hover:text-retro-orange transition-colors">
              Wheel Psychology
            </a>
            <a href="/features/weighted-wheel" className="hover:text-retro-orange transition-colors">
              Weighted Wheels
            </a>
            <a href="/features/elimination-mode" className="hover:text-retro-orange transition-colors">
              Elimination Mode
            </a>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="flex flex-col gap-3">
          <h4 className="font-extrabold text-sm uppercase tracking-widest text-retro-navy/55 dark:text-cream/55">
            Recent Blog
          </h4>
          <div className="flex flex-col gap-2 text-sm font-bold">
            <a href="/blog/spin-wheels-for-decision-making" className="hover:text-retro-orange transition-colors">
              Wheels for Decisions
            </a>
            <a href="/blog/party-games-for-adults" className="hover:text-retro-orange transition-colors">
              Party Games
            </a>
            <a href="/blog/spin-wheels-in-modern-education" className="hover:text-retro-orange transition-colors">
              Classroom Incentive
            </a>
            <a href="/blog/time-boxing-to-prevent-burnout" className="hover:text-retro-orange transition-colors">
              Avoid Burnout
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-retro-navy/10 dark:border-cream/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs font-semibold opacity-70 text-center md:text-left">
          &copy; {currentYear} GameWheelClub. All rights reserved. Zero-cookie locally computed utility.
        </p>

        <div className="flex gap-6 text-xs font-semibold">
          <a href="/about" className="hover:text-retro-orange transition-colors">
            About Us
          </a>
          <a href="/contact" className="hover:text-retro-orange transition-colors">
            Contact
          </a>
          <a href="/privacy" className="hover:text-retro-orange transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-retro-orange transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
