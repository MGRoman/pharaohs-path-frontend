import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    html: {
      scrollBehavior: "smooth",
      scrollPaddingTop: "96px",
    },
    "*::selection": {
      bg: "gold",
      color: "navy",
    },
  },
  theme: {
    tokens: {
      colors: {
        gold: { value: "oklch(0.72 0.075 78)" },
        navy: { value: "oklch(0.19 0.025 258)" },
        ivory: { value: "oklch(0.985 0.004 80)" },
        turquoise: { value: "oklch(0.64 0.13 175)" },
        sand: { value: "oklch(0.95 0.008 80)" },
        line: { value: "oklch(0.84 0.015 80)" },
        mist: { value: "oklch(0.49 0.02 255)" },
      },
      fonts: {
        heading: { value: "'Cormorant Garamond', serif" },
        body: { value: "'Manrope', sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: "{colors.ivory}" },
          panel: { value: "{colors.ivory}" },
          subtle: { value: "{colors.sand}" },
        },
        fg: {
          DEFAULT: { value: "{colors.navy}" },
          muted: { value: "{colors.mist}" },
        },
        border: {
          DEFAULT: { value: "{colors.line}" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
