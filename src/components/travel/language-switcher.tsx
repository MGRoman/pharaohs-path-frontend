import { Button, Flex, type FlexProps } from "@chakra-ui/react";
import { useRouterState } from "@tanstack/react-router";
import { localeMeta, locales, localizeHref, persistLocale, useTranslate } from "@/i18n";

const short = { ru: "RU", en: "EN", ar: "عربي" } as const;

/**
 * Plain links rather than client-side navigation: each language is its own crawlable
 * URL, and a full load lets the server render the matching lang, dir and fonts.
 */
export function LanguageSwitcher(props: FlexProps) {
  const { t, locale } = useTranslate();
  const href = useRouterState({ select: (state) => state.location.publicHref });
  return (
    <Flex role="group" aria-label={t("nav.language")} gap="1" {...props}>
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Button
            key={code}
            asChild
            variant="ghost"
            size="xs"
            minW="9"
            px="2"
            fontSize="11px"
            fontWeight="700"
            color={active ? "gold" : "inherit"}
            opacity={active ? 1 : 0.72}
            borderRadius="2px"
            transition="color .3s, opacity .3s"
            _hover={{ opacity: 1, bg: "transparent" }}
          >
            <a
              href={localizeHref(href, code)}
              hrefLang={code}
              lang={code}
              title={localeMeta[code].label}
              aria-label={localeMeta[code].label}
              aria-current={active ? "true" : undefined}
              onClick={(event) => {
                if (active) event.preventDefault();
                else persistLocale(code);
              }}
            >
              {short[code]}
            </a>
          </Button>
        );
      })}
    </Flex>
  );
}
