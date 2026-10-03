import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  Box,
  Button,
  Field,
  Flex,
  Grid,
  Icon,
  Image,
  Input,
  NativeSelect,
  Text,
} from "@chakra-ui/react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { FAQ, ReadyCTA, SectionHeading, Testimonials, TourGrid } from "@/components/travel/site";
import {
  fieldControlProps,
  fieldLabelProps,
  goldProps,
  lineProps,
} from "@/components/travel/styles";
import { Eyebrow, SiteContainer } from "@/components/travel/ui";
import { gallery, images, tours } from "@/data/content";

const regions = [
  "Каир и Гиза",
  "Луксор",
  "Асуан",
  "Шарм-эль-Шейх",
  "Хургада",
  "Марса-Алам",
  "Несколько регионов",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pharaoh's Path — путешествия по Египту" },
      {
        name: "description",
        content: "Авторские путешествия по Египту: пирамиды, круизы по Нилу и Красное море.",
      },
      { property: "og:title", content: "Pharaoh's Path — путешествия по Египту" },
      {
        property: "og:description",
        content: "Авторские путешествия по Египту: пирамиды, круизы по Нилу и Красное море.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: images.giza },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [region, setRegion] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [budget, setBudget] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    navigate({ to: "/tours", search: { region, date, travelers, budget } });
  }

  return (
    <>
      <Box
        as="section"
        position="relative"
        h="95svh"
        minH="640px"
        maxH="1000px"
        color="ivory"
        display="flex"
        alignItems="center"
        overflow="hidden"
      >
        <Image
          src={images.giza}
          alt="Пирамиды Гизы в лучах закатного солнца"
          className="hero-photo"
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center 57%"
          fetchPriority="high"
        />
        <Box
          position="absolute"
          inset="0"
          css={{
            background:
              "linear-gradient(90deg, oklch(0.12 0.025 260 / 0.77) 0%, oklch(0.12 0.025 260 / 0.37) 55%, transparent 100%), linear-gradient(0deg, oklch(0.12 0.025 260 / 0.52), transparent 35%)",
          }}
        />
        <SiteContainer position="relative" zIndex="1" pt="16">
          <Box className="rise-in" animationDelay="0.08s">
            <Eyebrow>Искусство путешествовать по Египту</Eyebrow>
          </Box>
          <Text
            as="h1"
            className="rise-in"
            fontFamily="heading"
            fontWeight="500"
            fontSize={{ base: "58px", md: "118px" }}
            lineHeight="0.94"
            maxW="780px"
            my="6"
            animationDelay="0.16s"
          >
            Египет: там, где оживают легенды
          </Text>
          <Text
            className="rise-in"
            maxW="465px"
            fontSize={{ base: "sm", md: "md" }}
            lineHeight="1.8"
            color="whiteAlpha.900"
            animationDelay="0.26s"
          >
            Авторские путешествия от древних пирамид до коралловых рифов Красного моря.
          </Text>
          <Flex className="rise-in" gap="3" wrap="wrap" mt="8" animationDelay="0.36s">
            <Button asChild {...goldProps}>
              <Link to="/tours">
                Смотреть туры <ArrowUpRight size={17} />
              </Link>
            </Button>
            <Button asChild {...lineProps}>
              <Link to="/booking">
                Подобрать путешествие <ArrowRight size={17} />
              </Link>
            </Button>
          </Flex>
          <Flex
            className="rise-in"
            gap={{ base: "4", md: "10" }}
            mt={{ base: "12", md: "16" }}
            animationDelay="0.46s"
          >
            {[
              ["12+", "лет опыта"],
              ["4 800+", "путешественников"],
              ["35+", "маршрутов"],
            ].map(([value, label]) => (
              <Flex key={label} direction="column" borderLeftWidth="1px" borderColor="gold" pl="4">
                <Text
                  fontFamily="heading"
                  fontSize={{ base: "25px", md: "30px" }}
                  fontWeight="500"
                  lineHeight="1"
                >
                  {value}
                </Text>
                <Text fontSize="10px" color="whiteAlpha.800" mt="1.5">
                  {label}
                </Text>
              </Flex>
            ))}
          </Flex>
        </SiteContainer>
        <Flex
          display={{ base: "none", md: "flex" }}
          position="absolute"
          zIndex="1"
          right="6"
          bottom="9"
          direction="column"
          align="center"
          fontSize="10px"
          letterSpacing="0.2em"
          textTransform="uppercase"
          css={{ writingMode: "vertical-rl" }}
        >
          Листайте вниз{" "}
          <Icon boxSize="3" mt="3.5">
            <ArrowDown />
          </Icon>
        </Flex>
      </Box>

      <SiteContainer
        position="relative"
        zIndex="2"
        mt={{ base: "0", md: "-45px" }}
        className="rise-in"
      >
        <Grid
          as="form"
          onSubmit={submit}
          bg="white"
          p={{ base: "5", md: "6" }}
          boxShadow="0 20px 55px oklch(0.19 0.025 258 / 0.13)"
          templateColumns={{ base: "1fr", md: "1.4fr 1fr 0.8fr 1fr auto" }}
          gap="3.5"
          alignItems="end"
        >
          <SearchField label="Направление">
            <NativeSelect.Root>
              <NativeSelect.Field
                value={region}
                onChange={(event) => setRegion(event.target.value)}
                {...fieldControlProps}
              >
                <option value="">Любое направление</option>
                {regions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </SearchField>
          <SearchField label="Дата поездки">
            <Input
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              {...fieldControlProps}
            />
          </SearchField>
          <SearchField label="Путешественники">
            <Input
              type="number"
              min="1"
              max="20"
              value={travelers}
              onChange={(event) => setTravelers(event.target.value)}
              {...fieldControlProps}
            />
          </SearchField>
          <SearchField label="Бюджет на человека">
            <NativeSelect.Root>
              <NativeSelect.Field
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                {...fieldControlProps}
              >
                <option value="">Любой бюджет</option>
                <option value="low">До 75 000 ₽</option>
                <option value="mid">75 000–120 000 ₽</option>
                <option value="high">120 000–200 000 ₽</option>
                <option value="luxury">От 200 000 ₽</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </SearchField>
          <Button type="submit" {...goldProps} h="44px" px="5">
            Найти путешествие <ArrowRight size={16} />
          </Button>
        </Grid>
      </SiteContainer>

      <Box as="section" py={{ base: "16", md: "28" }}>
        <SiteContainer
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: "9", lg: "24" }}
          alignItems="center"
        >
          <Box position="relative" h={{ base: "420px", md: "610px" }}>
            <Image
              src={images.nile}
              alt="Парусная лодка на Ниле у Луксора"
              w="100%"
              h="100%"
              objectFit="cover"
              loading="lazy"
            />
            <Box
              display={{ base: "none", md: "block" }}
              position="absolute"
              w="35%"
              h="30%"
              borderLeftWidth="1px"
              borderBottomWidth="1px"
              borderColor="gold"
              bottom="-20px"
              left="-20px"
              pointerEvents="none"
            />
          </Box>
          <Box>
            <Eyebrow>О Pharaoh's Path</Eyebrow>
            <Text
              as="h2"
              fontFamily="heading"
              fontWeight="500"
              fontSize={{ base: "43px", md: "68px" }}
              lineHeight="1.07"
              my="6"
            >
              Мы показываем Египет не таким, каким его видят туристы, а таким, каким его запоминают.
            </Text>
            <Text color="mist" fontSize="sm" lineHeight="1.95" mb="4">
              Мы верим, что настоящее путешествие начинается там, где заканчивается готовый маршрут.
              Поэтому каждую поездку мы собираем вокруг вас — ваших интересов, ритма и мечты.
            </Text>
            <Text color="mist" fontSize="sm" lineHeight="1.95">
              Приватные встречи с историей, круизы по Нилу, дни у моря и простые моменты рядом с
              людьми, для которых Египет — дом. Всё это становится вашей личной историей.
            </Text>
            <Flex
              asChild
              align="center"
              gap="2"
              borderBottomWidth="1px"
              borderColor="gold"
              pb="2"
              fontSize="xs"
              fontWeight="700"
              mt="6"
              w="fit-content"
              _hover={{ color: "gold" }}
            >
              <Link to="/about">
                Узнать о нас <ArrowUpRight size={16} />
              </Link>
            </Flex>
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap="6"
              borderTopWidth="1px"
              borderColor="line"
              pt="7"
              mt="12"
            >
              {[
                ["12+", "лет опыта"],
                ["4 800+", "путешественников"],
                ["35+", "маршрутов"],
                ["24/7", "поддержка"],
              ].map(([value, label]) => (
                <Box key={label}>
                  <Text fontFamily="heading" fontSize="34px" fontWeight="500">
                    {value}
                  </Text>
                  <Text fontSize="10px" color="mist">
                    {label}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>
        </SiteContainer>
      </Box>

      <Box as="section" bg="sand" py={{ base: "16", md: "28" }}>
        <SiteContainer>
          <SectionHeading
            eyebrow="Авторские маршруты"
            title="Выберите свой Египет"
            aside={
              <Text color="mist" lineHeight="1.9" maxW="360px">
                От первых шагов среди пирамид до последнего заката у моря — найдите путешествие,
                которое станет вашим.
              </Text>
            }
          />
          <TourGrid items={tours} />
          <Flex justify="center" mt="10">
            <Button asChild variant="outline" borderRadius="2px" h="12" px="6">
              <Link to="/tours">
                Все путешествия <ArrowUpRight size={16} />
              </Link>
            </Button>
          </Flex>
        </SiteContainer>
      </Box>

      <Box as="section" py={{ base: "16", md: "28" }}>
        <SiteContainer>
          <SectionHeading
            eyebrow="Моменты путешествия"
            title="Египет в кадре"
            aside={
              <Flex
                asChild
                align="center"
                gap="2"
                borderBottomWidth="1px"
                borderColor="gold"
                pb="2"
                fontSize="xs"
                fontWeight="700"
                _hover={{ color: "gold" }}
              >
                <Link to="/gallery">
                  Смотреть галерею <ArrowUpRight size={16} />
                </Link>
              </Flex>
            }
          />
          <Grid
            templateColumns={{ base: "1.3fr 1fr", md: "1.25fr 1fr 0.8fr" }}
            gap={{ base: "2", md: "4" }}
            h={{ base: "280px", md: "430px" }}
            overflow="hidden"
          >
            {[gallery[2], gallery[4], gallery[5]].map((item, index) => (
              <Image
                key={item?.title ?? index}
                src={item?.image}
                alt={item?.title || "Египет"}
                w="100%"
                h="100%"
                objectFit="cover"
                loading="lazy"
                display={index === 2 ? { base: "none", md: "block" } : "block"}
                transition="transform .8s cubic-bezier(.22,1,.36,1)"
                _hover={{ transform: "scale(1.03)" }}
              />
            ))}
          </Grid>
        </SiteContainer>
      </Box>
      <Testimonials />
      <FAQ />
      <ReadyCTA />
    </>
  );
}

function SearchField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Field.Root gap="2">
      <Field.Label {...fieldLabelProps}>{label}</Field.Label>
      {children}
    </Field.Root>
  );
}
