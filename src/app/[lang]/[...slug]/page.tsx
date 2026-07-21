import { LANGUAGES } from "@/i18n/languages";
import LocalizedSlugClient from "./client";

const ALL_INTERNAL_ROUTES = [
  "about", "contact", "privacy", "terms", "games", "templates", "learn",
  "learn/encyclopedia", "learn/history-of-the-wheel", "learn/math-behind-random-wheels",
  "learn/science-of-decision-making", "learn/probability-statistics",
  "wheel-of-names", "decision-wheel", "yes-no-wheel", "random-number-generator",
  "flip-a-coin", "dice-roller", "timer", "blog", "for-teachers", "for-business",
  "for-events", "animal-wheels", "anime-fandom-wheels", "character-creator",
  "creative-wheels", "food-wheels", "generators", "geography-wheels", "guides",
  "party-games", "sports-wheels", "video-game-wheels",
];

export function generateStaticParams() {
  const params: { lang: string; slug: string[] }[] = [];
  for (const lang of LANGUAGES.filter((l) => l.code !== "en")) {
    for (const route of ALL_INTERNAL_ROUTES) {
      params.push({ lang: lang.code, slug: route.split("/") });
    }
  }
  return params;
}

export default function LocalizedSlugPage() {
  return <LocalizedSlugClient />;
}
