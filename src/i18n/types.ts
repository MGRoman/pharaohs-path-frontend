import type { ArticleId, FaqId, GalleryId, TestimonialId, TourId } from "@/data/content";
import type { ru } from "./messages/ru";

export type PluralCategory = "zero" | "one" | "two" | "few" | "many" | "other";
export type PluralForms = Partial<Record<PluralCategory, string>> & { other: string };

type Shape<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends PluralForms
      ? PluralForms
      : Shape<T[K]>;
};

/** Every locale mirrors the Russian source shape; plural forms vary per language. */
export type Messages = Shape<typeof ru>;

type Paths<T, Leaf, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string | PluralForms
    ? T[K] extends Leaf
      ? `${Prefix}${K}`
      : never
    : Paths<T[K], Leaf, `${Prefix}${K}.`>;
}[keyof T & string];

export type MessageKey = Paths<Messages, string | PluralForms>;
export type PluralKey = Paths<Messages, PluralForms>;

export type MessageParams = Record<string, string | number>;
export type TranslateArgs<K extends MessageKey> = K extends PluralKey
  ? [params: MessageParams & { count: number }]
  : [params?: MessageParams];

export type ContentMessages = {
  tours: Record<
    TourId,
    {
      title: string;
      description: string;
      itinerary: readonly (readonly [title: string, detail: string])[];
    }
  >;
  included: readonly string[];
  excluded: readonly string[];
  packing: readonly string[];
  gallery: Record<GalleryId, string>;
  testimonials: Record<TestimonialId, { name: string; city: string; text: string }>;
  articles: Record<ArticleId, { title: string; excerpt: string; body: readonly string[] }>;
  faq: Record<FaqId, { question: string; answer: string }>;
};
