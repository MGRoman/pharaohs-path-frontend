import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { Box, Flex, Grid, Image, Text, chakra } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/travel/site";
import { SiteContainer, TextLink } from "@/components/travel/ui";
import { getTranslator, useContent, useTranslate } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  head: ({ match }) => {
    const { t } = getTranslator(match.context.locale);
    return seo({
      locale: match.context.locale,
      title: t("meta.pageTitle", { title: t("meta.blog.title") }),
      description: t("meta.blog.description"),
      path: "/blog",
    });
  },
  component: BlogLayout,
});

function BlogLayout() {
  const matches = useMatches();
  if (matches.some((match) => match.routeId === "/blog/$id")) return <Outlet />;
  return <BlogIndex />;
}

function BlogIndex() {
  const { t, formatDate } = useTranslate();
  const { articles } = useContent();
  return (
    <Box>
      <PageIntro eyebrow={t("blog.eyebrow")} title={t("blog.title")} text={t("blog.text")} />
      <SiteContainer pb="24">
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "repeat(3, 1fr)" }} gap="10">
          {articles.map((article) => (
            <Box as="article" key={article.id} _hover={{ "& img": { transform: "scale(1.04)" } }}>
              <Box asChild display="block" overflow="hidden">
                <Link to="/blog/$id" params={{ id: article.id }} tabIndex={-1} aria-hidden>
                  <Image
                    src={article.image}
                    alt=""
                    w="100%"
                    h="240px"
                    objectFit="cover"
                    loading="lazy"
                    transition="transform .7s cubic-bezier(.22,1,.36,1)"
                  />
                </Link>
              </Box>
              <Flex
                justify="space-between"
                fontSize="10px"
                color="gold"
                textTransform="uppercase"
                letterSpacing="0.1em"
                my="5"
              >
                <span>{t(`articleCategories.${article.category}`)}</span>
                <chakra.time color="mist" dateTime={article.date}>
                  {formatDate(article.date)}
                </chakra.time>
              </Flex>
              <Text
                as="h2"
                fontFamily="heading"
                fontWeight="500"
                fontSize="31px"
                lineHeight="1.1"
                mb="3"
              >
                <Link to="/blog/$id" params={{ id: article.id }}>
                  {article.title}
                </Link>
              </Text>
              <Text fontSize="11px" lineHeight="1.8" color="mist">
                {article.excerpt}
              </Text>
              <TextLink mt="4">
                <Link to="/blog/$id" params={{ id: article.id }} aria-label={article.title}>
                  {t("blog.read")} <ArrowUpRight size={15} />
                </Link>
              </TextLink>
            </Box>
          ))}
        </Grid>
      </SiteContainer>
    </Box>
  );
}
