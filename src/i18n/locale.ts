import { isLocale, localeCookie, matchLocale, type Locale } from "./config";

const cookiePattern = new RegExp(`(?:^|;\\s*)${localeCookie}=([^;]*)`);
const oneYear = 60 * 60 * 24 * 365;

/** An explicit choice (cookie) wins over the browser's Accept-Language. */
export function preferredLocale(request: Request): Locale {
  const saved = cookiePattern.exec(request.headers.get("cookie") ?? "")?.[1];
  return isLocale(saved) ? saved : matchLocale(request.headers.get("accept-language") ?? undefined);
}

export function persistLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=${oneYear}; samesite=lax`;
}
