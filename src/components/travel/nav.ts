import type { MessageKey } from "@/i18n";

export const nav = [
  { to: "/", label: "nav.home" },
  { to: "/tours", label: "nav.tours" },
  { to: "/about", label: "nav.about" },
  { to: "/gallery", label: "nav.gallery" },
  { to: "/blog", label: "nav.blog" },
  { to: "/contacts", label: "nav.contacts" },
] as const satisfies readonly { to: string; label: MessageKey }[];
