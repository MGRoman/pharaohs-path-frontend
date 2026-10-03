import type { LocationRewrite } from "@tanstack/react-router";
import { defaultLocale, isLocale, type Locale } from "./config";

/**
 * URL strategy ("as-needed" prefix): the default locale lives at `/tours`,
 * every other locale under its own prefix, e.g. `/en/tours`, `/ar/tours`.
 */
export function splitLocale(pathname: string): {
  locale: Locale;
  pathname: string;
  prefixed: boolean;
} {
  const [, first, ...rest] = pathname.split("/");
  if (isLocale(first) && first !== defaultLocale) {
    return { locale: first, pathname: `/${rest.join("/")}`, prefixed: true };
  }
  return { locale: defaultLocale, pathname, prefixed: false };
}

export function localizePath(pathname: string, locale: Locale): string {
  const bare = splitLocale(pathname).pathname;
  if (locale === defaultLocale) return bare;
  return bare === "/" ? `/${locale}` : `/${locale}${bare}`;
}

/** Same as `localizePath`, but keeps the query string and hash of a full href. */
export function localizeHref(href: string, locale: Locale): string {
  const index = href.search(/[?#]/);
  const pathname = index === -1 ? href : href.slice(0, index);
  const rest = index === -1 ? "" : href.slice(index);
  return localizePath(pathname, locale) + rest;
}

export const localeFromHref = (href: string): Locale =>
  splitLocale(new URL(href, "http://localhost").pathname).locale;

/**
 * Route files stay locale-agnostic: the prefix is stripped before matching and
 * re-applied to every generated href. One instance per router, i.e. per request on
 * the server, so the remembered locale never leaks between requests.
 */
export function createLocaleRewrite(): LocationRewrite {
  let current: Locale = defaultLocale;
  return {
    input: ({ url }) => {
      const { locale, pathname } = splitLocale(url.pathname);
      current = locale;
      url.pathname = pathname;
      return url;
    },
    output: ({ url }) => {
      url.pathname = localizePath(url.pathname, current);
      return url;
    },
  };
}
