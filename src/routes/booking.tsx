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
import { formatDays, formatPrice, tours } from "@/data/content";

type Search = { tour?: string };

export const Route = createFileRoute("/booking")({
  validateSearch: (search: Record<string, unknown>): Search =>
    typeof search["tour"] === "string" ? { tour: search["tour"] } : {},
  head: () => ({
    meta: [
      { title: "Бронирование путешествия — Pharaoh's Path" },
      {
        name: "description",
        content:
          "Выберите авторский тур по Египту и оформите демонстрационную заявку на путешествие.",
      },
      { property: "og:title", content: "Бронирование — Pharaoh's Path" },
      {
        property: "og:description",
        content: "Выберите путешествие и оставьте заявку на авторский тур по Египту.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/booking" },
    ],
    links: [{ rel: "canonical", href: "/booking" }],
  }),
  component: Booking,
});

const initial = {
  first: "",
  last: "",
  email: "",
  phone: "",
  travelers: "2",
  date: "",
  comment: "",
};
const labels = ["Выберите путешествие", "Данные путешественника", "Подтверждение"];
const fields = [
  ["first", "Имя", "text", "Ваше имя"],
  ["last", "Фамилия", "text", "Ваша фамилия"],
  ["email", "Электронная почта", "email", "name@example.ru"],
  ["phone", "Телефон", "tel", "+7 999 000-00-00"],
  ["travelers", "Количество путешественников", "number", "2"],
  ["date", "Желаемая дата", "date", ""],
] as const;

function Booking() {
  const search = Route.useSearch();
  const knownTour = search.tour && tours.some((tour) => tour.id === search.tour) ? search.tour : "";
  const [step, setStep] = useState(knownTour ? 2 : 1);
  const [tourId, setTourId] = useState(knownTour);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const tour = tours.find((item) => item.id === tourId);
  const count = Math.max(1, Number(form.travelers) || 1);

  function validate() {
    const next: Record<string, string> = {};
    if (!form.first.trim()) next["first"] = "Укажите имя";
    if (!form.last.trim()) next["last"] = "Укажите фамилию";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next["email"] = "Укажите корректный адрес почты";
    if (!/^\+?[\d\s()-]{10,}$/.test(form.phone))
      next["phone"] = "Укажите корректный номер телефона";
    if (!form.date) next["date"] = "Выберите дату";
    else if (form.date < new Date().toISOString().slice(0, 10))
      next["date"] = "Выберите будущую дату";
    if (!Number(form.travelers) || Number(form.travelers) < 1)
      next["travelers"] = "Укажите количество путешественников";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function next(event: FormEvent) {
    event.preventDefault();
    if (validate()) setStep(3);
  }

  return (
    <Box>
      <PageIntro
        eyebrow="Ваше путешествие"
        title="Заявка на путешествие"
        text="Несколько шагов — и мы сможем начать создавать ваш маршрут. Форма работает в демонстрационном режиме."
      />
      <SiteContainer
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 330px" }}
        gap={{ base: "8", lg: "16" }}
        pb="24"
      >
        <Box>
          <Flex gap="1" mb="10">
            {labels.map((label, index) => (
              <Box
                key={label}
                flex="1"
                borderTopWidth="2px"
                borderColor={step >= index + 1 ? "gold" : "line"}
                pt="3"
                fontSize="10px"
                color={step >= index + 1 ? "navy" : "mist"}
              >
                <Text as="span" fontWeight="800" mr="2">
                  0{index + 1}
                </Text>
                {label}
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
              {labels[step - 1]}
            </Text>
            <Text fontSize="xs" color="mist" mb="7" mt="3">
              {step === 1
                ? "Выберите маршрут, с которого начнётся ваша история."
                : step === 2
                  ? "Расскажите немного о себе — мы подготовим путешествие для вас."
                  : "Проверьте детали перед завершением."}
            </Text>
            {step === 1 && (
              <>
                <Flex direction="column" gap="3">
                  {tours.map((item) => (
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
                      textAlign="left"
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
                          {formatDays(item.days)} · от {formatPrice(item.price)}
                        </Text>
                      </Box>
                      {tourId === item.id && <Check size={18} />}
                    </Button>
                  ))}
                </Flex>
                <Flex justify="flex-end" mt="8">
                  <Button {...goldProps} disabled={!tourId} onClick={() => setStep(2)}>
                    Продолжить <ArrowRight size={16} />
                  </Button>
                </Flex>
              </>
            )}
            {step === 2 && (
              <chakra.form onSubmit={next} noValidate>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="4">
                  {fields.map(([key, label, type, placeholder]) => (
                    <Field.Root key={key} invalid={!!errors[key]} required gap="2">
                      <Field.Label {...fieldLabelProps}>{label}</Field.Label>
                      <Input
                        type={type}
                        placeholder={placeholder}
                        min={
                          key === "date"
                            ? new Date().toISOString().slice(0, 10)
                            : key === "travelers"
                              ? "1"
                              : undefined
                        }
                        max={key === "travelers" ? "20" : undefined}
                        value={form[key]}
                        {...fieldControlProps}
                        onChange={(event) => {
                          setForm({ ...form, [key]: event.target.value });
                          setErrors({ ...errors, [key]: "" });
                        }}
                      />
                      <Field.ErrorText fontSize="10px">{errors[key]}</Field.ErrorText>
                    </Field.Root>
                  ))}
                  <Field.Root gridColumn={{ md: "1 / -1" }} gap="2">
                    <Field.Label {...fieldLabelProps}>Комментарий</Field.Label>
                    <Textarea
                      placeholder="Пожелания к путешествию"
                      value={form.comment}
                      minH="110px"
                      {...fieldControlProps}
                      h="auto"
                      onChange={(event) => setForm({ ...form, comment: event.target.value })}
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
                    <ArrowLeft size={16} /> Назад
                  </Button>
                  <Button type="submit" {...goldProps}>
                    Продолжить <ArrowRight size={16} />
                  </Button>
                </Flex>
              </chakra.form>
            )}
            {step === 3 && (
              <>
                <Box>
                  {[
                    ["Путешествие", tour?.title],
                    [
                      "Дата",
                      new Date(form.date + "T00:00:00").toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }),
                    ],
                    ["Путешественники", String(count)],
                    ["Имя", `${form.first} ${form.last}`],
                    ["Стоимость от", formatPrice((tour?.price || 0) * count)],
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
                      <Text color="mist">{label}</Text>
                      <Text textAlign="right">{value}</Text>
                    </Flex>
                  ))}
                </Box>
                <Text color="mist" fontSize="sm" mt="5">
                  Демонстрационная заявка: данные никуда не отправляются.
                </Text>
                <Flex justify="space-between" gap="3" mt="8">
                  <Button variant="outline" borderRadius="2px" onClick={() => setStep(2)}>
                    <ArrowLeft size={16} /> Назад
                  </Button>
                  <Button {...goldProps} onClick={() => setSuccess(true)}>
                    Отправить заявку <ArrowRight size={16} />
                  </Button>
                </Flex>
              </>
            )}
          </Box>
        </Box>
        <Box
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
              {[
                ["Продолжительность", formatDays(tour.days)],
                ["Путешественники", String(count)],
                ["Стоимость от", `${formatPrice(tour.price)} / чел.`],
              ].map(([label, value]) => (
                <Flex
                  key={label}
                  justify="space-between"
                  borderBottomWidth="1px"
                  borderColor="line"
                  py="3"
                  fontSize="11px"
                >
                  <Text color="mist">{label}</Text>
                  <Text>{value}</Text>
                </Flex>
              ))}
              <Text fontFamily="heading" fontWeight="600" fontSize="31px" mt="5">
                от {formatPrice(tour.price * count)}
              </Text>
            </>
          ) : (
            <>
              <Text as="h3" fontFamily="heading" fontWeight="500" fontSize="31px">
                Ваше путешествие
              </Text>
              <Text color="mist" mt="3">
                Выберите маршрут, чтобы увидеть детали.
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
                <CloseButton aria-label="Закрыть" />
              </Dialog.CloseTrigger>
              <Text fontSize="50px" color="turquoise" aria-hidden="true">
                ✓
              </Text>
              <Dialog.Title fontFamily="heading" fontSize="4xl" fontWeight="500" mt="2">
                Ваша заявка принята
              </Dialog.Title>
              <Dialog.Description mt="3" fontSize="sm" lineHeight="1.8" color="mist">
                Мы свяжемся с вами в ближайшее время, чтобы подтвердить детали путешествия.
              </Dialog.Description>
              <Text mt="3" fontSize="sm" color="mist">
                Это демонстрация: ваши данные не были отправлены.
              </Text>
              <Button asChild {...goldProps} mt="6">
                <Link to="/">
                  Вернуться на главную <ArrowRight size={16} />
                </Link>
              </Button>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
