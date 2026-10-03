import { Box, Button, Flex, Icon, IconButton } from "@chakra-ui/react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useTranslate } from "@/i18n";
import { Brand } from "./brand";
import { LanguageSwitcher } from "./language-switcher";
import { nav } from "./nav";
import { goldProps, headerHeight } from "./styles";
import { SiteContainer } from "./ui";

const fade = ".4s cubic-bezier(.4,0,.2,1)";

const layer = {
  content: '""',
  position: "absolute",
  inset: "0",
  zIndex: "-1",
  pointerEvents: "none",
} as const;

/** Scroll events already fire at most once per frame, and React skips same-value updates. */
function useScrolled(threshold: number) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);
  return scrolled;
}

export function Navbar() {
  const { t, formatNumber } = useTranslate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const scrolled = useScrolled(48);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay = path === "/" && !scrolled && !open;
  const light = overlay || open;

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      insetInline="0"
      zIndex="40"
      h={headerHeight}
      isolation="isolate"
      color={light ? "ivory" : "navy"}
      transition={`color ${fade}`}
      _before={{
        ...layer,
        bg: open ? "navy" : "ivory/88",
        backdropFilter: "saturate(1.4) blur(18px)",
        borderBottomWidth: "1px",
        borderColor: open ? "transparent" : "line",
        boxShadow: scrolled && !open ? "0 10px 30px oklch(0.19 0.025 258 / 0.08)" : "none",
        opacity: overlay ? 0 : 1,
        transition: `opacity ${fade}, background-color ${fade}, box-shadow ${fade}`,
      }}
      _after={{
        ...layer,
        bgImage: "linear-gradient(to bottom, oklch(0.12 0.02 260 / 0.48), transparent)",
        opacity: overlay ? 1 : 0,
        transition: `opacity ${fade}`,
      }}
    >
      <SiteContainer h="100%" display="flex" alignItems="center" gap={{ base: "3", lg: "6" }}>
        <Brand light={light} />
        <Flex
          as="nav"
          aria-label={t("nav.main")}
          display={{ base: "none", lg: "flex" }}
          align="center"
          gap="7"
          ms="auto"
        >
          {nav.map((item) => (
            <Link key={item.to} to={item.to}>
              <Box
                as="span"
                fontSize="xs"
                fontWeight="600"
                color={path === item.to ? "gold" : "inherit"}
                transition="color .3s"
                _hover={{ color: "gold" }}
              >
                {t(item.label)}
              </Box>
            </Link>
          ))}
        </Flex>
        <LanguageSwitcher display={{ base: "none", lg: "flex" }} />
        <Button
          asChild
          {...goldProps}
          h="44px"
          px="4"
          display={{ base: "none", lg: "inline-flex" }}
        >
          <Link to="/booking">
            {t("nav.book")} <ArrowUpRight size={16} />
          </Link>
        </Button>
        <IconButton
          aria-label={open ? t("nav.close") : t("nav.open")}
          aria-expanded={open}
          variant="ghost"
          color="inherit"
          ms="auto"
          display={{ base: "inline-flex", lg: "none" }}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </IconButton>
      </SiteContainer>
      {open && (
        <Flex
          as="nav"
          aria-label={t("nav.mobile")}
          direction="column"
          position="fixed"
          top={headerHeight}
          insetInline="0"
          bottom="0"
          bg="navy"
          color="ivory"
          px="6"
          py="7"
          overflow="auto"
          animation="rise-in .4s cubic-bezier(.22,1,.36,1)"
        >
          {nav.map((item, index) => (
            <Flex
              asChild
              key={item.to}
              align="center"
              py="4"
              borderBottomWidth="1px"
              borderColor="whiteAlpha.300"
              fontFamily="heading"
              fontSize="35px"
              fontWeight="500"
            >
              <Link to={item.to}>
                <Box
                  as="small"
                  fontFamily="body"
                  fontSize="10px"
                  fontWeight="700"
                  color="gold"
                  w="30px"
                >
                  {formatNumber(index + 1, { minimumIntegerDigits: 2 })}
                </Box>
                {t(item.label)}
                <Icon boxSize="5" ms="auto">
                  <ArrowUpRight />
                </Icon>
              </Link>
            </Flex>
          ))}
          <LanguageSwitcher mt="6" />
          <Button asChild {...goldProps} mt="6">
            <Link to="/booking">
              {t("nav.bookTrip")} <ArrowRight size={17} />
            </Link>
          </Button>
        </Flex>
      )}
    </Box>
  );
}
