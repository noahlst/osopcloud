// Types
import type { ReactElement } from "react";

// Routing
import Link from "next/link";

// SEO
import Head from "next/head";

// Design
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

// Layouts
import Layout from "components/layouts/Layout";
import { FiMap } from "react-icons/fi";

// Start page
export default function DocumentationHome() {
  return (
    <>
      <Head>
        <title>Documentation Home &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Help for whereever you are on your Osopcloud journey."
        />
        <meta name="og:title" content="Osopcloud Documentation" />
        <meta
          name="og:description"
          content="Get help with Osopcloud Documentation."
        />
      </Head>

      <Stack direction="column" spacing={5}>
        <Heading>Osopcloud Documentation</Heading>
        <SimpleGrid minChildWidth="340px" spacing={10}>
          <Box bg="whiteAlpha.500" p={5} borderRadius="xl" shadow="md">
            <Stack direction="column" spacing={5}>
              <Center py={5}>
                <Icon as={FiMap} aria-label="Map" w={14} h={14} />
              </Center>
              <Link href="/docs/tour" passHref>
                <Button>Osopcloud Flight Tour</Button>
              </Link>
              <Text>Learn Osopcloud basics.</Text>
            </Stack>
          </Box>
          <Box bg="whiteAlpha.500" p={5} borderRadius="xl" shadow="md">
            <Stack direction="column" spacing={5}>
              <Center py={5}>
                <Icon as={FiMap} aria-label="Map" w={14} h={14} />
              </Center>
              <Button isDisabled>Osopcloud Flight Tour</Button>
              <Text>Learn Osopcloud basics.</Text>
            </Stack>
          </Box>
        </SimpleGrid>
      </Stack>
    </>
  );
}
DocumentationHome.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      {page}
    </Layout>
  );
};
