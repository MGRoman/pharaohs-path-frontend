import { describe, expect, it } from "vitest";
import { preferredLocale } from "./locale";
import { createLocaleRewrite, localeFromHref, localizeHref, splitLocale } from "./routing";

const rewrite = (href: string, step: "input" | "output", instance = createLocaleRewrite()) => {
  const url = new URL(href, "http://localhost");
  const result = instance[step]?.({ url });
  return result instanceof URL ? result.pathname : result;
};

describe("locale routing", () => {
  it("strips only non-default locale prefixes", () => {
    expect(splitLocale("/en/tours")).toEqual({ locale: "en", pathname: "/tours", prefixed: true });
    expect(splitLocale("/ar")).toEqual({ locale: "ar", pathname: "/", prefixed: true });
    expect(splitLocale("/tours")).toEqual({ locale: "ru", pathname: "/tours", prefixed: false });
    expect(splitLocale("/english")).toMatchObject({ locale: "ru", prefixed: false });
  });

  it("switches locale while keeping the path, query and hash", () => {
    expect(localizeHref("/en/tours?region=luxor#top", "ar")).toBe("/ar/tours?region=luxor#top");
    expect(localizeHref("/ar/tours/grand-egypt", "ru")).toBe("/tours/grand-egypt");
    expect(localizeHref("/", "en")).toBe("/en");
    expect(localeFromHref("/ar/blog?x=1")).toBe("ar");
  });

  it("round-trips through the router rewrite", () => {
    const instance = createLocaleRewrite();
    expect(rewrite("/en/tours/grand-egypt", "input", instance)).toBe("/tours/grand-egypt");
    expect(rewrite("/about", "output", instance)).toBe("/en/about");
    expect(rewrite("/", "output", instance)).toBe("/en");
  });

  it("prefers the saved choice over Accept-Language", () => {
    const request = (headers: Record<string, string>) =>
      new Request("http://localhost/", { headers });
    expect(preferredLocale(request({ "accept-language": "ar-EG,ar;q=0.9" }))).toBe("ar");
    expect(preferredLocale(request({ cookie: "locale=ru", "accept-language": "en" }))).toBe("ru");
    expect(preferredLocale(request({}))).toBe("ru");
  });
});
