import { Box, Flex, chakra } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { useTranslate } from "@/i18n";

export function Brand({ light = false }: { light?: boolean }) {
  const { t } = useTranslate();
  return (
    <Flex
      asChild
      align="center"
      gap="2.5"
      color={light ? "ivory" : "navy"}
      transition="color .4s cubic-bezier(.4,0,.2,1)"
      flexShrink={0}
      whiteSpace="nowrap"
    >
      <Link to="/" aria-label={t("nav.brandHome")}>
        <chakra.svg viewBox="0 0 44 44" fill="none" w="37px" h="37px" color="gold" aria-hidden>
          <path d="M4 35 22 5l18 30H4Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M22 5v30M12 35l10-17 10 17" stroke="currentColor" strokeWidth="1.1" />
          <path d="M4 39h36" stroke="currentColor" strokeWidth="1.6" />
        </chakra.svg>
        <Box as="span" fontFamily="heading" fontSize="25px" fontWeight="600" lineHeight="1">
          Pharaoh's{" "}
          <Box as="em" fontWeight="400" fontStyle="italic">
            Path
          </Box>
        </Box>
      </Link>
    </Flex>
  );
}
