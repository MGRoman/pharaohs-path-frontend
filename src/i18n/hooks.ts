import { useRouteContext } from "@tanstack/react-router";
import type { Locale } from "./config";
import { getContent } from "./content";
import { getTranslator } from "./translator";

export function useLocale(): Locale {
  return useRouteContext({ from: "__root__", select: (context) => context.locale });
}

export function useTranslate() {
  return getTranslator(useLocale());
}

export function useContent() {
  return getContent(useLocale());
}
