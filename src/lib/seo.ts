import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/routing";

/** Search engines require absolute alternates; without it (local dev) URLs stay relative. */
const siteUrl = (import.meta.env.VITE_SITE_URL ?? "").replace(/\/$/, "");

type SeoOptions = {
  locale: Locale;
  title: string;
  description: string;
  /** Locale-agnostic route path, e.g. `/tours/grand-egypt`. */
  path: string;
  type?: "website" | "article" | "product";
  image?: string;
};

export function seo({ locale, title, description, path, type = "website", image }: SeoOptions) {
  const url = (target: Locale) => siteUrl + localizePath(path, target);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url(locale) },
      ...(image ? [{ property: "og:image", content: image }] : []),
    ],
    links: [
      { rel: "canonical", href: url(locale) },
      ...locales.map((target) => ({ rel: "alternate", hrefLang: target, href: url(target) })),
      { rel: "alternate", hrefLang: "x-default", href: url(defaultLocale) },
    ],
  };
}
