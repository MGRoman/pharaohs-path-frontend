import { createFileRoute, Link } from "@tanstack/react-router";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import { FAQ, PageIntro, ReadyCTA } from "@/components/travel/site";
import { Eyebrow, SiteContainer } from "@/components/travel/ui";
import { images } from "@/data/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О нас — Pharaoh's Path" },
      {
        name: "description",
        content:
          "Мы создаём индивидуальные путешествия по Египту с локальными гидами и вниманием к каждой детали.",
      },
      { property: "og:title", content: "О нас — Pharaoh's Path" },
      {
        property: "og:description",
        content: "Познакомьтесь с нашей философией путешествий по Египту.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  [
    "Ваш собственный ритм",
    "Маршрут начинается с разговора о вас. Мы оставляем время и для важных мест, и для неожиданных поворотов.",
  ],
  [
    "Люди, знающие Египет",
    "Наши местные гиды делятся не только фактами, но и историями, привычками и любовью к своему дому.",
  ],
  [
    "Забота без лишних слов",
    "От встречи в аэропорту до последнего дня мы рядом, чтобы вы могли просто быть в путешествии.",
  ],
];

const history = [
  ["2014", "Первая поездка и идея показывать Египет иначе."],
  ["2018", "Запуск индивидуальных маршрутов с локальными экспертами."],
  ["2022", "Новые маршруты по Нилу и Красному морю."],
  ["2026", "Более 4 800 путешественников и десятки личных историй."],
];

function About() {
  return (
    <Box>
      <PageIntro
        eyebrow="Наша история"
        title="Путешествовать. Чувствовать. Запоминать."
        text="Мы создаём путешествия, которые не заканчиваются вместе с обратным рейсом."
      />
      <SiteContainer
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={{ base: "9", lg: "20" }}
        alignItems="center"
        pb="20"
      >
        <Image
          src={images.luxor}
          alt="Путешественница среди колонн египетского храма"
          h={{ base: "420px", md: "570px" }}
          w="100%"
          objectFit="cover"
        />
        <Box>
          <Eyebrow>Наша философия</Eyebrow>
          <Text
            as="h2"
            fontFamily="heading"
            fontWeight="500"
            fontSize={{ base: "40px", md: "60px" }}
            lineHeight="1.07"
            my="5"
          >
            Мы верим в силу настоящих встреч.
          </Text>
          <Text color="mist" fontSize="sm" lineHeight="1.95" mb="4">
            Pharaoh's Path родился из любви к Египту, который невозможно уместить в стандартную
            экскурсию. Стране, где за каждым поворотом стоит история, а за каждым знакомством —
            новая перспектива.
          </Text>
          <Text color="mist" fontSize="sm" lineHeight="1.95">
            Мы соединяем глубокое знание местных гидов, продуманную организацию и свободу
            путешествовать в собственном ритме. Не просто показываем достопримечательности — создаём
            пространство для ваших открытий.
          </Text>
          <Flex
            asChild
            align="center"
            gap="2"
            mt="6"
            w="fit-content"
            borderBottomWidth="1px"
            borderColor="gold"
            pb="2"
            fontSize="xs"
            fontWeight="700"
            _hover={{ color: "gold" }}
          >
            <Link to="/tours">
              Исследовать маршруты <ArrowUpRight size={16} />
            </Link>
          </Flex>
        </Box>
      </SiteContainer>
      <Box bg="sand" py={{ base: "16", md: "24" }}>
        <SiteContainer>
          <Eyebrow>Наш подход</Eyebrow>
          <Text
            as="h2"
            fontFamily="heading"
            fontWeight="500"
            fontSize={{ base: "40px", md: "60px" }}
            my="5"
          >
            В деталях — главное
          </Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="8">
            {values.map(([title, text]) => (
              <Box key={title} borderTopWidth="1px" borderColor="gold" pt="5">
                <Text as="h3" fontFamily="heading" fontWeight="500" fontSize="34px">
                  {title}
                </Text>
                <Text mt="3" fontSize="xs" lineHeight="1.9" color="mist">
                  {text}
                </Text>
              </Box>
            ))}
          </Grid>
        </SiteContainer>
      </Box>
      <Box py={{ base: "16", md: "24" }}>
        <SiteContainer>
          <Eyebrow>Наш путь</Eyebrow>
          <Text
            as="h2"
            fontFamily="heading"
            fontWeight="500"
            fontSize={{ base: "40px", md: "60px" }}
            my="5"
          >
            История в датах
          </Text>
          <Grid templateColumns={{ base: "1fr 1fr", lg: "repeat(4, 1fr)" }} gap="8">
            {history.map(([year, text]) => (
              <Box key={year} borderTopWidth="1px" borderColor="line" pt="4">
                <Text color="gold" fontFamily="heading" fontSize="30px" fontWeight="500">
                  {year}
                </Text>
                <Text mt="2" fontSize="xs" lineHeight="1.8">
                  {text}
                </Text>
              </Box>
            ))}
          </Grid>
        </SiteContainer>
      </Box>
      <FAQ />
      <ReadyCTA />
    </Box>
  );
}
