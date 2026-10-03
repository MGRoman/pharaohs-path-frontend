import { Box, Button, Flex, Icon, IconButton } from "@chakra-ui/react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { nav } from "./nav";
import { goldProps } from "./styles";
import { SiteContainer } from "./ui";

export function Navbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled((prev) => {
          const next = window.scrollY > 48;
          return prev === next ? prev : next;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
      position={overlay ? "fixed" : "sticky"}
      top="0"
      zIndex="40"
      w="100%"
      h={{ base: "70px", md: "82px" }}
      color={light ? "ivory" : "navy"}
      bg={open ? "navy" : overlay ? "transparent" : "ivory"}
      backdropFilter={overlay || open ? undefined : "blur(20px)"}
      borderBottomWidth="1px"
      borderColor={overlay || open ? "transparent" : "line"}
      boxShadow={!overlay && scrolled ? "0 10px 30px oklch(0.19 0.025 258 / 0.08)" : "none"}
      css={
        overlay
          ? { background: "linear-gradient(to bottom, oklch(0.12 0.02 260 / 0.48), transparent)" }
          : undefined
      }
      transition="background .45s, color .45s, border-color .45s, box-shadow .45s"
    >
      <SiteContainer h="100%" display="flex" alignItems="center" gap={{ base: "3", lg: "8" }}>
        <Brand light={light} />
        <Flex
          as="nav"
          aria-label="Главное меню"
          display={{ base: "none", lg: "flex" }}
          align="center"
          gap="7"
          ml="auto"
        >
          {nav.map((item) => {
            const active = path === item.to;
            return (
              <Link key={item.to} to={item.to}>
                <Box
                  as="span"
                  fontSize="xs"
                  fontWeight="600"
                  color={active ? "gold" : "inherit"}
                  position="relative"
                  _hover={{ color: "gold" }}
                  transition="color .3s"
                >
                  {item.label}
                </Box>
              </Link>
            );
          })}
        </Flex>
        <Button
          asChild
          {...goldProps}
          h="44px"
          px="4"
          ml={{ base: "0", lg: "2" }}
          display={{ base: "none", lg: "inline-flex" }}
        >
          <Link to="/booking">
            Забронировать <ArrowUpRight size={16} />
          </Link>
        </Button>
        <IconButton
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          variant="ghost"
          color="inherit"
          ml="auto"
          display={{ base: "inline-flex", lg: "none" }}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </IconButton>
      </SiteContainer>
      {open && (
        <Flex
          as="nav"
          aria-label="Мобильное меню"
          direction="column"
          position="fixed"
          top={{ base: "70px", md: "82px" }}
          left="0"
          right="0"
          h={{ base: "calc(100svh - 70px)", md: "calc(100svh - 82px)" }}
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
                  0{index + 1}
                </Box>
                {item.label}
                <Icon boxSize="5" ml="auto">
                  <ArrowUpRight />
                </Icon>
              </Link>
            </Flex>
          ))}
          <Button asChild {...goldProps} mt="7">
            <Link to="/booking">
              Забронировать путешествие <ArrowRight size={17} />
            </Link>
          </Button>
        </Flex>
      )}
    </Box>
  );
}
