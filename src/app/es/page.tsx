import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WheelSpinner from "@/components/WheelSpinner";
import { Sparkles, HelpCircle, Shield, Award } from "lucide-react";
import { DICTIONARIES } from "@/i18n/dictionaries";

export const metadata = {
  title: "Gira la Ruleta de Decisiones | GameWheelClub Español",
  description: "Gira la ruleta de decisiones aleatorias para tomar elecciones instantáneas. Gratis, justa y rápida.",
};

export default function SpanishHomePage() {
  const dict = DICTIONARIES.es;

  return (
    <>
      <Navbar currentLang="es" />

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
          <WheelSpinner storageKey="gamewheelclub-es-wheel" />
        </section>

        {/* Informational Copy */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16 border-t-3 border-retro-navy dark:border-cream pt-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-black font-display mb-4">
              ¿Por qué usar una ruleta aleatoria?
            </h2>
            <div className="prose dark:prose-invert font-medium text-base space-y-4">
              <p>
                La fatiga de decisión es real. Desde elegir qué cenar hasta seleccionar a un ganador en el aula o un sorteo, tomar decisiones puede agotar tu energía.
              </p>
              <p>
                Una ruleta de decisiones es una forma visual e imparcial de elegir sin sesgos.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-black font-display mb-4">
              Privacidad Garantizada
            </h2>
            <div className="prose dark:prose-invert font-medium text-base space-y-4">
              <p>
                {dict.privacyNotice}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
