import { createFileRoute, Link } from "@tanstack/react-router";
import { Box, Flex, Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { MapPin } from "lucide-react";
import { FAQ, PageIntro } from "@/components/travel/site";
import { SiteContainer } from "@/components/travel/ui";
import { getTranslator, useTranslate } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contacts")({
  head: ({ match }) => {
    const { t } = getTranslator(match.context.locale);
    return seo({
      locale: match.context.locale,
      title: t("meta.pageTitle", { title: t("meta.contacts.title") }),
      description: t("meta.contacts.description"),
      path: "/contacts",
    });
  },
  component: Contacts,
});

const email = "hello@pharaohspath.ru";

function Contacts() {
  const { t } = useTranslate();
  const lines = [
    {
      label: t("contacts.email"),
      value: (
        <ChakraLink href={`mailto:${email}`} dir="ltr">
          {email}
        </ChakraLink>
      ),
    },
    {
      label: t("contacts.request"),
      value: <Link to="/booking">{t("contacts.requestLink")}</Link>,
    },
    { label: t("contacts.phone"), value: <Text>{t("contacts.phoneValue")}</Text> },
    { label: t("contacts.response"), value: <Text>{t("contacts.responseValue")}</Text> },
  ];

  return (
    <Box>
      <PageIntro
        eyebrow={t("contacts.eyebrow")}
        title={t("contacts.title")}
        text={t("contacts.text")}
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
            {t("contacts.lead")}
          </Text>
          <Flex direction="column" gap="6" mt="8">
            {lines.map(({ label, value }) => (
              <Flex
                key={label}
                direction="column"
                align="start"
                gap="2"
                pb="4"
                borderBottomWidth="1px"
                borderColor="line"
              >
                <Text color="gold" fontSize="10px" textTransform="uppercase" letterSpacing="0.12em">
                  {label}
                </Text>
                {value}
              </Flex>
            ))}
          </Flex>
        </Box>
        <Flex
          role="img"
          aria-label={t("contacts.mapLabel")}
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
              {t("contacts.mapTitle")}
            </Text>
            <Text fontSize="11px" color="mist">
              {t("contacts.mapText")}
            </Text>
          </Box>
        </Flex>
      </SiteContainer>
      <FAQ />
    </Box>
  );
}
