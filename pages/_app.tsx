// Types
import type { ReactElement } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// Application-scope providers
import { ChakraProvider } from "@chakra-ui/react";
import theme from "lib/Theming";
import UpdateServices from "lib/UpdateServices";
import { ErrorFallbackApplication } from "components/error-handling/ErrorFallbackApplication";
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";

// Routing
import { useRouter } from "next/router";

// Design
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/600.css";
import "@fontsource/dosis/700.css";

// Keyboard shortcuts
import { useKeyboardShortcut } from "hooks/useKeyboardShortcut";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Start application
export default function Application({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const router = useRouter();

  // Keyboard shortcuts
  useKeyboardShortcut("g then h", () => {
    router.push("/");
  });
  useKeyboardShortcut("g then c", () => {
    router.push("/composer");
  });
  useKeyboardShortcut(["g then o"], () => {
    router.push("/options");
  });
  useKeyboardShortcut(["g then s", "g then ,"], () => {
    router.push("/settings");
  });

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      <ErrorFallbackApplication>
        <UpdateServices>
          <MotionConfig reducedMotion="user">
            {/* Strict is preferred, however it will break Chakra UI components and always throw */}
            <LazyMotion features={domAnimation}>
              {getLayout(<Component {...pageProps} />)}
            </LazyMotion>
          </MotionConfig>
        </UpdateServices>
      </ErrorFallbackApplication>
    </ChakraProvider>
  );
}
