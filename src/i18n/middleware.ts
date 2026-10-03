import { createMiddleware } from "@tanstack/react-start";
import { defaultLocale } from "./config";
import { preferredLocale } from "./locale";
import { localizePath, splitLocale } from "./routing";

const redirectTo = (url: URL, status: 307 | 308) =>
  new Response(null, {
    status,
    headers: { location: url.pathname + url.search, vary: "Cookie, Accept-Language" },
  });

/**
 * Only document requests to unprefixed URLs are negotiated; prefixed URLs are
 * authoritative, so shared links and crawlers always get exactly what they asked for.
 */
export const localeMiddleware = createMiddleware().server(
  ({ request, pathname, handlerType, next }) => {
    const isDocument =
      handlerType === "router" &&
      request.method === "GET" &&
      (request.headers.get("accept") ?? "").includes("text/html");
    if (!isDocument) return next();

    const url = new URL(request.url);
    const [, first = ""] = pathname.split("/");

    if (first.toLowerCase() === defaultLocale) {
      url.pathname = pathname.slice(first.length + 1) || "/";
      return redirectTo(url, 308);
    }

    if (!splitLocale(pathname).prefixed) {
      const locale = preferredLocale(request);
      if (locale !== defaultLocale) {
        url.pathname = localizePath(pathname, locale);
        return redirectTo(url, 307);
      }
    }

    return next();
  },
);
