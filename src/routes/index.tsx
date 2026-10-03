import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  Box,
  Button,
  Field,
  Flex,
  Grid,
  Icon,
  Image,
  Input,
  NativeSelect,
  Text,
} from "@chakra-ui/react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { FAQ, ReadyCTA, SectionHeading, Testimonials, TourGrid } from "@/components/travel/site";
import {
  fieldControlProps,
  fieldLabelProps,
  goldProps,
  lineProps,
} from "@/components/travel/styles";
import { Eyebrow, SiteContainer, TextLink } from "@/components/travel/ui";
import { useBudgetLabel } from "@/components/travel/use-budget-label";
import { budgets, images, regions, type Budget, type GalleryId, type Region } from "@/data/content";
import { getTranslator, useContent, useTranslate } from "@/i18n";
import { seo } from "@/lib/seo";

const heroStats = ["years", "travelers", "routes"] as const;
const aboutStats = ["years", "travelers", "routes", "support"] as const;
const previewIds: readonly GalleryId[] = ["karnak-silence", "sinai-reef", "horizon"];

const heroShade = (towards: "left" | "right") =>
  `linear-gradient(to ${towards}, oklch(0.12 0.025 260 / 0.77), oklch(0.12 0.025 260 / 0.37) 55%, transparent),
   linear-gradient(0deg, oklch(0.12 0.025 260 / 0.52), transparent 35%)`;

export const Route = createFileRoute("/")({
  head: ({ match }) => {
    const { t } = getTranslator(match.context.locale);
    const page = seo({
      locale: match.context.locale,
      title: t("meta.home.title"),
      description: t("meta.home.description"),
      path: "/",
    });
    return { ...page, links: [...page.links, { rel: "preload", as: "image", href: images.giza }] };
  },
  component: Home,
});

function Home() {
  const { t } = useTranslate();
  const { tours, gallery } = useContent();
  const budgetLabel = useBudgetLabel();
  const navigate = useNavigate();
  const [region, setRegion] = useState<Region | "">("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [budget, setBudget] = useState<Budget | "">("");

  function submit(event: FormEvent) {
    event.preventDefault();
    navigate({
      to: "/tours",
      search: {
        ...(region && { region }),
        ...(budget && { budget }),
        ...(date && { date }),
        travelers,
      },
    });
  }

  return (
    <>
      <Box
        as="section"
        position="relative"
        h="95svh"
        minH="640px"
        maxH="1000px"
        color="ivory"
        display="flex"
        alignItems="center"
        overflow="hidden"
      >
        <Image
          src={images.giza}
          alt={t("home.heroAlt")}
          className="hero-photo"
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center 57%"
          fetchPriority="high"
        />
        <Box
          position="absolute"
          inset="0"
          css={{
            background: heroShade("right"),
            "[dir=rtl] &": { background: heroShade("left") },
          }}
        />
        <SiteContainer position="relative" zIndex="1" pt="16">
          <Box className="rise-in" animationDelay="0.08s">
            <Eyebrow>{t("home.eyebrow")}</Eyebrow>
          </Box>
          <Text
            as="h1"
            className="rise-in"
            fontFamily="heading"
            fontWeight="500"
            fontSize={{ base: "58px", md: "118px" }}
            lineHeight="0.94"
            maxW="780px"
            my="6"
            animationDelay="0.16s"
          >
            {t("home.title")}
          </Text>
          <Text
            className="rise-in"
            maxW="465px"
            fontSize={{ base: "sm", md: "md" }}
            lineHeight="1.8"
            color="whiteAlpha.900"
            animationDelay="0.26s"
          >
            {t("home.lead")}
          </Text>
          <Flex className="rise-in" gap="3" wrap="wrap" mt="8" animationDelay="0.36s">
            <Button asChild {...goldProps}>
              <Link to="/tours">
                {t("home.viewTours")} <ArrowUpRight size={17} />
              </Link>
            </Button>
            <Button asChild {...lineProps}>
              <Link to="/booking">
                {t("home.planTrip")} <ArrowRight size={17} />
              </Link>
            </Button>
          </Flex>
          <Flex
            className="rise-in"
            gap={{ base: "4", md: "10" }}
            mt={{ base: "12", md: "16" }}
            animationDelay="0.46s"
          >
            {heroStats.map((key) => (
              <Flex key={key} direction="column" borderStartWidth="1px" borderColor="gold" ps="4">
                <Text
                  fontFamily="heading"
                  fontSize={{ base: "25px", md: "30px" }}
                  fontWeight="500"
                  lineHeight="1"
                >
                  {t(`stats.${key}.value`)}
                </Text>
                <Text fontSize="10px" color="whiteAlpha.800" mt="1.5">
                  {t(`stats.${key}.label`)}
                </Text>
              </Flex>
            ))}
          </Flex>
        </SiteContainer>
        {/* Logical insets resolve against the element's own writing mode, so the
            vertical text lives in a child of the positioned box. */}
        <Box
          aria-hidden
          display={{ base: "none", md: "block" }}
          position="absolute"
          zIndex="1"
          insetEnd="6"
          bottom="9"
        >
          <Flex
            direction="column"
            align="center"
            fontSize="10px"
            letterSpacing="0.2em"
            textTransform="uppercase"
            css={{ writingMode: "vertical-rl" }}
          >
            {t("home.scroll")}
            <Icon boxSize="3" mt="3.5">
              <ArrowDown />
            </Icon>
          </Flex>
        </Box>
      </Box>

      <SiteContainer
        position="relative"
        zIndex="2"
        mt={{ base: "0", md: "-45px" }}
        className="rise-in"
      >
        <Grid
          as="form"
          role="search"
          aria-label={t("home.search.label")}
          onSubmit={submit}
          bg="white"
          p={{ base: "5", md: "6" }}
          boxShadow="0 20px 55px oklch(0.19 0.025 258 / 0.13)"
          templateColumns={{ base: "1fr", md: "1.4fr 1fr 0.8fr 1fr auto" }}
          gap="3.5"
          alignItems="end"
        >
          <SearchField label={t("home.search.region")}>
            <NativeSelect.Root>
              <NativeSelect.Field
                value={region}
                onChange={(event) => setRegion(event.target.value as Region | "")}
                {...fieldControlProps}
              >
                <option value="">{t("home.search.anyRegion")}</option>
                {regions.map((key) => (
                  <option key={key} value={key}>
                    {t(`regions.${key}`)}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </SearchField>
          <SearchField label={t("home.search.date")}>
            <Input
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              {...fieldControlProps}
            />
          </SearchField>
          <SearchField label={t("home.search.travelers")}>
            <Input
              type="number"
              min="1"
              max="20"
              value={travelers}
              onChange={(event) => setTravelers(event.target.value)}
              {...fieldControlProps}
            />
          </SearchField>
          <SearchField label={t("home.search.budget")}>
            <NativeSelect.Root>
              <NativeSelect.Field
                value={budget}
                onChange={(event) => setBudget(event.target.value as Budget | "")}
                {...fieldControlProps}
              >
                <option value="">{t("budgets.any")}</option>
                {(Object.keys(budgets) as Budget[]).map((key) => (
                  <option key={key} value={key}>
                    {budgetLabel(key)}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </SearchField>
          <Button type="submit" {...goldProps} h="44px" px="5">
            {t("home.search.submit")} <ArrowRight size={16} />
          </Button>
        </Grid>
      </SiteContainer>

      <Box as="section" py={{ base: "16", md: "28" }}>
        <SiteContainer
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: "9", lg: "24" }}
          alignItems="center"
        >
          <Box position="relative" h={{ base: "420px", md: "610px" }}>
            <Image
              src={images.nile}
              alt={t("home.about.imageAlt")}
              w="100%"
              h="100%"
              objectFit="cover"
              loading="lazy"
            />
            <Box
              display={{ base: "none", md: "block" }}
              position="absolute"
              w="35%"
              h="30%"
              borderStartWidth="1px"
              borderBottomWidth="1px"
              borderColor="gold"
              bottom="-20px"
              insetStart="-20px"
              pointerEvents="none"
            />
          </Box>
          <Box>
            <Eyebrow>{t("home.about.eyebrow")}</Eyebrow>
            <Text
              as="h2"
              fontFamily="heading"
              fontWeight="500"
              fontSize={{ base: "43px", md: "68px" }}
              lineHeight="1.07"
              my="6"
            >
              {t("home.about.title")}
            </Text>
            <Text color="mist" fontSize="sm" lineHeight="1.95" mb="4">
              {t("home.about.first")}
            </Text>
            <Text color="mist" fontSize="sm" lineHeight="1.95">
              {t("home.about.second")}
            </Text>
            <TextLink mt="6">
              <Link to="/about">
                {t("home.about.link")} <ArrowUpRight size={16} />
              </Link>
            </TextLink>
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap="6"
              borderTopWidth="1px"
              borderColor="line"
              pt="7"
              mt="12"
            >
              {aboutStats.map((key) => (
                <Box key={key}>
                  <Text fontFamily="heading" fontSize="34px" fontWeight="500">
                    {t(`stats.${key}.value`)}
                  </Text>
                  <Text fontSize="10px" color="mist">
                    {t(`stats.${key}.label`)}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>
        </SiteContainer>
      </Box>

      <Box as="section" bg="sand" py={{ base: "16", md: "28" }}>
        <SiteContainer>
          <SectionHeading
            eyebrow={t("home.routes.eyebrow")}
            title={t("home.routes.title")}
            aside={
              <Text color="mist" lineHeight="1.9" maxW="360px">
                {t("home.routes.text")}
              </Text>
            }
          />
          <TourGrid items={tours} />
          <Flex justify="center" mt="10">
            <Button asChild variant="outline" borderRadius="2px" h="12" px="6">
              <Link to="/tours">
                {t("home.routes.all")} <ArrowUpRight size={16} />
              </Link>
            </Button>
          </Flex>
        </SiteContainer>
      </Box>

      <Box as="section" py={{ base: "16", md: "28" }}>
        <SiteContainer>
          <SectionHeading
            eyebrow={t("home.moments.eyebrow")}
            title={t("home.moments.title")}
            aside={
              <TextLink>
                <Link to="/gallery">
                  {t("home.moments.link")} <ArrowUpRight size={16} />
                </Link>
              </TextLink>
            }
          />
          <Grid
            templateColumns={{ base: "1.3fr 1fr", md: "1.25fr 1fr 0.8fr" }}
            gap={{ base: "2", md: "4" }}
            h={{ base: "280px", md: "430px" }}
            overflow="hidden"
          >
            {gallery
              .filter((item) => previewIds.includes(item.id))
              .map((item, index) => (
                <Image
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  loading="lazy"
                  display={index === 2 ? { base: "none", md: "block" } : "block"}
                  transition="transform .8s cubic-bezier(.22,1,.36,1)"
                  _hover={{ transform: "scale(1.03)" }}
                />
              ))}
          </Grid>
        </SiteContainer>
      </Box>
      <Testimonials />
      <FAQ />
      <ReadyCTA />
    </>
  );
}

function SearchField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Field.Root gap="2">
      <Field.Label {...fieldLabelProps}>{label}</Field.Label>
      {children}
    </Field.Root>
  );
}
