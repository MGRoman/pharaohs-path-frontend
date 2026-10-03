import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Flex,
  IconButton,
  Image,
  Portal,
  Text,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageIntro, ReadyCTA } from "@/components/travel/site";
import { SiteContainer } from "@/components/travel/ui";
import { gallery } from "@/data/content";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Галерея Египта — Pharaoh's Path" },
      {
        name: "description",
        content: "Пирамиды, Нил, древние храмы и Красное море в фотографиях наших маршрутов.",
      },
      { property: "og:title", content: "Галерея Египта — Pharaoh's Path" },
      { property: "og:description", content: "Откройте Египет в фотографиях наших путешествий." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

const categories = ["Все", "Пирамиды", "Каир", "Луксор", "Нил", "Красное море", "Пустыня"];

function Gallery() {
  const [category, setCategory] = useState("Все");
  const [selected, setSelected] = useState<number | null>(null);
  const touchX = useRef(0);
  const visible = gallery.filter((item) => category === "Все" || item.category === category);
  const current = selected === null ? undefined : visible[selected];

  function step(delta: number) {
    setSelected((index) =>
      index === null ? null : (index + delta + visible.length) % visible.length,
    );
  }

  return (
    <Box>
      <PageIntro
        eyebrow="Визуальный дневник"
        title="Моменты Египта"
        text="Есть места, которые невозможно объяснить словами. Их можно только почувствовать."
      />
      <SiteContainer pb="24">
        <Flex role="group" aria-label="Категории фотографий" gap="2" wrap="wrap" mb="7">
          {categories.map((item) => (
            <Button
              key={item}
              aria-pressed={category === item}
              variant="outline"
              borderRadius="0"
              minH="38px"
              fontSize="11px"
              bg={category === item ? "navy" : "transparent"}
              color={category === item ? "ivory" : "navy"}
              borderColor={category === item ? "navy" : "line"}
              onClick={() => {
                setCategory(item);
                setSelected(null);
              }}
            >
              {item}
            </Button>
          ))}
        </Flex>
        <Box
          css={{
            columnCount: 3,
            columnGap: "20px",
            "@media (max-width: 640px)": { columnCount: 2, columnGap: "10px" },
          }}
        >
          {visible.map((item, index) => (
            <Button
              unstyled
              type="button"
              key={`${item.title}-${index}`}
              display="block"
              w="100%"
              h="auto"
              mb="5"
              p="0"
              border="0"
              bg="transparent"
              textAlign="left"
              cursor="pointer"
              position="relative"
              overflow="hidden"
              css={{ breakInside: "avoid" }}
              aria-label={`Открыть: ${item.title}`}
              onClick={() => setSelected(index)}
              _hover={{ "& img": { transform: "scale(1.04)" } }}
            >
              <Image
                src={item.image}
                alt={item.title}
                w="100%"
                minH="240px"
                objectFit="cover"
                loading="lazy"
                transition="transform .7s cubic-bezier(.22,1,.36,1)"
                css={{
                  aspectRatio: index % 4 === 0 ? "4 / 5" : index % 4 === 1 ? "4 / 3" : "1 / 1",
                }}
              />
              <Text
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                px="4"
                pt="8"
                pb="4"
                color="ivory"
                fontSize="xs"
                css={{ background: "linear-gradient(transparent, oklch(0.12 0.02 260 / 0.7))" }}
              >
                {item.title}
              </Text>
            </Button>
          ))}
        </Box>
      </SiteContainer>
      <Dialog.Root
        open={current !== undefined}
        onOpenChange={(details) => !details.open && setSelected(null)}
        size="full"
        motionPreset="none"
      >
        <Portal>
          <Dialog.Backdrop bg="oklch(0.08 0.015 260 / 0.97)" />
          <Dialog.Positioner>
            <Dialog.Content
              bg="transparent"
              boxShadow="none"
              color="ivory"
              alignItems="center"
              justifyContent="center"
              p={{ base: "16", md: "20" }}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") step(1);
                if (event.key === "ArrowLeft") step(-1);
              }}
              onTouchStart={(event) => {
                touchX.current = event.touches[0]?.clientX ?? 0;
              }}
              onTouchEnd={(event) => {
                const dx = (event.changedTouches[0]?.clientX ?? 0) - touchX.current;
                if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
              }}
            >
              <Dialog.Title srOnly>Просмотр фотографии</Dialog.Title>
              <Dialog.CloseTrigger asChild top="4" insetEnd="4">
                <CloseButton aria-label="Закрыть" color="ivory" _hover={{ bg: "whiteAlpha.200" }} />
              </Dialog.CloseTrigger>
              <IconButton
                aria-label="Предыдущая фотография"
                variant="ghost"
                color="ivory"
                _hover={{ bg: "whiteAlpha.200" }}
                position="absolute"
                left="3"
                top="50%"
                transform="translateY(-50%)"
                onClick={() => step(-1)}
              >
                <ChevronLeft />
              </IconButton>
              {current && (
                <Image
                  key={current.image}
                  src={current.image}
                  alt={current.title}
                  maxW="100%"
                  maxH="calc(100svh - 140px)"
                  objectFit="contain"
                  className="rise-in"
                />
              )}
              <IconButton
                aria-label="Следующая фотография"
                variant="ghost"
                color="ivory"
                _hover={{ bg: "whiteAlpha.200" }}
                position="absolute"
                right="3"
                top="50%"
                transform="translateY(-50%)"
                onClick={() => step(1)}
              >
                <ChevronRight />
              </IconButton>
              <Dialog.Description
                position="absolute"
                bottom="5"
                fontSize="xs"
                color="ivory"
                aria-live="polite"
              >
                {current?.title} · {(selected ?? 0) + 1} / {visible.length}
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <ReadyCTA />
    </Box>
  );
}
