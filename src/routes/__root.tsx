import { useQueryErrorResetBoundary, type QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Provider } from "@/components/provider";
import { Navbar, Footer } from "@/components/travel/site";
import { headerHeight } from "@/components/travel/styles";
import { getTranslator, localeFromHref, localizePath, useTranslate } from "@/i18n";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  const { t } = useTranslate();
  return (
    <Box
      minH="100svh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px="4"
      textAlign="center"
    >
      <Box maxW="md">
        <Heading as="h1" fontFamily="heading" fontSize="7xl" fontWeight="500">
          404
        </Heading>
        <Heading as="h2" mt="4" fontSize="xl">
          {t("errors.notFound.title")}
        </Heading>
        <Text mt="2" fontSize="sm" color="mist">
          {t("errors.notFound.text")}
        </Text>
        <Button asChild mt="6" bg="navy" color="ivory">
          <Link to="/">{t("errors.notFound.home")}</Link>
        </Button>
      </Box>
    </Box>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  const { t, locale } = useTranslate();
  const queryErrorResetBoundary = useQueryErrorResetBoundary();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <Box
      minH="100svh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px="4"
      textAlign="center"
    >
      <Box maxW="md">
        <Heading as="h1" fontSize="xl">
          {t("errors.failed.title")}
        </Heading>
        <Text mt="2" fontSize="sm" color="mist">
          {t("errors.failed.text")}
        </Text>
        <Flex mt="6" gap="2" justify="center" wrap="wrap">
          <Button
            bg="navy"
            color="ivory"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            {t("errors.failed.retry")}
          </Button>
          <Button asChild variant="outline">
            <a href={localizePath("/", locale)}>{t("errors.failed.home")}</a>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: ({ location }) => ({ locale: localeFromHref(location.publicHref) }),
  head: ({ match }) => {
    const { intl } = getTranslator(match.context.locale);
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:site_name", content: "Pharaoh's Path" },
        { property: "og:locale", content: intl.replace("-", "_") },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const { locale, dir, intl } = useTranslate();
  return (
    <html lang={locale} dir={dir}>
      <head>
        <HeadContent />
      </head>
      <body>
        <Provider locale={intl}>{children}</Provider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <>
      <Navbar />
      {/* The hero on "/" sits under the transparent header; every other page clears it. */}
      <Box as="main" pt={pathname === "/" ? "0" : headerHeight}>
        <Box key={pathname} className="page-enter">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
}
