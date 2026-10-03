import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Accordion, Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { ArrowRight, Star } from "lucide-react";
import { ReadyCTA, TourGrid } from "@/components/travel/site";
import { goldProps } from "@/components/travel/styles";
import { Eyebrow, SiteContainer } from "@/components/travel/ui";
import { formatDays, formatPrice, tours } from "@/data/content";

export const Route = createFileRoute("/tours/$id")({
  loader: ({ params }) => {
    const tour = tours.find((item) => item.id === params.id);
    if (!tour) throw notFound();
    return tour;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — Pharaoh's Path` : "Путешествие не найдено" },
      {
        name: "description",
        content: loaderData?.description || "Авторские путешествия по Египту.",
      },
      { property: "og:title", content: loaderData?.title || "Путешествие не найдено" },
      {
        property: "og:description",
        content: loaderData?.description || "Авторские путешествия по Египту.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: `/tours/${loaderData?.id || ""}` },
    ],
    links: [{ rel: "canonical", href: `/tours/${loaderData?.id || ""}` }],
  }),
  component: Detail,
});

function Detail() {
  const tour = Route.useLoaderData();
  return (
    <Box>
      <Box
        as="section"
        position="relative"
        h={{ base: "460px", md: "540px" }}
        color="ivory"
        display="flex"
        alignItems="end"
      >
        <Image
          src={tour.image}
          alt={tour.title}
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          objectFit="cover"
        />
        <Box
          position="absolute"
          inset="0"
          css={{
            background: "linear-gradient(0deg, oklch(0.12 0.02 260 / 0.85), transparent 75%)",
          }}
        />
        <SiteContainer position="relative" zIndex="1" pb="14">
          <Eyebrow>
            {tour.type} · {tour.region}
          </Eyebrow>
          <Text
            as="h1"
            fontFamily="heading"
            fontWeight="500"
            fontSize={{ base: "48px", md: "100px" }}
            lineHeight="1"
            my="4"
          >
            {tour.title}
          </Text>
          <Flex align="center" gap="2" fontSize="sm">
            <Star size={14} fill="currentColor" /> {tour.rating} · {formatDays(tour.days)}
          </Flex>
        </SiteContainer>
      </Box>
      <SiteContainer
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 320px" }}
        gap={{ base: "8", lg: "20" }}
        py={{ base: "10", md: "20" }}
      >
        <Box>
          <Text
            as="h2"
            fontFamily="heading"
            fontWeight="500"
            fontSize={{ base: "36px", md: "48px" }}
            mb="6"
          >
            Путешествие, которое останется с вами
          </Text>
          <Text fontSize="sm" lineHeight="1.9" color="mist">
            {tour.description} Мы продумали маршрут так, чтобы у вас было время не только увидеть
            главные места, но и почувствовать их настроение.
          </Text>
          <Box pt="16">
            <Text
              as="h2"
              fontFamily="heading"
              fontWeight="500"
              fontSize={{ base: "36px", md: "48px" }}
              mb="6"
            >
              Программа путешествия
            </Text>
            <Accordion.Root collapsible defaultValue={["day-0"]}>
              {tour.itinerary.map((day, index) => (
                <Accordion.Item key={day.title} value={`day-${index}`} borderColor="line">
                  <Accordion.ItemTrigger py="5" fontSize="md">
                    <Text as="span" color="gold" fontSize="11px" mr="4">
                      День {String(index + 1).padStart(2, "0")}
                    </Text>
                    {day.title}
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody color="mist" fontSize="xs" lineHeight="1.8" pl="12" pb="4">
                      {day.detail}
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Box>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="8" pt="16">
            <CheckColumn title="Включено" items={tour.included} />
            <CheckColumn title="Не включено" items={tour.excluded} />
          </Grid>
          <Box pt="16">
            <Text
              as="h2"
              fontFamily="heading"
              fontWeight="500"
              fontSize={{ base: "36px", md: "48px" }}
              mb="6"
            >
              Что взять с собой
            </Text>
            <CheckList items={tour.packing} />
          </Box>
          <Box pt="16">
            <Text
              as="h2"
              fontFamily="heading"
              fontWeight="500"
              fontSize={{ base: "36px", md: "48px" }}
              mb="6"
            >
              Моменты маршрута
            </Text>
            <Grid templateColumns="1fr 1fr" gap="3">
              {tour.gallery.map((src, index) => (
                <Image
                  key={src + index}
                  src={src}
                  alt={`${tour.title} — фотография ${index + 1}`}
                  h={{ base: "155px", md: "220px" }}
                  w="100%"
                  objectFit="cover"
                  loading="lazy"
                />
              ))}
            </Grid>
          </Box>
          <Box pt="16">
            <Text
              as="h2"
              fontFamily="heading"
              fontWeight="500"
              fontSize={{ base: "36px", md: "48px" }}
              mb="4"
            >
              Голоса путешественников
            </Text>
            <Text color="mist" fontSize="sm" lineHeight="1.9">
              «Путешествие открыло для нас совершенно другой Египет. Всё было очень личным,
              спокойным и удивительно красивым»
            </Text>
            <Text mt="3" color="mist" fontSize="sm">
              — Гости Pharaoh's Path
            </Text>
          </Box>
          <Box pt="16">
            <Text
              as="h2"
              fontFamily="heading"
              fontWeight="500"
              fontSize={{ base: "36px", md: "48px" }}
              mb="4"
            >
              Готовы отправиться?
            </Text>
            <Text color="mist" fontSize="sm" mb="5">
              Оставьте заявку, и мы вместе продумаем детали вашего путешествия.
            </Text>
            <Button asChild {...goldProps}>
              <Link to="/booking" search={{ tour: tour.id }}>
                Забронировать тур <ArrowRight size={16} />
              </Link>
            </Button>
          </Box>
        </Box>
        <Box
          position={{ base: "static", lg: "sticky" }}
          top="110px"
          alignSelf="start"
          bg="white"
          borderWidth="1px"
          borderColor="line"
          p="7"
          order={{ base: -1, lg: 0 }}
        >
          <Text fontSize="11px" color="mist">
            Стоимость путешествия от
          </Text>
          <Text fontFamily="heading" fontWeight="600" fontSize="42px">
            {formatPrice(tour.price)}
          </Text>
          <Text fontSize="11px" color="mist">
            за одного путешественника
          </Text>
          <Box mt="6">
            {[
              ["Продолжительность", formatDays(tour.days)],
              ["Формат", tour.type],
              ["Оценка гостей", `${tour.rating} / 5`],
            ].map(([label, value]) => (
              <Flex
                key={label}
                justify="space-between"
                borderTopWidth="1px"
                borderColor="line"
                py="3"
                fontSize="11px"
              >
                <Text color="mist">{label}</Text>
                <Text fontWeight="700">{value}</Text>
              </Flex>
            ))}
          </Box>
          <Button asChild {...goldProps} w="100%" mt="4">
            <Link to="/booking" search={{ tour: tour.id }}>
              Забронировать путешествие <ArrowRight size={16} />
            </Link>
          </Button>
        </Box>
      </SiteContainer>
      <Box bg="sand" py={{ base: "16", md: "24" }}>
        <SiteContainer>
          <Text
            as="h2"
            fontFamily="heading"
            fontWeight="500"
            fontSize={{ base: "36px", md: "48px" }}
            mb="8"
          >
            Вам также понравится
          </Text>
          <TourGrid items={tours.filter((item) => item.id !== tour.id).slice(0, 3)} />
        </SiteContainer>
      </Box>
      <ReadyCTA />
    </Box>
  );
}

function CheckColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <Box>
      <Text
        as="h2"
        fontFamily="heading"
        fontWeight="500"
        fontSize={{ base: "36px", md: "48px" }}
        mb="6"
      >
        {title}
      </Text>
      <CheckList items={items} />
    </Box>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <Box as="ul" listStyleType="none" p="0" m="0">
      {items.map((item) => (
        <Flex
          as="li"
          key={item}
          py="2.5"
          borderBottomWidth="1px"
          borderColor="line"
          fontSize="xs"
          color="mist"
          gap="2"
        >
          <Text as="span" color="turquoise">
            ✓
          </Text>
          {item}
        </Flex>
      ))}
    </Box>
  );
}
