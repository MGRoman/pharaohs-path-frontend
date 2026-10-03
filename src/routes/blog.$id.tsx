import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { Eyebrow, SiteContainer } from "@/components/travel/ui";
import { articles } from "@/data/content";

export const Route = createFileRoute("/blog/$id")({
  loader: ({ params }) => {
    const article = articles.find((item) => item.id === params.id);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — Pharaoh's Path` : "Статья не найдена" },
      { name: "description", content: loaderData?.excerpt || "Журнал путешествий по Египту." },
      { property: "og:title", content: loaderData?.title || "Статья не найдена" },
      {
        property: "og:description",
        content: loaderData?.excerpt || "Журнал путешествий по Египту.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: `/blog/${loaderData?.id || ""}` },
    ],
    links: [{ rel: "canonical", href: `/blog/${loaderData?.id || ""}` }],
  }),
  component: Article,
});

function Article() {
  const article = Route.useLoaderData();
  return (
    <Box as="article">
      <SiteContainer pt="20" pb="8">
        <Eyebrow>
          {article.category} · {article.date}
        </Eyebrow>
        <Text
          as="h1"
          fontFamily="heading"
          fontWeight="500"
          fontSize={{ base: "46px", md: "84px" }}
          lineHeight="1.04"
          my="4"
        >
          {article.title}
        </Text>
        <Text color="mist" maxW="600px" lineHeight="1.8">
          {article.excerpt}
        </Text>
      </SiteContainer>
      <Box position="relative" h={{ base: "280px", md: "490px" }}>
        <Image
          src={article.image}
          alt={article.title}
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>
      <Box maxW="770px" mx="auto" my={{ base: "12", md: "20" }} px="6">
        <Text fontFamily="heading" fontWeight="500" fontSize="32px" lineHeight="1.3">
          {article.excerpt}
        </Text>
        {article.body.map((paragraph) => (
          <Text key={paragraph} fontSize="15px" lineHeight="2" color="mist" my="6">
            {paragraph}
          </Text>
        ))}
        <Flex
          asChild
          align="center"
          gap="2"
          mt="8"
          w="fit-content"
          borderBottomWidth="1px"
          borderColor="gold"
          pb="2"
          fontSize="xs"
          fontWeight="700"
          _hover={{ color: "gold" }}
        >
          <Link to="/blog">
            <ArrowLeft size={16} /> Все статьи
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}
