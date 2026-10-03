import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Star } from "lucide-react";
import { formatDays, formatPrice, tours, type Tour } from "@/data/content";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <Box
      as="article"
      bg="white"
      minW="0"
      transition="transform .55s cubic-bezier(.22,1,.36,1), box-shadow .55s cubic-bezier(.22,1,.36,1)"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "0 18px 35px oklch(0.19 0.025 258 / 0.1)",
        "& img": { transform: "scale(1.055)" },
      }}
    >
      <Box asChild display="block" position="relative" h="260px" overflow="hidden">
        <Link to="/tours/$id" params={{ id: tour.id }}>
          <Image
            src={tour.image}
            alt={tour.title}
            w="100%"
            h="100%"
            objectFit="cover"
            loading="lazy"
            transition="transform .8s cubic-bezier(.22,1,.36,1)"
          />
          <Box
            position="absolute"
            top="17px"
            left="17px"
            bg="ivory"
            color="navy"
            fontSize="10px"
            fontWeight="700"
            px="3"
            py="2"
          >
            {tour.type}
          </Box>
        </Link>
      </Box>
      <Box p="6">
        <Flex justify="space-between" gap="2" color="mist" fontSize="10px">
          <span>
            {formatDays(tour.days)} · {tour.region}
          </span>
          <Flex align="center" gap="1" color="gold" whiteSpace="nowrap">
            <Star size={14} fill="currentColor" /> {tour.rating}
          </Flex>
        </Flex>
        <Text as="h3" fontFamily="heading" fontSize="30px" fontWeight="500" lineHeight="1.1" my="4">
          <Link to="/tours/$id" params={{ id: tour.id }}>
            <Box as="span" _hover={{ color: "gold" }}>
              {tour.title}
            </Box>
          </Link>
        </Text>
        <Text fontSize="11px" color="mist" lineHeight="1.8" minH="60px">
          {tour.description}
        </Text>
        <Flex
          justify="space-between"
          align="end"
          borderTopWidth="1px"
          borderColor="line"
          pt="4"
          mt="5"
        >
          <Box>
            <Box as="small" fontSize="10px" color="mist">
              от
            </Box>
            <Box as="strong" fontFamily="heading" fontSize="25px" fontWeight="600" mx="1">
              {formatPrice(tour.price)}
            </Box>
            <Box as="small" fontSize="10px" color="mist">
              / чел.
            </Box>
          </Box>
          <IconButton
            asChild
            variant="outline"
            aria-label={`Подробнее: ${tour.title}`}
            borderRadius="2px"
          >
            <Link to="/tours/$id" params={{ id: tour.id }}>
              <ArrowUpRight size={18} />
            </Link>
          </IconButton>
        </Flex>
      </Box>
    </Box>
  );
}

export function TourGrid({ items = tours }: { items?: Tour[] }) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr", xl: "repeat(3, minmax(0, 1fr))" }}
      gap="6"
    >
      {items.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </Box>
  );
}
