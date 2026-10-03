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
import { useBudgetLabel } from "@/components/travel/use-budget-label";
import {
  budgets,
  durations,
  inRange,
  regions,
  tourTypes,
  type Budget,
  type Duration,
  type Region,
  type TourType,
} from "@/data/content";
import { getTranslator, useContent, useTranslate } from "@/i18n";
import { seo } from "@/lib/seo";

type Search = { region?: Region; budget?: Budget; date?: string; travelers?: string };
type Sort = "popular" | "price" | "duration";

const budgetKeys = Object.keys(budgets) as Budget[];
const durationKeys = Object.keys(durations) as Duration[];

const oneOf = <T extends string>(value: unknown, allowed: readonly T[]): value is T =>
  (allowed as readonly unknown[]).includes(value);

export const Route = createFileRoute("/tours/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    ...(oneOf(search["region"], regions) && { region: search["region"] }),
    ...(oneOf(search["budget"], budgetKeys) && { budget: search["budget"] }),
    ...(typeof search["date"] === "string" && { date: search["date"] }),
    ...(typeof search["travelers"] === "string" && { travelers: search["travelers"] }),
  }),
  head: ({ match }) => {
    const { t } = getTranslator(match.context.locale);
    return seo({
      locale: match.context.locale,
      title: t("meta.pageTitle", { title: t("meta.tours.title") }),
      description: t("meta.tours.description"),
      path: "/tours",
    });
  },
  component: Tours,
});

type Sortable = { price: number; days: number; rating: number };

const sorters: Record<Sort, (a: Sortable, b: Sortable) => number> = {
  popular: (a, b) => b.rating - a.rating,
  price: (a, b) => a.price - b.price,
  duration: (a, b) => a.days - b.days,
};

function Tours() {
  const { t } = useTranslate();
  const { tours } = useContent();
  const budgetLabel = useBudgetLabel();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [type, setType] = useState<TourType | "">("");
  const [duration, setDuration] = useState<Duration | "">("");
  const [budget, setBudget] = useState<Budget | "">(search.budget ?? "");
  const region = search.region;
  const [sort, setSort] = useState<Sort>("popular");
  const [mobile, setMobile] = useState(false);

  const filtered = tours
    .filter(
      (tour) =>
        (!type || tour.type === type) &&
        (!region || tour.region === region) &&
        (!duration || inRange(tour.days, durations[duration])) &&
        (!budget || inRange(tour.price, budgets[budget])),
    )
    .sort(sorters[sort]);

  function reset() {
    setType("");
    setDuration("");
    setBudget("");
    navigate({ to: "/tours", search: {} });
  }

  const renderControls = (scope: string) => (
    <>
      <FilterGroup
        title={t("tours.type")}
        name={`${scope}-tour-type`}
        value={type}
        options={[
          ["", t("tours.allTypes")],
          ...tourTypes.map((key) => [key, t(`tourTypes.${key}`)] as const),
        ]}
        onChange={setType}
      />
      <FilterGroup
        title={t("tours.duration")}
        name={`${scope}-duration`}
        value={duration}
        options={[
          ["", t("durations.any")],
          ...durationKeys.map((key) => [key, t(`durations.${key}`)] as const),
        ]}
        onChange={setDuration}
      />
      <FilterGroup
        title={t("tours.price")}
        name={`${scope}-price`}
        value={budget}
        options={[
          ["", t("tours.anyPrice")],
          ...budgetKeys.map((key) => [key, budgetLabel(key)] as const),
        ]}
        onChange={setBudget}
      />
      <Button variant="ghost" mt="4" px="0" onClick={reset}>
        {t("tours.reset")}
      </Button>
    </>
  );

  return (
    <Box>
      <PageIntro eyebrow={t("tours.eyebrow")} title={t("tours.title")} text={t("tours.text")} />
      <SiteContainer
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "230px minmax(0, 1fr)" }}
        gap={{ base: "5", lg: "12" }}
        pb="24"
      >
        <Box
          as="aside"
          aria-label={t("tours.filtersLabel")}
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
            <Text as="span" aria-live="polite">
              {t("tours.found", { count: filtered.length })}
              {region && ` · ${t(`regions.${region}`)}`}
            </Text>
            <Flex align="center" gap="2">
              <Button
                variant="outline"
                display={{ base: "inline-flex", lg: "none" }}
                borderRadius="2px"
                onClick={() => setMobile(true)}
              >
                <SlidersHorizontal size={15} /> {t("tours.filters")}
              </Button>
              <NativeSelect.Root w="180px">
                <NativeSelect.Field
                  aria-label={t("tours.sort")}
                  value={sort}
                  onChange={(event) => setSort(event.target.value as Sort)}
                  h="40px"
                  borderColor="line"
                  bg="ivory"
                  fontSize="11px"
                >
                  <option value="popular">{t("tours.sortPopular")}</option>
                  <option value="price">{t("tours.sortPrice")}</option>
                  <option value="duration">{t("tours.sortDuration")}</option>
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
                {t("tours.emptyTitle")}
              </Text>
              <Text color="mist" my="4">
                {t("tours.emptyText")}
              </Text>
              <Button {...goldProps} h="44px" onClick={reset}>
                {t("tours.reset")}
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
                  {t("tours.filters")}
                </Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>{renderControls("mobile")}</Drawer.Body>
              <Drawer.Footer>
                <Button {...goldProps} w="100%" onClick={() => setMobile(false)}>
                  {t("tours.show", { count: filtered.length })}
                </Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton aria-label={t("tours.closeFilters")} />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
}

function FilterGroup<T extends string>({
  title,
  name,
  value,
  options,
  onChange,
}: {
  title: string;
  name: string;
  value: T | "";
  options: readonly (readonly [value: T | "", label: string])[];
  onChange: (value: T | "") => void;
}) {
  return (
    <Box py="6" borderBottomWidth="1px" borderColor="line">
      <RadioGroup.Root
        name={name}
        value={value}
        onValueChange={(details) => onChange((details.value ?? "") as T | "")}
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
          {options.map(([option, label]) => (
            <RadioGroup.Item key={option || "all"} value={option}>
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
