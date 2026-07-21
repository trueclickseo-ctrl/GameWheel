import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WheelSpinner from "@/components/WheelSpinner";
import { LANGUAGES } from "@/i18n/languages";
import { getDictionary } from "@/i18n/dictionaries";
import { Sparkles, HelpCircle, Shield, ArrowRight, BookOpen, GraduationCap, History, Calculator, Cpu, Bookmark } from "lucide-react";
import Link from "next/link";

// 1. Automatically collect all static internal app routes
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
    title: `${pathStr.toUpperCase()} | GameWheelClub ${langObj?.nativeName || ""}`,
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

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-sans text-right" : ""}>
      <Navbar currentLang={lang} />

      <main className="flex-1 max-w-6xl mx-auto w-full py-12 px-6">
        {/* Breadcrumb Header */}
        <div className="mb-6 text-sm font-bold opacity-80 flex items-center gap-2">
          <Link href={`/${lang}/`} className="hover:underline text-retro-orange">
            {dict.navHome}
          </Link>
          <span>/</span>
          <span className="uppercase tracking-wider">{pathStr}</span>
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

        {/* Content Section: Render Interactive Spinner for Tool Pages */}
        {pathStr.includes("wheel") || pathStr.includes("generator") || pathStr.includes("timer") || pathStr.includes("roller") || pathStr.includes("coin") ? (
          <section className="mb-16">
            <WheelSpinner storageKey={`gamewheelclub-${lang}-${pathStr.replace(/\//g, "-")}`} />
          </section>
        ) : (
          <section className="neo-card p-8 bg-white dark:bg-retro-navy mb-16 space-y-6">
            <h2 className="text-2xl font-black font-display">{dict.learnHub} — {pathStr}</h2>
            <p className="text-base font-medium opacity-90 leading-relaxed">
              Welcome to the localized {langObj?.nativeName || lang} section for {pathStr.replace(/-/g, " ")}. All random decision utilities and educational resources remain 100% private, client-side, and locally processed.
            </p>
            <p className="text-sm font-semibold opacity-80">{dict.privacyNotice}</p>
          </section>
        )}
      </main>

      <Footer currentLang={lang} />
    </div>
  );
}
