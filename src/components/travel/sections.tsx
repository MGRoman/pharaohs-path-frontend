import { Accordion, Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { faq, testimonials } from "@/data/content";
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
          <Eyebrow>Следующий шаг</Eyebrow>
          <Text
            as="h2"
            fontFamily="heading"
            fontWeight="500"
            fontSize={{ base: "44px", md: "72px" }}
            lineHeight="1.04"
            my="4"
          >
            Ваш Египет начинается здесь
          </Text>
          <Text fontSize="sm" color="whiteAlpha.800">
            Расскажите, о каком путешествии вы мечтаете. Остальное мы продумаем вместе.
          </Text>
        </Box>
        <Button asChild {...goldProps} flexShrink={0}>
          <Link to="/booking">
            Подобрать путешествие <ArrowUpRight size={18} />
          </Link>
        </Button>
      </SiteContainer>
    </Box>
  );
}

export function FAQ() {
  return (
    <Box as="section" bg="sand" py={{ base: "16", md: "28" }}>
      <SiteContainer
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }}
        gap={{ base: "8", lg: "24" }}
      >
        <Box>
          <Eyebrow>Вопросы и ответы</Eyebrow>
          <Text
            as="h2"
            fontFamily="heading"
            fontWeight="500"
            fontSize={{ base: "45px", md: "72px" }}
            lineHeight="1.04"
            my="5"
          >
            Перед путешествием
          </Text>
          <Text color="mist" maxW="350px" fontSize="sm" lineHeight="1.8">
            Мы собрали ответы на вопросы, которые помогут вам увереннее планировать поездку.
          </Text>
          <Button asChild variant="outline" mt="6" borderRadius="2px">
            <Link to="/contacts">
              Задать свой вопрос <ArrowUpRight size={16} />
            </Link>
          </Button>
        </Box>
        <Accordion.Root collapsible>
          {faq.map(([question, answer], index) => (
            <Accordion.Item key={question} value={`item-${index}`} borderColor="line">
              <Accordion.ItemTrigger py="5" fontSize="sm" textAlign="left">
                {question}
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody fontSize="xs" lineHeight="1.8" color="mist" pb="4">
                  {answer}
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
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const touchX = useRef(0);

  useEffect(() => {
    if (pause) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6500);
    return () => clearInterval(timer);
  }, [pause]);

  const item = testimonials[index] ?? testimonials[0];

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
        if (Math.abs(dx) > 45)
          setIndex((i) => (i + (dx < 0 ? 1 : testimonials.length - 1)) % testimonials.length);
      }}
    >
      <SiteContainer>
        <SectionHeading eyebrow="Впечатления" title="Истории наших путешественников" />
        <Flex
          key={item?.name}
          maxW="900px"
          mx="auto"
          mt="8"
          gap="5"
          direction={{ base: "column", md: "row" }}
          className="rise-in"
        >
          <Text
            fontFamily="heading"
            fontSize="180px"
            lineHeight="0.8"
            color="gold"
            h={{ base: "50px", md: "auto" }}
            overflow="hidden"
          >
            “
          </Text>
          <Box animation="rise-in .55s cubic-bezier(.22,1,.36,1)">
            <Text color="gold" letterSpacing="5px" fontSize="sm" aria-label="5 из 5 звёзд">
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
              {item?.text}
            </Text>
            <Flex align="center" gap="3">
              <Flex
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
                {item?.name.slice(0, 1)}
              </Flex>
              <Box>
                <Text fontSize="xs" fontWeight="700">
                  {item?.name}
                </Text>
                <Text fontSize="11px" color="mist" mt="1">
                  {item?.city} · {item?.tour}
                </Text>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Flex maxW="790px" mx="auto" mt="8" justify="space-between" align="center">
          <Flex>
            {testimonials.map((_, dot) => (
              <IconButton
                key={dot}
                variant="ghost"
                aria-label={`Показать отзыв ${dot + 1}`}
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
              aria-label="Предыдущий отзыв"
              onClick={() => {
                setIndex((index + testimonials.length - 1) % testimonials.length);
                setPause(true);
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              variant="outline"
              aria-label="Следующий отзыв"
              onClick={() => {
                setIndex((index + 1) % testimonials.length);
                setPause(true);
              }}
            >
              <ChevronRight />
            </IconButton>
          </Flex>
        </Flex>
      </SiteContainer>
    </Box>
  );
}
