export interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  tier: "A" | "B" | "C";
}

export const LANGUAGES: Language[] = [
  // Tier A (First Rollout)
  { code: "en", name: "English", nativeName: "English", dir: "ltr", tier: "A" },
  { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr", tier: "A" },
  { code: "pt", name: "Portuguese", nativeName: "Português", dir: "ltr", tier: "A" },
  { code: "fr", name: "French", nativeName: "Français", dir: "ltr", tier: "A" },
  { code: "de", name: "German", nativeName: "Deutsch", dir: "ltr", tier: "A" },
  { code: "ja", name: "Japanese", nativeName: "日本語", dir: "ltr", tier: "A" },
  { code: "zh", name: "Chinese (Simplified)", nativeName: "简体中文", dir: "ltr", tier: "A" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", tier: "A" },
  { code: "ru", name: "Russian", nativeName: "Русский", dir: "ltr", tier: "A" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", dir: "ltr", tier: "A" },

  // Tier B (Second Rollout)
  { code: "ko", name: "Korean", nativeName: "한국어", dir: "ltr", tier: "B" },
  { code: "it", name: "Italian", nativeName: "Italiano", dir: "ltr", tier: "B" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", dir: "ltr", tier: "B" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", dir: "ltr", tier: "B" },
  { code: "pl", name: "Polish", nativeName: "Polski", dir: "ltr", tier: "B" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", dir: "ltr", tier: "B" },
  { code: "th", name: "Thai", nativeName: "ไทย", dir: "ltr", tier: "B" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", dir: "ltr", tier: "B" },

  // Tier C (Later Rollout)
  { code: "cs", name: "Czech", nativeName: "Čeština", dir: "ltr", tier: "C" },
  { code: "ro", name: "Romanian", nativeName: "Română", dir: "ltr", tier: "C" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", dir: "ltr", tier: "C" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", dir: "ltr", tier: "C" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", dir: "ltr", tier: "C" },
  { code: "da", name: "Danish", nativeName: "Dansk", dir: "ltr", tier: "C" },
  { code: "fi", name: "Finnish", nativeName: "Suomi", dir: "ltr", tier: "C" },
  { code: "no", name: "Norwegian", nativeName: "Norsk", dir: "ltr", tier: "C" },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski", dir: "ltr", tier: "C" },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina", dir: "ltr", tier: "C" },
  { code: "bg", name: "Bulgarian", nativeName: "Български", dir: "ltr", tier: "C" },
];
