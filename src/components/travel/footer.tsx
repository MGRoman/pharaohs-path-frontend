import { Box, Flex, Grid, Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";
import { nav } from "./nav";
import { SiteContainer } from "./ui";

const destinations = ["Каир", "Гиза", "Луксор", "Асуан", "Шарм-эль-Шейх", "Хургада"];

export function Footer() {
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
              Египет, который остаётся с вами.
              <br />
              Индивидуальные путешествия с вниманием к каждой детали.
            </Text>
          </Box>
          <Box>
            <Text
              as="h3"
              color="gold"
              fontSize="11px"
              textTransform="uppercase"
              letterSpacing="0.18em"
              mb="6"
            >
              Навигация
            </Text>
            {nav.map((item) => (
              <Flex
                asChild
                key={item.to}
                mb="3.5"
                fontSize="sm"
                color="whiteAlpha.800"
                _hover={{ color: "gold" }}
              >
                <Link to={item.to}>{item.label}</Link>
              </Flex>
            ))}
          </Box>
          <Box>
            <Text
              as="h3"
              color="gold"
              fontSize="11px"
              textTransform="uppercase"
              letterSpacing="0.18em"
              mb="6"
            >
              Направления
            </Text>
            {destinations.map((name) => (
              <Flex
                asChild
                key={name}
                mb="3.5"
                fontSize="sm"
                color="whiteAlpha.800"
                _hover={{ color: "gold" }}
              >
                <Link to="/tours">{name}</Link>
              </Flex>
            ))}
          </Box>
          <Box>
            <Text
              as="h3"
              color="gold"
              fontSize="11px"
              textTransform="uppercase"
              letterSpacing="0.18em"
              mb="6"
            >
              Контакты
            </Text>
            <Text mb="3.5" fontSize="sm" color="whiteAlpha.800">
              По вопросам путешествий
            </Text>
            <ChakraLink
              href="mailto:hello@pharaohspath.ru"
              display="block"
              mb="3.5"
              fontSize="sm"
              color="whiteAlpha.800"
              _hover={{ color: "gold" }}
            >
              hello@pharaohspath.ru
            </ChakraLink>
            <Text mb="3.5" fontSize="sm" color="whiteAlpha.800">
              Мы на связи каждый день
            </Text>
            <Flex
              asChild
              align="center"
              gap="1"
              fontSize="sm"
              color="whiteAlpha.800"
              _hover={{ color: "gold" }}
            >
              <Link to="/contacts">
                Написать нам <ArrowUpRight size={15} />
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
          <span>© 2026 Pharaoh's Path. Все права защищены.</span>
          <span>Путешествия с душой и смыслом</span>
        </Flex>
      </SiteContainer>
    </Box>
  );
}
