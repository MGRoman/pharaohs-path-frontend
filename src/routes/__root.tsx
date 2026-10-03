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

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
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
          Страница не найдена
        </Heading>
        <Text mt="2" fontSize="sm" color="mist">
          Такой страницы нет или она была перенесена.
        </Text>
        <Button asChild mt="6" bg="navy" color="ivory">
          <Link to="/">На главную</Link>
        </Button>
      </Box>
    </Box>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
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
          Страница не загрузилась
        </Heading>
        <Text mt="2" fontSize="sm" color="mist">
          Что-то пошло не так. Обновите страницу или вернитесь на главную.
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
            Попробовать снова
          </Button>
          <Button asChild variant="outline">
            <a href="/">На главную</a>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:site_name", content: "Pharaoh's Path" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        <Provider>{children}</Provider>
        <Scripts />
      </body>
    </html>
  );
}

function PageEnter() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <Box key={pathname} className="page-enter">
      <Outlet />
    </Box>
  );
}

function RootComponent() {
  return (
    <>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Navbar />
      <main>
        <PageEnter />
      </main>
      <Footer />
    </>
  );
}
