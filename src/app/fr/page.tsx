import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WheelSpinner from "@/components/WheelSpinner";
import { Sparkles } from "lucide-react";
import { DICTIONARIES } from "@/i18n/dictionaries";

export const metadata = {
  title: "Tournez la Roue des Décisions | GameWheelClub Français",
  description: "Tournez la roue des décisions aléatoires pour faire des choix instantanés. Gratuit, équitable et rapide.",
};

export default function FrenchHomePage() {
  const dict = DICTIONARIES.fr;

  return (
    <>
      <Navbar currentLang="fr" />

      <main className="flex-1 max-w-6xl mx-auto w-full py-12 px-6">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neo-border bg-retro-yellow text-retro-navy font-bold text-xs uppercase tracking-wider mb-4 animate-bounce">
            <Sparkles className="w-4 h-4" />
            {dict.heroTagline}
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-retro-navy dark:text-cream mb-4">
            {dict.heroTitle}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
            {dict.heroSubtitle}
          </p>
        </section>

        {/* Wheel Spinner */}
        <section className="mb-16">
          <WheelSpinner storageKey="gamewheelclub-fr-wheel" />
        </section>
      </main>

      <Footer />
    </>
  );
}
