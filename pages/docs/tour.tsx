// SEO
import Head from "next/head";

// Design
import { Box, useColorModeValue } from "@chakra-ui/react";

// First party components
import AppTour from "components/docs/AppTour";

// Start page
export default function TourPage() {
  return (
    <>
      <Head>
        <title>Osopcloud Tour &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Take the Tour, and discover Osopcloud's features in 2 minutes."
        />
        <meta name="og:title" content="Osopcloud Tour" />
        <meta
          name="og:description"
          content="Discover Osopcloud's features in 2 minutes."
        />
      </Head>

      <Box bg={useColorModeValue("gray.50", "inherit")} h="100vh" py={20}>
        <AppTour />
      </Box>
    </>
  );
}
