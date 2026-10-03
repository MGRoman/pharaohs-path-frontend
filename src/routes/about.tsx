import { createFileRoute, Link } from "@tanstack/react-router";
import { Box, Grid, Image, Text, type TextProps } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import { FAQ, PageIntro, ReadyCTA } from "@/components/travel/site";
import { Eyebrow, SiteContainer, TextLink } from "@/components/travel/ui";
import { images } from "@/data/content";
import { getTranslator, useTranslate } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: ({ match }) => {
    const { t } = getTranslator(match.context.locale);
    return seo({
      locale: match.context.locale,
      title: t("meta.pageTitle", { title: t("meta.about.title") }),
      description: t("meta.about.description"),
      path: "/about",
    });
  },
  component: About,
});

const values = ["rhythm", "people", "care"] as const;
const milestones = ["founded", "custom", "nile", "today"] as const;

const headingProps = {
  as: "h2",
  fontFamily: "heading",
  fontWeight: "500",
  fontSize: { base: "40px", md: "60px" },
  my: "5",
} satisfies TextProps;

function About() {
  const { t } = useTranslate();
  return (
    <Box>
      <PageIntro eyebrow={t("about.eyebrow")} title={t("about.title")} text={t("about.text")} />
      <SiteContainer
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={{ base: "9", lg: "20" }}
        alignItems="center"
        pb="20"
      >
        <Image
          src={images.luxor}
          alt={t("about.imageAlt")}
          h={{ base: "420px", md: "570px" }}
          w="100%"
          objectFit="cover"
        />
        <Box>
          <Eyebrow>{t("about.philosophy.eyebrow")}</Eyebrow>
          <Text {...headingProps} lineHeight="1.07">
            {t("about.philosophy.title")}
          </Text>
          <Text color="mist" fontSize="sm" lineHeight="1.95" mb="4">
            {t("about.philosophy.first")}
          </Text>
          <Text color="mist" fontSize="sm" lineHeight="1.95">
            {t("about.philosophy.second")}
          </Text>
          <TextLink mt="6">
            <Link to="/tours">
              {t("about.philosophy.link")} <ArrowUpRight size={16} />
            </Link>
          </TextLink>
        </Box>
      </SiteContainer>
      <Box bg="sand" py={{ base: "16", md: "24" }}>
        <SiteContainer>
          <Eyebrow>{t("about.approach.eyebrow")}</Eyebrow>
          <Text {...headingProps}>{t("about.approach.title")}</Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="8">
            {values.map((key) => (
              <Box key={key} borderTopWidth="1px" borderColor="gold" pt="5">
                <Text as="h3" fontFamily="heading" fontWeight="500" fontSize="34px">
                  {t(`about.approach.${key}.title`)}
                </Text>
                <Text mt="3" fontSize="xs" lineHeight="1.9" color="mist">
                  {t(`about.approach.${key}.text`)}
                </Text>
              </Box>
            ))}
          </Grid>
        </SiteContainer>
      </Box>
      <Box py={{ base: "16", md: "24" }}>
        <SiteContainer>
          <Eyebrow>{t("about.path.eyebrow")}</Eyebrow>
          <Text {...headingProps}>{t("about.path.title")}</Text>
          <Grid as="ol" templateColumns={{ base: "1fr 1fr", lg: "repeat(4, 1fr)" }} gap="8">
            {milestones.map((key) => (
              <Box
                as="li"
                key={key}
                listStyleType="none"
                borderTopWidth="1px"
                borderColor="line"
                pt="4"
              >
                <Text color="gold" fontFamily="heading" fontSize="30px" fontWeight="500">
                  {t(`about.path.${key}.year`)}
                </Text>
                <Text mt="2" fontSize="xs" lineHeight="1.8">
                  {t(`about.path.${key}.text`)}
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
