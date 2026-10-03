import { localeMeta, type Locale } from "./config";
import { ar } from "./messages/ar";
import { en } from "./messages/en";
import { ru } from "./messages/ru";
import type { MessageKey, MessageParams, Messages, PluralForms, TranslateArgs } from "./types";

const messages: Record<Locale, Messages> = { ru, en, ar };

function createTranslator(locale: Locale) {
  const { dir, intl } = localeMeta[locale];
  const dictionary = messages[locale];
  const plurals = new Intl.PluralRules(intl);
  const numbers = new Intl.NumberFormat(intl);
  const ratings = new Intl.NumberFormat(intl, { minimumFractionDigits: 1 });
  const prices = new Intl.NumberFormat(intl, {
    style: "currency",
    currency: "RUB",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  });
  const dates = new Intl.DateTimeFormat(intl, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const lookup = (key: MessageKey) =>
    key
      .split(".")
      .reduce<unknown>((node, part) => (node as Record<string, unknown>)[part], dictionary) as
      string | PluralForms;

  const interpolate = (template: string, params: MessageParams = {}) =>
    template.replace(/\{(\w+)\}/g, (match, name: string) => {
      const value = params[name];
      if (value === undefined) return match;
      return typeof value === "number" ? numbers.format(value) : value;
    });

  function t<K extends MessageKey>(key: K, ...[params]: TranslateArgs<K>): string {
    const message = lookup(key);
    if (typeof message === "string") return interpolate(message, params);
    const count = Number(params?.["count"]);
    return interpolate(message[plurals.select(count)] ?? message.other, params);
  }

  return {
    locale,
    dir,
    intl,
    t,
    formatNumber: (value: number, options?: Intl.NumberFormatOptions) =>
      options ? new Intl.NumberFormat(intl, options).format(value) : numbers.format(value),
    formatPrice: (value: number) => prices.format(value),
    formatRating: (value: number) => ratings.format(value),
    /** Accepts calendar dates (YYYY-MM-DD) and keeps them stable across time zones. */
    formatDate: (isoDate: string) => dates.format(new Date(`${isoDate}T00:00:00Z`)),
  };
}

export type Translator = ReturnType<typeof createTranslator>;

const cache = new Map<Locale, Translator>();

export function getTranslator(locale: Locale): Translator {
  let translator = cache.get(locale);
  if (!translator) {
    translator = createTranslator(locale);
    cache.set(locale, translator);
  }
  return translator;
}
