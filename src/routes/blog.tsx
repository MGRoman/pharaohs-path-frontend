import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/travel/site";
import { SiteContainer } from "@/components/travel/ui";
import { articles } from "@/data/content";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Журнал путешествий — Pharaoh's Path" },
      {
        name: "description",
        content: "Статьи о Египте: когда ехать, что посмотреть и как выбрать путешествие.",
      },
      { property: "og:title", content: "Журнал путешествий — Pharaoh's Path" },
      { property: "og:description", content: "Истории, идеи и советы для путешествия по Египту." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogLayout,
});

function BlogLayout() {
  const matches = useMatches();
  if (matches.some((match) => match.routeId === "/blog/$id")) return <Outlet />;
  return (
    <Box>
      <PageIntro
        eyebrow="Журнал путешествий"
        title="Истории и открытия"
        text="Идеи, советы и истории, которые вдохновляют смотреть на Египет по-новому."
      />
      <SiteContainer pb="24">
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "repeat(3, 1fr)" }} gap="10">
          {articles.map((article) => (
            <Box as="article" key={article.id} _hover={{ "& img": { transform: "scale(1.04)" } }}>
              <Box asChild display="block" overflow="hidden">
                <Link to="/blog/$id" params={{ id: article.id }}>
                  <Image
                    src={article.image}
                    alt={article.title}
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
                <span>{article.category}</span>
                <Box as="span" color="mist">
                  {article.date}
                </Box>
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
              <Flex
                asChild
                align="center"
                gap="2"
                mt="4"
                w="fit-content"
                borderBottomWidth="1px"
                borderColor="gold"
                pb="2"
                fontSize="xs"
                fontWeight="700"
                _hover={{ color: "gold" }}
              >
                <Link to="/blog/$id" params={{ id: article.id }}>
                  Читать <ArrowUpRight size={15} />
                </Link>
              </Flex>
            </Box>
          ))}
        </Grid>
      </SiteContainer>
    </Box>
  );
}
