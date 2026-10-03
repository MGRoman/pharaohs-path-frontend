import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  Flex,
  Grid,
  Image,
  Input,
  Portal,
  Text,
  Textarea,
  chakra,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PageIntro } from "@/components/travel/site";
import { fieldControlProps, fieldLabelProps, goldProps } from "@/components/travel/styles";
import { SiteContainer } from "@/components/travel/ui";
import { tours, type TourId } from "@/data/content";
import { getTranslator, useContent, useTranslate, type MessageKey } from "@/i18n";
import { seo } from "@/lib/seo";

type Search = { tour?: TourId };

const isTourId = (id: unknown): id is TourId => tours.some((tour) => tour.id === id);

export const Route = createFileRoute("/booking")({
  validateSearch: (search: Record<string, unknown>): Search =>
    isTourId(search["tour"]) ? { tour: search["tour"] } : {},
  head: ({ match }) => {
    const { t } = getTranslator(match.context.locale);
    return seo({
      locale: match.context.locale,
      title: t("meta.pageTitle", { title: t("meta.booking.title") }),
      description: t("meta.booking.description"),
      path: "/booking",
    });
  },
  component: Booking,
});

const steps = ["choose", "details", "confirm"] as const;

const initial = {
  first: "",
  last: "",
  email: "",
  phone: "",
  travelers: "2",
  date: "",
  comment: "",
};
type Form = typeof initial;
type FieldName = Exclude<keyof Form, "comment">;
type Errors = Partial<Record<FieldName, MessageKey>>;

const fields = [
  { name: "first", type: "text", autoComplete: "given-name" },
  { name: "last", type: "text", autoComplete: "family-name" },
  { name: "email", type: "email", autoComplete: "email", ltr: true },
  { name: "phone", type: "tel", autoComplete: "tel", ltr: true },
  { name: "travelers", type: "number", min: "1", max: "20" },
  { name: "date", type: "date" },
] as const satisfies readonly {
  name: FieldName;
  type: string;
  autoComplete?: string;
  ltr?: boolean;
  min?: string;
  max?: string;
}[];

const today = () => new Date().toISOString().slice(0, 10);

function validate(form: Form): Errors {
  const errors: Errors = {};
  if (!form.first.trim()) errors.first = "booking.errors.first";
  if (!form.last.trim()) errors.last = "booking.errors.last";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "booking.errors.email";
  if (!/^\+?[\d\s()-]{10,}$/.test(form.phone)) errors.phone = "booking.errors.phone";
  if (!form.date) errors.date = "booking.errors.date";
  else if (form.date < today()) errors.date = "booking.errors.dateFuture";
  if (!(Number(form.travelers) >= 1)) errors.travelers = "booking.errors.travelers";
  return errors;
}

function Booking() {
  const { t, formatDate, formatNumber, formatPrice } = useTranslate();
  const { tours: localized } = useContent();
  const search = Route.useSearch();
  const [step, setStep] = useState(search.tour ? 2 : 1);
  const [tourId, setTourId] = useState<TourId | undefined>(search.tour);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);
  const tour = localized.find((item) => item.id === tourId);
  const count = Math.max(1, Number(form.travelers) || 1);
  const current = steps[step - 1] ?? "choose";

  function next(event: FormEvent) {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) setStep(3);
  }

  function update(name: keyof Form, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name !== "comment") setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  return (
    <Box>
      <PageIntro
        eyebrow={t("booking.eyebrow")}
        title={t("booking.title")}
        text={t("booking.text")}
      />
      <SiteContainer
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 330px" }}
        gap={{ base: "8", lg: "16" }}
        pb="24"
      >
        <Box>
          <Flex as="ol" aria-label={t("booking.progress")} listStyleType="none" gap="1" mb="10">
            {steps.map((key, index) => (
              <Box
                as="li"
                key={key}
                flex="1"
                borderTopWidth="2px"
                borderColor={step >= index + 1 ? "gold" : "line"}
                pt="3"
                fontSize="10px"
                color={step >= index + 1 ? "navy" : "mist"}
                aria-current={step === index + 1 ? "step" : undefined}
              >
                <Text as="span" fontWeight="800" me="2">
                  {formatNumber(index + 1, { minimumIntegerDigits: 2 })}
                </Text>
                {t(`booking.steps.${key}.title`)}
              </Box>
            ))}
          </Flex>
          <Box key={step} className="rise-in">
            <Text
              as="h2"
              fontFamily="heading"
              fontWeight="500"
              fontSize={{ base: "36px", md: "47px" }}
            >
              {t(`booking.steps.${current}.title`)}
            </Text>
            <Text fontSize="xs" color="mist" mb="7" mt="3">
              {t(`booking.steps.${current}.hint`)}
            </Text>
            {step === 1 && (
              <>
                <Flex direction="column" gap="3">
                  {localized.map((item) => (
                    <Button
                      unstyled
                      type="button"
                      key={item.id}
                      display="grid"
                      h="auto"
                      minH="95px"
                      gridTemplateColumns="100px minmax(0, 1fr) auto"
                      gap="4"
                      alignItems="center"
                      textAlign="start"
                      w="100%"
                      borderWidth="1px"
                      borderColor={tourId === item.id ? "gold" : "line"}
                      bg={tourId === item.id ? "sand" : "white"}
                      p="2"
                      cursor="pointer"
                      aria-pressed={tourId === item.id}
                      onClick={() => setTourId(item.id)}
                      transition="border-color .3s, transform .3s, background .3s"
                      _hover={{ borderColor: "gold", transform: "translateY(-2px)" }}
                    >
                      <Image
                        src={item.image}
                        alt=""
                        w="100px"
                        h="77px"
                        objectFit="cover"
                        loading="lazy"
                      />
                      <Box minW="0">
                        <Text fontFamily="heading" fontWeight="500" fontSize="23px">
                          {item.title}
                        </Text>
                        <Text fontSize="10px" color="mist" mt="1">
                          {t("common.days", { count: item.days })} ·{" "}
                          {t("common.priceFrom", { price: formatPrice(item.price) })}
                        </Text>
                      </Box>
                      {tourId === item.id && <Check size={18} aria-hidden />}
                    </Button>
                  ))}
                </Flex>
                <Flex justify="flex-end" mt="8">
                  <Button {...goldProps} disabled={!tourId} onClick={() => setStep(2)}>
                    {t("common.continue")} <ArrowRight size={16} />
                  </Button>
                </Flex>
              </>
            )}
            {step === 2 && (
              <chakra.form onSubmit={next} noValidate>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="4">
                  {fields.map((field) => {
                    const error = errors[field.name];
                    return (
                      <Field.Root key={field.name} invalid={!!error} required gap="2">
                        <Field.Label {...fieldLabelProps}>
                          {t(`booking.fields.${field.name}.label`)}
                        </Field.Label>
                        <Input
                          type={field.type}
                          dir={"ltr" in field ? "ltr" : undefined}
                          autoComplete={"autoComplete" in field ? field.autoComplete : undefined}
                          placeholder={t(`booking.fields.${field.name}.placeholder`)}
                          min={
                            field.name === "date" ? today() : "min" in field ? field.min : undefined
                          }
                          max={"max" in field ? field.max : undefined}
                          value={form[field.name]}
                          {...fieldControlProps}
                          onChange={(event) => update(field.name, event.target.value)}
                        />
                        <Field.ErrorText fontSize="10px">{error && t(error)}</Field.ErrorText>
                      </Field.Root>
                    );
                  })}
                  <Field.Root gridColumn={{ md: "1 / -1" }} gap="2">
                    <Field.Label {...fieldLabelProps}>
                      {t("booking.fields.comment.label")}
                    </Field.Label>
                    <Textarea
                      placeholder={t("booking.fields.comment.placeholder")}
                      value={form.comment}
                      minH="110px"
                      {...fieldControlProps}
                      h="auto"
                      onChange={(event) => update("comment", event.target.value)}
                    />
                  </Field.Root>
                </Grid>
                <Flex justify="space-between" gap="3" mt="8">
                  <Button
                    type="button"
                    variant="outline"
                    borderRadius="2px"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft size={16} /> {t("common.back")}
                  </Button>
                  <Button type="submit" {...goldProps}>
                    {t("common.continue")} <ArrowRight size={16} />
                  </Button>
                </Flex>
              </chakra.form>
            )}
            {step === 3 && (
              <>
                <Box as="dl">
                  {[
                    [t("booking.summary.trip"), tour?.title],
                    [t("booking.summary.date"), form.date && formatDate(form.date)],
                    [t("booking.summary.travelers"), formatNumber(count)],
                    [t("booking.summary.name"), `${form.first} ${form.last}`],
                    [t("booking.summary.total"), formatPrice((tour?.price ?? 0) * count)],
                  ].map(([label, value]) => (
                    <Flex
                      key={label}
                      justify="space-between"
                      gap="4"
                      borderBottomWidth="1px"
                      borderColor="line"
                      py="3"
                      fontSize="11px"
                    >
                      <Text as="dt" color="mist">
                        {label}
                      </Text>
                      <Text as="dd" textAlign="end">
                        {value}
                      </Text>
                    </Flex>
                  ))}
                </Box>
                <Text color="mist" fontSize="sm" mt="5">
                  {t("booking.demoNote")}
                </Text>
                <Flex justify="space-between" gap="3" mt="8">
                  <Button variant="outline" borderRadius="2px" onClick={() => setStep(2)}>
                    <ArrowLeft size={16} /> {t("common.back")}
                  </Button>
                  <Button {...goldProps} onClick={() => setSuccess(true)}>
                    {t("booking.submit")} <ArrowRight size={16} />
                  </Button>
                </Flex>
              </>
            )}
          </Box>
        </Box>
        <Box
          as="aside"
          bg="sand"
          p="7"
          alignSelf="start"
          position={{ base: "static", lg: "sticky" }}
          top="110px"
        >
          {tour ? (
            <>
              <Image src={tour.image} alt={tour.title} w="100%" h="165px" objectFit="cover" />
              <Text as="h3" fontFamily="heading" fontWeight="500" fontSize="31px" my="4">
                {tour.title}
              </Text>
              <Box as="dl">
                {[
                  [t("booking.summary.duration"), t("common.days", { count: tour.days })],
                  [t("booking.summary.travelers"), formatNumber(count)],
                  [
                    t("booking.summary.total"),
                    `${formatPrice(tour.price)} ${t("common.perPerson")}`,
                  ],
                ].map(([label, value]) => (
                  <Flex
                    key={label}
                    justify="space-between"
                    borderBottomWidth="1px"
                    borderColor="line"
                    py="3"
                    fontSize="11px"
                  >
                    <Text as="dt" color="mist">
                      {label}
                    </Text>
                    <Text as="dd">{value}</Text>
                  </Flex>
                ))}
              </Box>
              <Text fontFamily="heading" fontWeight="600" fontSize="31px" mt="5">
                {t("common.priceFrom", { price: formatPrice(tour.price * count) })}
              </Text>
            </>
          ) : (
            <>
              <Text as="h3" fontFamily="heading" fontWeight="500" fontSize="31px">
                {t("booking.emptyTitle")}
              </Text>
              <Text color="mist" mt="3">
                {t("booking.emptyText")}
              </Text>
            </>
          )}
        </Box>
      </SiteContainer>
      <Dialog.Root
        open={success}
        onOpenChange={(details) => setSuccess(details.open)}
        placement="center"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content bg="ivory" p="8" maxW="md">
              <Dialog.CloseTrigger asChild>
                <CloseButton aria-label={t("common.close")} />
              </Dialog.CloseTrigger>
              <Text fontSize="50px" color="turquoise" aria-hidden="true">
                ✓
              </Text>
              <Dialog.Title fontFamily="heading" fontSize="4xl" fontWeight="500" mt="2">
                {t("booking.success.title")}
              </Dialog.Title>
              <Dialog.Description mt="3" fontSize="sm" lineHeight="1.8" color="mist">
                {t("booking.success.text")}
              </Dialog.Description>
              <Text mt="3" fontSize="sm" color="mist">
                {t("booking.success.demo")}
              </Text>
              <Button asChild {...goldProps} mt="6">
                <Link to="/">
                  {t("booking.success.home")} <ArrowRight size={16} />
                </Link>
              </Button>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
