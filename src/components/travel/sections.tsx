import { Accordion, Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent, useTranslate } from "@/i18n";
import { goldProps } from "./styles";
import { Eyebrow, SiteContainer } from "./ui";

export function SectionHeading({
  eyebrow,
  title,
  aside,
}: {
  eyebrow: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align={{ base: "start", md: "end" }}
      gap="6"
      mb="10"
    >
      <Box>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Text
          as="h2"
          fontFamily="heading"
          fontWeight="500"
          lineHeight="1.04"
          fontSize={{ base: "40px", md: "72px" }}
          mt="5"
          maxW="760px"
        >
          {title}
        </Text>
      </Box>
      {aside}
    </Flex>
  );
}

export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <SiteContainer py={{ base: "16", md: "20" }} pb={{ base: "10", md: "14" }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Text
        as="h1"
        fontFamily="heading"
        fontWeight="500"
        lineHeight="1.04"
        fontSize={{ base: "46px", md: "104px" }}
        my="4"
      >
        {title}
      </Text>
      <Text color="mist" lineHeight="1.8" maxW="600px" fontSize="sm">
        {text}
      </Text>
    </SiteContainer>
  );
}

export function ReadyCTA() {
  const { t } = useTranslate();
  return (
    <Box as="section" bg="navy" color="ivory" py="20">
      <SiteContainer
        display="flex"
        alignItems={{ base: "start", md: "end" }}
        justifyContent="space-between"
        gap="8"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box>
          <Eyebrow>{t("sections.cta.eyebrow")}</Eyebrow>
          <Text
            as="h2"
            fontFamily="heading"
            fontWeight="500"
            fontSize={{ base: "44px", md: "72px" }}
            lineHeight="1.04"
            my="4"
          >
            {t("sections.cta.title")}
          </Text>
          <Text fontSize="sm" color="whiteAlpha.800">
            {t("sections.cta.text")}
          </Text>
        </Box>
        <Button asChild {...goldProps} flexShrink={0}>
          <Link to="/booking">
            {t("sections.cta.button")} <ArrowUpRight size={18} />
          </Link>
        </Button>
      </SiteContainer>
    </Box>
  );
}

export function FAQ() {
  const { t } = useTranslate();
  const { faq } = useContent();
  return (
    <Box as="section" bg="sand" py={{ base: "16", md: "28" }}>
      <SiteContainer
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }}
        gap={{ base: "8", lg: "24" }}
      >
        <Box>
          <Eyebrow>{t("sections.faq.eyebrow")}</Eyebrow>
          <Text
            as="h2"
            fontFamily="heading"
            fontWeight="500"
            fontSize={{ base: "45px", md: "72px" }}
            lineHeight="1.04"
            my="5"
          >
            {t("sections.faq.title")}
          </Text>
          <Text color="mist" maxW="350px" fontSize="sm" lineHeight="1.8">
            {t("sections.faq.text")}
          </Text>
          <Button asChild variant="outline" mt="6" borderRadius="2px">
            <Link to="/contacts">
              {t("sections.faq.ask")} <ArrowUpRight size={16} />
            </Link>
          </Button>
        </Box>
        <Accordion.Root collapsible>
          {faq.map((item) => (
            <Accordion.Item key={item.id} value={item.id} borderColor="line">
              <Accordion.ItemTrigger py="5" fontSize="sm" textAlign="start">
                {item.question}
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody fontSize="xs" lineHeight="1.8" color="mist" pb="4">
                  {item.answer}
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </SiteContainer>
    </Box>
  );
}

export function Testimonials() {
  const { t, dir } = useTranslate();
  const { testimonials } = useContent();
  const total = testimonials.length;
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const touchX = useRef(0);

  useEffect(() => {
    if (pause) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % total), 6500);
    return () => clearInterval(timer);
  }, [pause, total]);

  const go = (delta: number) => {
    setIndex((i) => (i + delta + total) % total);
    setPause(true);
  };

  const item = testimonials[index] ?? testimonials[0];
  if (!item) return null;

  return (
    <Box
      as="section"
      py={{ base: "16", md: "28" }}
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onTouchStart={(event) => {
        touchX.current = event.touches[0]?.clientX ?? 0;
        setPause(true);
      }}
      onTouchEnd={(event) => {
        const dx = (event.changedTouches[0]?.clientX ?? 0) - touchX.current;
        if (Math.abs(dx) < 45) return;
        const towardsStart = dir === "rtl" ? dx > 0 : dx < 0;
        go(towardsStart ? 1 : -1);
      }}
    >
      <SiteContainer>
        <SectionHeading
          eyebrow={t("sections.testimonials.eyebrow")}
          title={t("sections.testimonials.title")}
        />
        <Flex
          key={item.id}
          maxW="900px"
          mx="auto"
          mt="8"
          gap="5"
          direction={{ base: "column", md: "row" }}
          className="rise-in"
        >
          <Text
            aria-hidden
            fontFamily="heading"
            fontSize="180px"
            lineHeight="0.8"
            color="gold"
            h={{ base: "50px", md: "auto" }}
            overflow="hidden"
          >
            {dir === "rtl" ? "”" : "“"}
          </Text>
          <Box>
            <Text
              color="gold"
              letterSpacing="5px"
              fontSize="sm"
              role="img"
              aria-label={t("sections.testimonials.stars")}
            >
              ★★★★★
            </Text>
            <Text
              as="blockquote"
              fontFamily="heading"
              fontWeight="500"
              fontSize={{ base: "29px", md: "46px" }}
              lineHeight="1.27"
              my="6"
            >
              {item.text}
            </Text>
            <Flex align="center" gap="3">
              <Flex
                aria-hidden
                w="42px"
                h="42px"
                bg="sand"
                color="gold"
                align="center"
                justify="center"
                fontFamily="heading"
                fontSize="24px"
                fontWeight="600"
                borderRadius="full"
              >
                {item.name.slice(0, 1)}
              </Flex>
              <Box>
                <Text fontSize="xs" fontWeight="700">
                  {item.name}
                </Text>
                <Text fontSize="11px" color="mist" mt="1">
                  {item.city} · {item.tour}
                </Text>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Flex maxW="790px" mx="auto" mt="8" justify="space-between" align="center">
          <Flex>
            {testimonials.map((entry, dot) => (
              <IconButton
                key={entry.id}
                variant="ghost"
                aria-label={t("sections.testimonials.show", { index: dot + 1 })}
                aria-current={dot === index ? "true" : undefined}
                onClick={() => {
                  setIndex(dot);
                  setPause(true);
                }}
              >
                <Box
                  w={dot === index ? "17px" : "5px"}
                  h="5px"
                  bg={dot === index ? "gold" : "line"}
                  borderRadius="full"
                  transition="width .3s"
                />
              </IconButton>
            ))}
          </Flex>
          <Flex gap="2">
            <IconButton
              variant="outline"
              aria-label={t("sections.testimonials.previous")}
              onClick={() => go(-1)}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              variant="outline"
              aria-label={t("sections.testimonials.next")}
              onClick={() => go(1)}
            >
              <ChevronRight />
            </IconButton>
          </Flex>
        </Flex>
      </SiteContainer>
    </Box>
  );
}
