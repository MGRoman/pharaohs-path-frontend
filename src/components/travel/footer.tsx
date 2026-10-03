import { Box, Flex, Grid, Link as ChakraLink, Text, type TextProps } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { regions } from "@/data/content";
import { useTranslate } from "@/i18n";
import { Brand } from "./brand";
import { nav } from "./nav";
import { SiteContainer } from "./ui";

const destinations = regions.filter((region) => region !== "multi");

const columnTitleProps = {
  as: "h3",
  color: "gold",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  mb: "6",
} satisfies TextProps;

const itemProps = {
  mb: "3.5",
  fontSize: "sm",
  color: "whiteAlpha.800",
  _hover: { color: "gold" },
} as const;

export function Footer() {
  const { t, formatNumber } = useTranslate();
  return (
    <Box as="footer" bg="navy" color="ivory" pt="20">
      <SiteContainer>
        <Grid
          templateColumns={{ base: "1fr 1fr", lg: "2.3fr 1fr 1.2fr 1.4fr" }}
          gap={{ base: "8", lg: "14" }}
          pb="16"
        >
          <Box gridColumn={{ base: "1 / -1", lg: "auto" }}>
            <Brand light />
            <Text mt="7" maxW="290px" fontSize="sm" lineHeight="2" color="whiteAlpha.700">
              {t("footer.tagline")}
              <br />
              {t("footer.taglineMore")}
            </Text>
          </Box>
          <Box>
            <Text {...columnTitleProps}>{t("footer.navigation")}</Text>
            {nav.map((item) => (
              <Flex asChild key={item.to} {...itemProps}>
                <Link to={item.to}>{t(item.label)}</Link>
              </Flex>
            ))}
          </Box>
          <Box>
            <Text {...columnTitleProps}>{t("footer.destinations")}</Text>
            {destinations.map((region) => (
              <Flex asChild key={region} {...itemProps}>
                <Link to="/tours" search={{ region }}>
                  {t(`regions.${region}`)}
                </Link>
              </Flex>
            ))}
          </Box>
          <Box>
            <Text {...columnTitleProps}>{t("footer.contacts")}</Text>
            <Text mb="3.5" fontSize="sm" color="whiteAlpha.800">
              {t("footer.contactsNote")}
            </Text>
            <ChakraLink href="mailto:hello@pharaohspath.ru" display="block" {...itemProps}>
              hello@pharaohspath.ru
            </ChakraLink>
            <Text mb="3.5" fontSize="sm" color="whiteAlpha.800">
              {t("footer.daily")}
            </Text>
            <Flex asChild align="center" gap="1" {...itemProps} mb="0">
              <Link to="/contacts">
                {t("footer.write")} <ArrowUpRight size={15} />
              </Link>
            </Flex>
          </Box>
        </Grid>
        <Flex
          justify="space-between"
          gap="5"
          direction={{ base: "column", md: "row" }}
          py="6"
          borderTopWidth="1px"
          borderColor="whiteAlpha.300"
          fontSize="11px"
          color="whiteAlpha.600"
        >
          <span>{t("footer.rights", { year: formatNumber(2026, { useGrouping: false }) })}</span>
          <span>{t("footer.motto")}</span>
        </Flex>
      </SiteContainer>
    </Box>
  );
}
