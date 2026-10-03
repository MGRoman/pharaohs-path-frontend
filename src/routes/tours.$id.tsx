import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Accordion, Box, Button, Flex, Grid, Image, Text, type TextProps } from "@chakra-ui/react";
import { ArrowRight, Star } from "lucide-react";
import { ReadyCTA, TourGrid } from "@/components/travel/site";
import { goldProps } from "@/components/travel/styles";
import { Eyebrow, SiteContainer } from "@/components/travel/ui";
import { tours, type TourId } from "@/data/content";
import { getContent, getTranslator, useContent, useTranslate } from "@/i18n";
import { seo } from "@/lib/seo";

const isTourId = (id: string): id is TourId => tours.some((tour) => tour.id === id);

export const Route = createFileRoute("/tours/$id")({
  loader: ({ params }) => {
    if (!isTourId(params.id)) throw notFound();
    return { id: params.id };
  },
  head: ({ match, loaderData }) => {
    const { t } = getTranslator(match.context.locale);
    const tour = getContent(match.context.locale).tours.find((item) => item.id === loaderData?.id);
    if (!tour) return { meta: [{ title: t("tour.notFound") }] };
    return seo({
      locale: match.context.locale,
      title: t("meta.pageTitle", { title: tour.title }),
      description: tour.description,
      path: `/tours/${tour.id}`,
      type: "product",
      image: tour.image,
    });
  },
  component: Detail,
});

const sectionTitleProps = {
  as: "h2",
  fontFamily: "heading",
  fontWeight: "500",
  fontSize: { base: "36px", md: "48px" },
  mb: "6",
} satisfies TextProps;

function Detail() {
  const { id } = Route.useLoaderData();
  const { t, formatNumber, formatPrice, formatRating } = useTranslate();
  const { tours: localized } = useContent();
  const tour = localized.find((item) => item.id === id);
  if (!tour) return null;

  const days = t("common.days", { count: tour.days });
  const type = t(`tourTypes.${tour.type}`);

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
            {type} · {t(`regions.${tour.region}`)}
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
            <Star size={14} fill="currentColor" aria-hidden />
            <span aria-label={t("common.rating", { value: formatRating(tour.rating) })}>
              {formatRating(tour.rating)}
            </span>
            · {days}
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
          <Text {...sectionTitleProps}>{t("tour.introTitle")}</Text>
          <Text fontSize="sm" lineHeight="1.9" color="mist">
            {tour.description} {t("tour.introMore")}
          </Text>
          <Box pt="16">
            <Text {...sectionTitleProps}>{t("tour.program")}</Text>
            <Accordion.Root collapsible defaultValue={["day-0"]}>
              {tour.itinerary.map((day, index) => (
                <Accordion.Item key={day.title} value={`day-${index}`} borderColor="line">
                  <Accordion.ItemTrigger py="5" fontSize="md" textAlign="start">
                    <Text as="span" color="gold" fontSize="11px" me="4" whiteSpace="nowrap">
                      {t("tour.day", {
                        day: formatNumber(index + 1, { minimumIntegerDigits: 2 }),
                      })}
                    </Text>
                    {day.title}
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody color="mist" fontSize="xs" lineHeight="1.8" ps="12" pb="4">
                      {day.detail}
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Box>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="8" pt="16">
            <Box>
              <Text {...sectionTitleProps}>{t("tour.included")}</Text>
              <CheckList items={tour.included} />
            </Box>
            <Box>
              <Text {...sectionTitleProps}>{t("tour.excluded")}</Text>
              <CheckList items={tour.excluded} />
            </Box>
          </Grid>
          <Box pt="16">
            <Text {...sectionTitleProps}>{t("tour.packing")}</Text>
            <CheckList items={tour.packing} />
          </Box>
          <Box pt="16">
            <Text {...sectionTitleProps}>{t("tour.moments")}</Text>
            <Grid templateColumns="1fr 1fr" gap="3">
              {tour.gallery.map((src, index) => (
                <Image
                  key={`${src}-${index}`}
                  src={src}
                  alt={t("tour.photo", { title: tour.title, index: index + 1 })}
                  h={{ base: "155px", md: "220px" }}
                  w="100%"
                  objectFit="cover"
                  loading="lazy"
                />
              ))}
            </Grid>
          </Box>
          <Box pt="16">
            <Text {...sectionTitleProps} mb="4">
              {t("tour.voices")}
            </Text>
            <Text as="blockquote" color="mist" fontSize="sm" lineHeight="1.9">
              {t("tour.quote")}
            </Text>
            <Text mt="3" color="mist" fontSize="sm">
              {t("tour.quoteAuthor")}
            </Text>
          </Box>
          <Box pt="16">
            <Text {...sectionTitleProps} mb="4">
              {t("tour.ready")}
            </Text>
            <Text color="mist" fontSize="sm" mb="5">
              {t("tour.readyText")}
            </Text>
            <Button asChild {...goldProps}>
              <Link to="/booking" search={{ tour: tour.id }}>
                {t("tour.bookTour")} <ArrowRight size={16} />
              </Link>
            </Button>
          </Box>
        </Box>
        <Box
          as="aside"
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
            {t("tour.priceFrom")}
          </Text>
          <Text fontFamily="heading" fontWeight="600" fontSize="42px">
            {formatPrice(tour.price)}
          </Text>
          <Text fontSize="11px" color="mist">
            {t("tour.perTraveler")}
          </Text>
          <Box as="dl" mt="6">
            {[
              [t("tour.duration"), days],
              [t("tour.format"), type],
              [t("tour.rating"), t("tour.ratingValue", { value: formatRating(tour.rating) })],
            ].map(([label, value]) => (
              <Flex
                key={label}
                justify="space-between"
                borderTopWidth="1px"
                borderColor="line"
                py="3"
                fontSize="11px"
              >
                <Text as="dt" color="mist">
                  {label}
                </Text>
                <Text as="dd" fontWeight="700">
                  {value}
                </Text>
              </Flex>
            ))}
          </Box>
          <Button asChild {...goldProps} w="100%" mt="4">
            <Link to="/booking" search={{ tour: tour.id }}>
              {t("tour.book")} <ArrowRight size={16} />
            </Link>
          </Button>
        </Box>
      </SiteContainer>
      <Box bg="sand" py={{ base: "16", md: "24" }}>
        <SiteContainer>
          <Text {...sectionTitleProps} mb="8">
            {t("tour.related")}
          </Text>
          <TourGrid items={localized.filter((item) => item.id !== tour.id).slice(0, 3)} />
        </SiteContainer>
      </Box>
      <ReadyCTA />
    </Box>
  );
}

function CheckList({ items }: { items: readonly string[] }) {
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
          <Text as="span" color="turquoise" aria-hidden>
            ✓
          </Text>
          {item}
        </Flex>
      ))}
    </Box>
  );
}
