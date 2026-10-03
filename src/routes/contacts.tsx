import { createFileRoute, Link } from "@tanstack/react-router";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { MapPin } from "lucide-react";
import { FAQ, PageIntro } from "@/components/travel/site";
import { SiteContainer } from "@/components/travel/ui";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — Pharaoh's Path" },
      {
        name: "description",
        content: "Свяжитесь с Pharaoh’s Path и обсудите ваше путешествие по Египту.",
      },
      { property: "og:title", content: "Контакты — Pharaoh's Path" },
      {
        property: "og:description",
        content: "Мы поможем спланировать ваше путешествие по Египту.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/contacts" },
    ],
    links: [{ rel: "canonical", href: "/contacts" }],
  }),
  component: Contacts,
});

const lines = [
  ["Электронная почта", "hello@pharaohspath.ru", "mailto:hello@pharaohspath.ru"],
  ["Заявка на путешествие", "Оставить заявку на сайте →", "/booking"],
  ["Телефон, мессенджеры и офис", "Контакты появятся после запуска сервиса", ""],
  ["Время ответа", "Демонстрационная версия — сообщения не отправляются", ""],
] as const;

function Contacts() {
  return (
    <Box>
      <PageIntro
        eyebrow="Всегда на связи"
        title="Начнём разговор?"
        text="Расскажите, каким вы представляете своё путешествие. Мы поможем превратить идею в маршрут."
      />
      <SiteContainer
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={{ base: "10", lg: "20" }}
        pb="24"
      >
        <Box>
          <Text as="h2" fontFamily="heading" fontWeight="500" fontSize="43px">
            Pharaoh's Path
          </Text>
          <Text color="mist" mt="3">
            Для каждого путешествия найдётся своё начало. Пусть это будет простой разговор.
          </Text>
          <Flex direction="column" gap="6" mt="8">
            {lines.map(([label, value, href]) => (
              <Flex
                key={label}
                direction="column"
                gap="2"
                pb="4"
                borderBottomWidth="1px"
                borderColor="line"
              >
                <Text color="gold" fontSize="10px" textTransform="uppercase" letterSpacing="0.12em">
                  {label}
                </Text>
                {href.startsWith("mailto:") ? (
                  <a href={href}>{value}</a>
                ) : href === "/booking" ? (
                  <Link to="/booking">{value}</Link>
                ) : (
                  <Text>{value}</Text>
                )}
              </Flex>
            ))}
          </Flex>
        </Box>
        <Flex
          role="img"
          aria-label="Схематичная карта Египта"
          minH="350px"
          bg="sand"
          position="relative"
          align="center"
          justify="center"
          overflow="hidden"
          css={{
            backgroundImage:
              "repeating-linear-gradient(36deg, transparent 0 75px, color-mix(in oklab, var(--chakra-colors-gold) 23%, transparent) 76px 78px, transparent 79px 156px)",
          }}
        >
          <Box
            position="relative"
            bg="ivory"
            p="6"
            textAlign="center"
            boxShadow="0 12px 30px oklch(0.19 0.02 258 / 0.1)"
          >
            <Icon boxSize="6" color="gold" display="block" mx="auto" mb="2">
              <MapPin />
            </Icon>
            <Text fontFamily="heading" fontSize="29px" fontWeight="500">
              Египет ждёт вас
            </Text>
            <Text fontSize="11px" color="mist">
              От Каира до Красного моря
            </Text>
          </Box>
        </Flex>
      </SiteContainer>
      <FAQ />
    </Box>
  );
}
