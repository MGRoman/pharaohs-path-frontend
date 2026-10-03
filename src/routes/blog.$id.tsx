import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Box, Image, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { Eyebrow, SiteContainer, TextLink } from "@/components/travel/ui";
import { articles, type ArticleId } from "@/data/content";
import { getContent, getTranslator, useContent, useTranslate } from "@/i18n";
import { seo } from "@/lib/seo";

const isArticleId = (id: string): id is ArticleId => articles.some((article) => article.id === id);

export const Route = createFileRoute("/blog/$id")({
  loader: ({ params }) => {
    if (!isArticleId(params.id)) throw notFound();
    return { id: params.id };
  },
  head: ({ match, loaderData }) => {
    const { t } = getTranslator(match.context.locale);
    const article = getContent(match.context.locale).articles.find(
      (item) => item.id === loaderData?.id,
    );
    if (!article) return { meta: [{ title: t("blog.notFound") }] };
    return seo({
      locale: match.context.locale,
      title: t("meta.pageTitle", { title: article.title }),
      description: article.excerpt,
      path: `/blog/${article.id}`,
      type: "article",
      image: article.image,
    });
  },
  component: Article,
});

function Article() {
  const { id } = Route.useLoaderData();
  const { t, formatDate } = useTranslate();
  const article = useContent().articles.find((item) => item.id === id);
  if (!article) return null;

  return (
    <Box as="article">
      <SiteContainer pt="20" pb="8">
        <Eyebrow>
          {t(`articleCategories.${article.category}`)} ·{" "}
          <time dateTime={article.date}>{formatDate(article.date)}</time>
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
          alt=""
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
        <TextLink mt="8">
          <Link to="/blog">
            <ArrowLeft size={16} /> {t("blog.all")}
          </Link>
        </TextLink>
      </Box>
    </Box>
  );
}
