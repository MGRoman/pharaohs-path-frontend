import {
  Box,
  Container,
  Flex,
  type BoxProps,
  type ContainerProps,
  type FlexProps,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

export function SiteContainer(props: ContainerProps) {
  return <Container maxW="1320px" px={{ base: "4", md: "6" }} {...props} />;
}

/** Underlined call-to-action; wrap a single router `<Link>`. */
export function TextLink(props: FlexProps) {
  return (
    <Flex
      asChild
      align="center"
      gap="2"
      w="fit-content"
      borderBottomWidth="1px"
      borderColor="gold"
      pb="2"
      fontSize="xs"
      fontWeight="700"
      transition="color .3s"
      _hover={{ color: "gold" }}
      {...props}
    />
  );
}

export function Eyebrow({
  children,
  color = "gold",
}: {
  children: ReactNode;
  color?: BoxProps["color"];
}) {
  return (
    <Flex
      align="center"
      gap="13px"
      textTransform="uppercase"
      letterSpacing="0.18em"
      fontSize="11px"
      fontWeight="700"
      color={color}
    >
      <Box as="span" w="28px" h="1px" bg="currentColor" />
      {children}
    </Flex>
  );
}
