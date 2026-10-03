import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Drawer,
  Flex,
  NativeSelect,
  Portal,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { SlidersHorizontal } from "lucide-react";
import { PageIntro, TourGrid } from "@/components/travel/site";
import { goldProps } from "@/components/travel/styles";
import { SiteContainer } from "@/components/travel/ui";
import { formatTrips, tours } from "@/data/content";

type Search = { region?: string; date?: string; travelers?: string; budget?: string };

export const Route = createFileRoute("/tours/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    ...(typeof search["region"] === "string" ? { region: search["region"] } : {}),
    ...(typeof search["date"] === "string" ? { date: search["date"] } : {}),
    ...(typeof search["travelers"] === "string" ? { travelers: search["travelers"] } : {}),
    ...(typeof search["budget"] === "string" ? { budget: search["budget"] } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Все путешествия — Pharaoh's Path" },
      {
        name: "description",
        content:
          "Авторские туры по Египту: исторические маршруты, круизы, море и индивидуальные путешествия.",
      },
      { property: "og:title", content: "Все путешествия — Pharaoh's Path" },
      {
        property: "og:description",
        content: "Найдите своё путешествие по Египту среди авторских маршрутов.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/tours" },
    ],
    links: [{ rel: "canonical", href: "/tours" }],
  }),
  component: Tours,
});

const types = ["Все", "Исторические", "Пляжные", "Круизы", "Приключения", "Индивидуальные"];
const lengths = [
  ["Все", ""],
  ["До 5 дней", "short"],
  ["5–8 дней", "medium"],
  ["8–14 дней", "long"],
  ["14+ дней", "extended"],
];
const budgets = [
  ["Любая цена", ""],
  ["До 75 000 ₽", "low"],
  ["75 000–120 000 ₽", "mid"],
  ["120 000–200 000 ₽", "high"],
  ["200 000+ ₽", "luxury"],
];

function Tours() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [type, setType] = useState("Все");
  const [length, setLength] = useState("");
  const [budget, setBudget] = useState(search.budget || "");
  const [sort, setSort] = useState("popular");
  const [mobile, setMobile] = useState(false);
  const [region, setRegion] = useState(search.region || "");

  const filtered = tours
    .filter(
      (tour) =>
        (type === "Все" || tour.type === type) &&
        (!region || tour.region === region) &&
        (!length ||
          (length === "short"
            ? tour.days <= 5
            : length === "medium"
              ? tour.days >= 5 && tour.days <= 8
              : length === "long"
                ? tour.days >= 8 && tour.days <= 14
                : tour.days >= 14)) &&
        (!budget ||
          (budget === "low"
            ? tour.price <= 75000
            : budget === "mid"
              ? tour.price > 75000 && tour.price <= 120000
              : budget === "high"
                ? tour.price > 120000 && tour.price <= 200000
                : tour.price > 200000)),
    )
    .sort((a, b) =>
      sort === "price"
        ? a.price - b.price
        : sort === "duration"
          ? a.days - b.days
          : Number(b.rating) - Number(a.rating),
    );

  function reset() {
    setType("Все");
    setLength("");
    setBudget("");
    setRegion("");
    navigate({ to: "/tours", search: {} });
  }

  const renderControls = (scope: string) => (
    <>
      <FilterGroup
        title="Тип путешествия"
        name={`${scope}-tour-type`}
        value={type}
        options={types.map((item) => [item, item])}
        onChange={setType}
      />
      <FilterGroup
        title="Продолжительность"
        name={`${scope}-duration`}
        value={length}
        options={lengths}
        onChange={setLength}
      />
      <FilterGroup
        title="Стоимость на человека"
        name={`${scope}-price`}
        value={budget}
        options={budgets}
        onChange={setBudget}
      />
      <Button variant="ghost" mt="4" px="0" onClick={reset}>
        Сбросить фильтры
      </Button>
    </>
  );

  return (
    <Box>
      <PageIntro
        eyebrow="Коллекция маршрутов"
        title="Все путешествия"
        text="Каждый маршрут — приглашение увидеть Египет глубже. Выберите то, что отзывается именно вам."
      />
      <SiteContainer
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "230px minmax(0, 1fr)" }}
        gap={{ base: "5", lg: "12" }}
        pb="24"
      >
        <Box
          as="aside"
          aria-label="Фильтры туров"
          display={{ base: "none", lg: "block" }}
          borderTopWidth="1px"
          borderColor="line"
        >
          {renderControls("desktop")}
        </Box>
        <Box>
          <Flex
            justify="space-between"
            align={{ base: "start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            gap="3"
            mb="6"
            fontSize="sm"
            color="mist"
          >
            <span>
              Найдено {formatTrips(filtered.length)}
              {region ? ` · ${region}` : ""}
            </span>
            <Flex align="center" gap="2">
              <Button
                variant="outline"
                display={{ base: "inline-flex", lg: "none" }}
                borderRadius="2px"
                onClick={() => setMobile(true)}
              >
                <SlidersHorizontal size={15} /> Фильтры
              </Button>
              <NativeSelect.Root w="180px">
                <NativeSelect.Field
                  id="sort"
                  aria-label="Сортировка"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  h="40px"
                  borderColor="line"
                  bg="ivory"
                  fontSize="11px"
                >
                  <option value="popular">По популярности</option>
                  <option value="price">По цене</option>
                  <option value="duration">По длительности</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Flex>
          </Flex>
          {filtered.length ? (
            <TourGrid items={filtered} />
          ) : (
            <Box textAlign="center" py="24" borderWidth="1px" borderColor="line">
              <Text as="h2" fontFamily="heading" fontWeight="500" fontSize="37px">
                По вашему запросу путешествий не найдено
              </Text>
              <Text color="mist" my="4">
                Попробуйте изменить параметры поиска.
              </Text>
              <Button {...goldProps} h="44px" onClick={reset}>
                Сбросить фильтры
              </Button>
            </Box>
          )}
        </Box>
      </SiteContainer>
      <Drawer.Root
        open={mobile}
        onOpenChange={(details) => setMobile(details.open)}
        placement="bottom"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content bg="ivory" maxH="85svh" borderTopRadius="lg">
              <Drawer.Header>
                <Drawer.Title fontFamily="heading" fontSize="32px" fontWeight="500">
                  Фильтры
                </Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>{renderControls("mobile")}</Drawer.Body>
              <Drawer.Footer>
                <Button {...goldProps} w="100%" onClick={() => setMobile(false)}>
                  Показать {formatTrips(filtered.length)}
                </Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton aria-label="Закрыть фильтры" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
}

function FilterGroup({
  title,
  name,
  value,
  options,
  onChange,
}: {
  title: string;
  name: string;
  value: string;
  options: string[][];
  onChange: (value: string) => void;
}) {
  return (
    <Box py="6" borderBottomWidth="1px" borderColor="line">
      <RadioGroup.Root
        name={name}
        value={value}
        onValueChange={(details) => onChange(details.value ?? "")}
      >
        <RadioGroup.Label
          display="block"
          fontSize="11px"
          fontWeight="500"
          textTransform="uppercase"
          letterSpacing="0.12em"
          mb="4"
        >
          {title}
        </RadioGroup.Label>
        <Flex direction="column" gap="3">
          {options.map(([label, option]) => (
            <RadioGroup.Item key={option || label} value={option ?? ""}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText fontSize="11px" color="mist">
                {label}
              </RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </Flex>
      </RadioGroup.Root>
    </Box>
  );
}
