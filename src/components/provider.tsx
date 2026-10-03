import { ChakraProvider, LocaleProvider } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { system } from "@/theme";

/** `locale` is a BCP 47 tag; Ark derives text direction for keyboard navigation from it. */
export function Provider({ locale, children }: { locale: string; children: ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    </ChakraProvider>
  );
}
