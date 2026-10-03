import giza from "@/assets/giza-hero.jpg";
import nile from "@/assets/nile.jpg";
import luxor from "@/assets/luxor.jpg";
import sea from "@/assets/red-sea.jpg";
import cairo from "@/assets/cairo.jpg";
import desert from "@/assets/desert.jpg";
import abu from "@/assets/abu-simbel.jpg";

export const images = { giza, nile, luxor, sea, cairo, desert, abu };

export const regions = [
  "cairo-giza",
  "luxor",
  "aswan",
  "sharm",
  "hurghada",
  "marsa-alam",
  "multi",
] as const;
export type Region = (typeof regions)[number];

export const tourTypes = ["history", "beach", "cruise", "adventure", "private"] as const;
export type TourType = (typeof tourTypes)[number];

export const galleryCategories = ["pyramids", "cairo", "luxor", "nile", "sea", "desert"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export const articleCategories = [
  "guide",
  "history",
  "tips",
  "sea",
  "routes",
  "inspiration",
] as const;
export type ArticleCategory = (typeof articleCategories)[number];

export const tours = [
  {
    id: "kair-giza",
    type: "history",
    region: "cairo-giza",
    days: 5,
    price: 89_000,
    rating: 4.9,
    image: giza,
    gallery: [giza, cairo, abu, luxor],
  },
  {
    id: "cruise-nile",
    type: "cruise",
    region: "multi",
    days: 7,
    price: 129_000,
    rating: 4.9,
    image: nile,
    gallery: [nile, luxor, abu, cairo],
  },
  {
    id: "sharm-el-sheikh",
    type: "beach",
    region: "sharm",
    days: 8,
    price: 74_000,
    rating: 4.8,
    image: sea,
    gallery: [sea, desert, nile, giza],
  },
  {
    id: "temples-desert",
    type: "adventure",
    region: "luxor",
    days: 8,
    price: 116_000,
    rating: 4.9,
    image: luxor,
    gallery: [luxor, desert, nile, abu],
  },
  {
    id: "egypt-for-two",
    type: "private",
    region: "multi",
    days: 9,
    price: 189_000,
    rating: 5,
    image: desert,
    gallery: [desert, nile, giza, sea],
  },
  {
    id: "grand-egypt",
    type: "history",
    region: "multi",
    days: 14,
    price: 224_000,
    rating: 4.9,
    image: abu,
    gallery: [abu, giza, luxor, nile, sea, desert],
  },
] as const satisfies readonly {
  id: string;
  type: TourType;
  region: Region;
  days: number;
  price: number;
  rating: number;
  image: string;
  gallery: readonly string[];
}[];
export type TourId = (typeof tours)[number]["id"];

export const gallery = [
  { id: "giza-dawn", image: giza, category: "pyramids" },
  { id: "cairo-stories", image: cairo, category: "cairo" },
  { id: "karnak-silence", image: luxor, category: "luxor" },
  { id: "great-river", image: nile, category: "nile" },
  { id: "sinai-reef", image: sea, category: "sea" },
  { id: "horizon", image: desert, category: "desert" },
  { id: "stone-eternity", image: abu, category: "luxor" },
  { id: "sunset-gold", image: giza, category: "pyramids" },
  { id: "under-sail", image: nile, category: "nile" },
] as const satisfies readonly { id: string; image: string; category: GalleryCategory }[];
export type GalleryId = (typeof gallery)[number]["id"];

export const testimonials = [
  { id: "anna", tourId: "cruise-nile" },
  { id: "mikhail-elena", tourId: "egypt-for-two" },
  { id: "maria", tourId: "kair-giza" },
  { id: "dmitry", tourId: "grand-egypt" },
  { id: "olga", tourId: "temples-desert" },
  { id: "irina", tourId: "sharm-el-sheikh" },
] as const satisfies readonly { id: string; tourId: TourId }[];
export type TestimonialId = (typeof testimonials)[number]["id"];

export const articles = [
  {
    id: "when-to-visit-egypt",
    category: "guide",
    date: "2026-09-12",
    image: desert,
  },
  { id: "pyramids-of-giza", category: "history", date: "2026-08-28", image: giza },
  { id: "nile-cruise-tips", category: "tips", date: "2026-08-14", image: nile },
  { id: "sharm-or-hurghada", category: "sea", date: "2026-08-02", image: sea },
  { id: "one-day-luxor", category: "routes", date: "2026-07-18", image: luxor },
  { id: "beyond-the-route", category: "inspiration", date: "2026-07-04", image: cairo },
] as const satisfies readonly {
  id: string;
  category: ArticleCategory;
  date: string;
  image: string;
}[];
export type ArticleId = (typeof articles)[number]["id"];

export const faqIds = [
  "visa",
  "season",
  "custom",
  "price",
  "changes",
  "booking",
  "support",
  "family",
] as const;
export type FaqId = (typeof faqIds)[number];

export const budgets = {
  low: { max: 75_000 },
  mid: { min: 75_000, max: 120_000 },
  high: { min: 120_000, max: 200_000 },
  luxury: { min: 200_000 },
} as const satisfies Record<string, { min?: number; max?: number }>;
export type Budget = keyof typeof budgets;

export const durations = {
  short: { max: 5 },
  medium: { min: 5, max: 8 },
  long: { min: 8, max: 14 },
  extended: { min: 14 },
} as const satisfies Record<string, { min?: number; max?: number }>;
export type Duration = keyof typeof durations;

export const inRange = (value: number, range: { min?: number; max?: number }) =>
  (range.min === undefined || value >= range.min) &&
  (range.max === undefined || value <= range.max);
