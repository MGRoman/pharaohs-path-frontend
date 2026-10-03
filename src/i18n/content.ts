import { articles, faqIds, gallery, testimonials, tours } from "@/data/content";
import type { Locale } from "./config";
import { ar } from "./content/ar";
import { en } from "./content/en";
import { ru } from "./content/ru";
import type { ContentMessages } from "./types";

const dictionaries: Record<Locale, ContentMessages> = { ru, en, ar };

function localize(locale: Locale) {
  const text = dictionaries[locale];

  const localizedTours = tours.map((tour) => {
    const { itinerary, ...copy } = text.tours[tour.id];
    return {
      ...tour,
      ...copy,
      itinerary: itinerary.map(([title, detail]) => ({ title, detail })),
      included: text.included,
      excluded: text.excluded,
      packing: text.packing,
    };
  });

  return {
    tours: localizedTours,
    gallery: gallery.map((item) => ({ ...item, title: text.gallery[item.id] })),
    testimonials: testimonials.map((item) => ({
      ...item,
      ...text.testimonials[item.id],
      tour: text.tours[item.tourId].title,
    })),
    articles: articles.map((article) => ({ ...article, ...text.articles[article.id] })),
    faq: faqIds.map((id) => ({ id, ...text.faq[id] })),
  };
}

export type LocalizedContent = ReturnType<typeof localize>;
export type LocalizedTour = LocalizedContent["tours"][number];
export type LocalizedArticle = LocalizedContent["articles"][number];

const cache = new Map<Locale, LocalizedContent>();

export function getContent(locale: Locale): LocalizedContent {
  let content = cache.get(locale);
  if (!content) {
    content = localize(locale);
    cache.set(locale, content);
  }
  return content;
}
