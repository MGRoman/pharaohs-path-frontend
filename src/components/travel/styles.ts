import type { ButtonProps, InputProps, TextProps } from "@chakra-ui/react";

export const headerHeight = { base: "70px", md: "82px" } as const;

const ease =
  "transform .45s cubic-bezier(.22,1,.36,1), background .45s, box-shadow .45s, border-color .45s, color .45s, filter .45s";

export const goldProps: ButtonProps = {
  bg: "gold",
  color: "navy",
  borderRadius: "2px",
  h: "52px",
  px: "6",
  fontSize: "xs",
  fontWeight: "700",
  _hover: {
    filter: "brightness(1.06)",
    transform: "translateY(-2px)",
    boxShadow: "0 12px 28px oklch(0.72 0.075 78 / 0.28)",
  },
  transition: ease,
};

export const lineProps: ButtonProps = {
  variant: "outline",
  borderColor: "whiteAlpha.700",
  color: "ivory",
  bg: "transparent",
  borderRadius: "2px",
  h: "52px",
  px: "6",
  fontSize: "xs",
  _hover: { bg: "whiteAlpha.200", transform: "translateY(-2px)" },
  transition: ease,
};

export const fieldLabelProps = {
  fontSize: "10px",
  fontWeight: "800",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "mist",
} satisfies TextProps;

export const fieldControlProps = {
  h: "44px",
  borderColor: "line",
  borderRadius: "2px",
  bg: "ivory",
  fontSize: "xs",
  _invalid: { borderColor: "red.500" },
} satisfies InputProps;
