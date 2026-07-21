import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WheelSpinner from "@/components/WheelSpinner";
import CoinFlipper from "@/components/CoinFlipper";
import DiceRoller from "@/components/DiceRoller";
import NumberGenerator from "@/components/NumberGenerator";
import CountdownTimer from "@/components/CountdownTimer";
import { LANGUAGES } from "@/i18n/languages";
import { getDictionary } from "@/i18n/dictionaries";
import { Sparkles, HelpCircle, Shield, ArrowRight, BookOpen, GraduationCap, History, Calculator, Cpu, ShieldCheck } from "lucide-react";
import Link from "next/link";

const ALL_INTERNAL_ROUTES = [
  "about",
  "contact",
  "games",
  "templates",
  "learn",
  "learn/encyclopedia",
  "learn/history-of-the-wheel",
  "learn/math-behind-random-wheels",
  "learn/science-of-decision-making",
  "learn/probability-statistics",
  "wheel-of-names",
  "decision-wheel",
  "yes-no-wheel",
  "random-number-generator",
  "flip-a-coin",
  "dice-roller",
  "timer",
  "blog",
  "for-teachers",
  "for-business",
  "for-events",
  "privacy",
  "terms",
  "animal-wheels",
  "anime-fandom-wheels",
  "character-creator",
  "creative-wheels",
  "food-wheels",
  "generators",
  "geography-wheels",
  "guides",
  "party-games",
  "sports-wheels",
  "video-game-wheels",
];

export function generateStaticParams() {
  const params: { lang: string; slug: string[] }[] = [];
  const nonEnglishLangs = LANGUAGES.filter((l) => l.code !== "en");

  for (const lang of nonEnglishLangs) {
    for (const route of ALL_INTERNAL_ROUTES) {
      params.push({
        lang: lang.code,
        slug: route.split("/"),
      });
    }
  }

  return params;
}

interface LocalizedSlugPageProps {
  params: Promise<{
    lang: string;
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: LocalizedSlugPageProps) {
  const { lang, slug } = await params;
  const pathStr = slug.join("/");
  const dict = getDictionary(lang);
  const langObj = LANGUAGES.find((l) => l.code === lang);

  return {
    title: `${pathStr.replace(/-/g, " ").toUpperCase()} | GameWheelClub ${langObj?.nativeName || ""}`,
    description: `${dict.heroSubtitle} - ${pathStr}`,
    alternates: {
      canonical: `https://gamewheelclub.com/${lang}/${pathStr}/`,
    },
  };
}

export default async function LocalizedSlugPage({ params }: LocalizedSlugPageProps) {
  const { lang, slug } = await params;
  const pathStr = slug.join("/");
  const dict = getDictionary(lang);
  const langObj = LANGUAGES.find((l) => l.code === lang);
  const isRtl = langObj?.dir === "rtl";
  const langPrefix = lang === "en" ? "" : `/${lang}`;

  // Helper to render interactive tools correctly
  const renderToolComponent = () => {
    switch (pathStr) {
      case "flip-a-coin":
        return <CoinFlipper />;
      case "dice-roller":
        return <DiceRoller />;
      case "random-number-generator":
        return <NumberGenerator />;
      case "timer":
        return <CountdownTimer />;
      case "yes-no-wheel":
        return (
          <WheelSpinner
            initialOptions={["Yes", "No", "Yes", "No", "Yes", "No"]}
            storageKey={`gamewheelclub-${lang}-yes-no`}
          />
        );
      case "wheel-of-names":
        return (
          <WheelSpinner
            initialOptions={["Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason"]}
            storageKey={`gamewheelclub-${lang}-names`}
          />
        );
      case "decision-wheel":
        return (
          <WheelSpinner
            initialOptions={["Option A", "Option B", "Option C", "Option D"]}
            storageKey={`gamewheelclub-${lang}-decision`}
          />
        );
      default:
        return (
          <WheelSpinner
            storageKey={`gamewheelclub-${lang}-${pathStr.replace(/\//g, "-")}`}
          />
        );
    }
  };

  // Helper to render Learn Pillar content
  const renderLearnPillars = () => {
    const pillars = [
      {
        title: "1. History of the Wheel",
        href: `${langPrefix}/learn/history-of-the-wheel`,
        icon: History,
        color: "bg-retro-yellow",
        description: "From Athenian sortition and Boethius' Rota Fortunae to Pascal's roulette experiments and modern digital wheel spinners.",
      },
      {
        title: "2. The Math Behind It",
        href: `${langPrefix}/learn/math-behind-random-wheels`,
        icon: Calculator,
        color: "bg-retro-mint",
        description: "Understand probability equations, weighted distributions, expected value, and the 1654 Pascal-Fermat correspondence.",
      },
      {
        title: "3. Science of Decision Making",
        href: `${langPrefix}/learn/science-of-decision-making`,
        icon: Cpu,
        color: "bg-retro-blue",
        description: "How PRNG algorithms work, Web Crypto APIs, decision fatigue psychology, and how outsourcing choices reduces anxiety.",
      },
      {
        title: "4. Wheel Game Encyclopedia",
        href: `${langPrefix}/learn/encyclopedia`,
        icon: BookOpen,
        color: "bg-retro-orange",
        description: "Complete A-Z glossary of decision wheel terminology, sortition, PRNGs, weighted options, and random seed theory.",
      },
      {
        title: "5. Probability & Stats Education",
        href: `${langPrefix}/learn/probability-statistics`,
        icon: GraduationCap,
        color: "bg-purple-300",
        description: "Classroom teaching hub featuring Chi-Square goodness-of-fit case studies, formulas, and teacher lesson plans.",
      },
    ];

    return (
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <a
                key={p.href}
                href={p.href}
                className="neo-card neo-card-hover p-6 bg-white dark:bg-retro-navy flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl neo-border ${p.color} flex items-center justify-center text-retro-navy mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-black font-display mb-3 text-retro-navy dark:text-cream group-hover:text-retro-orange transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-sm font-medium opacity-80 leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-retro-orange">
                  <span>Explore Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  const isTool = ["flip-a-coin", "dice-roller", "random-number-generator", "timer", "yes-no-wheel", "wheel-of-names", "decision-wheel"].includes(pathStr);
  const isLearnHub = pathStr === "learn";
  const isHistoryPage = pathStr === "learn/history-of-the-wheel";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-sans text-right" : ""}>
      <Navbar currentLang={lang} />

      <main className="flex-1 max-w-6xl mx-auto w-full py-12 px-6">
        {/* Breadcrumb Header */}
        <div className="mb-6 text-sm font-bold opacity-80 flex items-center gap-2">
          <a href={`${langPrefix}/`} className="hover:underline text-retro-orange">
            {dict.navHome}
          </a>
          <span>/</span>
          <span className="uppercase tracking-wider">{pathStr.replace(/-/g, " ")}</span>
        </div>

        {/* Page Header */}
        <section className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neo-border bg-retro-yellow text-retro-navy font-bold text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            {dict.heroTagline}
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-retro-navy dark:text-cream mb-4 capitalize">
            {pathStr.replace(/-/g, " ")}
          </h1>
          <p className="text-lg font-medium opacity-90 leading-relaxed max-w-3xl">
            {dict.heroSubtitle}
          </p>
        </section>

        {/* Content Body */}
        {isTool ? (
          <section className="mb-16">
            {renderToolComponent()}
          </section>
        ) : isLearnHub ? (
          <section className="mb-16">
            {renderLearnPillars()}
          </section>
        ) : isHistoryPage ? (
          <article className="prose dark:prose-invert max-w-none neo-card p-8 bg-white dark:bg-retro-navy mb-16 space-y-6">
            <h2 className="text-2xl font-black font-display">History of the Wheel</h2>
            <p>From ancient Athenian sortition and Boethius&apos; Rota Fortunae to Pascal&apos;s roulette and modern PRNG wheel generators.</p>

            <div className="bg-cream dark:bg-retro-navy/50 p-6 rounded-lg neo-border text-sm">
              <h3 className="font-bold flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-retro-mint" /> References & Historical Sources
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-xs font-bold">
                <li>
                  <a href="https://www.britannica.com/topic/sortition" target="_blank" rel="noopener noreferrer" className="text-retro-orange hover:underline">
                    Britannica Encyclopedia: Sortition & Ancient Democracy
                  </a>
                </li>
                <li>
                  <a href="https://www.gutenberg.org/ebooks/14328" target="_blank" rel="noopener noreferrer" className="text-retro-orange hover:underline">
                    Boethius (c. 524 AD): The Consolation of Philosophy
                  </a>
                </li>
                <li>
                  <a href="https://www.cambridge.org/core/books/abs/emergence-of-probability/contents/0E71A25BFC6053A80B6746EC8A76D70E" target="_blank" rel="noopener noreferrer" className="text-retro-orange hover:underline">
                    Ian Hacking (1975): The Emergence of Probability, Cambridge University Press
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Kleroterion" target="_blank" rel="noopener noreferrer" className="text-retro-orange hover:underline">
                    Wikipedia: Kleroterion & Rota Fortunae
                  </a>
                </li>
              </ul>
            </div>
          </article>
        ) : (
          <section className="neo-card p-8 bg-white dark:bg-retro-navy mb-16 space-y-6">
            <h2 className="text-2xl font-black font-display capitalize">{pathStr.replace(/-/g, " ")}</h2>
            <p className="text-base font-medium opacity-90 leading-relaxed">
              Localized guide and decision utility for {pathStr.replace(/-/g, " ")} in {langObj?.nativeName || lang}. All data processing is client-side and 100% private.
            </p>
            <div className="pt-4 border-t border-retro-navy/10 dark:border-cream/10">
              {renderToolComponent()}
            </div>
          </section>
        )}
      </main>

      <Footer currentLang={lang} />
    </div>
  );
}
