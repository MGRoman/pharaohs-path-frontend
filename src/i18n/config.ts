export const locales = ["ru", "en", "ar"] as const;
export type Locale = (typeof locales)[number];
export type Direction = "ltr" | "rtl";

export const defaultLocale: Locale = "ru";
export const localeCookie = "locale";

export const localeMeta: Record<Locale, { label: string; dir: Direction; intl: string }> = {
  ru: { label: "Русский", dir: "ltr", intl: "ru-RU" },
  en: { label: "English", dir: "ltr", intl: "en-GB" },
  ar: { label: "العربية", dir: "rtl", intl: "ar-EG" },
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Picks the best supported locale from an Accept-Language style list. */
export function matchLocale(header: string | undefined): Locale {
  const ranked = (header ?? "")
    .split(",")
    .map((part) => {
      const [tag = "", q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q === undefined ? 1 : Number(q) };
    })
    .sort((a, b) => b.q - a.q);
  for (const { lang } of ranked) if (isLocale(lang)) return lang;
  return defaultLocale;
}
