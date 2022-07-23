// Types
import type { ReactElement } from "react";

// Routing
import Link from "next/link";

// SEO
import Head from "next/head";

// Design
import {
  Button,
  Center,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import {
  FiFileText,
  FiGithub,
  FiLifeBuoy,
  FiMoreVertical,
  FiSettings,
} from "react-icons/fi";

// Layouts
import Layout from "components/layouts/Layout";

// Start page
export default function Options() {
  return (
    <>
      <Head>
        <title>Options &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Access additional functions and settings on Osopcloud."
        />
        <meta name="og:title" content="Osopcloud Options" />
        <meta
          name="og:description"
          content="Additional options on Osopcloud."
        />
      </Head>

      <Stack direction="column" spacing={{ base: 5, md: 10 }}>
        <Heading>Options</Heading>
        <SimpleGrid minChildWidth="340px" spacing={10}>
          <Stack direction="column" spacing={5}>
            <Link href="/settings" passHref>
              <Button leftIcon={<FiSettings />} as="a">
                Osopcloud Settings
              </Button>
            </Link>
            <Link href="https://github.com/osopcloud/osopcloud" passHref>
              <Button leftIcon={<FiGithub />} as="a" target="_blank">
                Osopcloud GitHub Repository
              </Button>
            </Link>
            <Link
              href="https://github.com/osopcloud/osopcloud/tree/main/docs"
              passHref
            >
              <Button leftIcon={<FiLifeBuoy />} as="a" target="_blank">
                Documentation on GitHub
              </Button>
            </Link>
            <Stack direction="column" spacing={2}>
              <Link href="/about/privacy" passHref>
                <Button leftIcon={<FiFileText />} as="a">
                  Osopcloud Privacy Statement
                </Button>
              </Link>
              <Link href="/about/terms" passHref>
                <Button leftIcon={<FiFileText />} as="a">
                  Terms
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Center h="100vh" pb={330} display={{ base: "none", lg: "flex" }}>
            <Icon as={FiMoreVertical} w={200} h={200} aria-label="Options" />
          </Center>
        </SimpleGrid>
      </Stack>
    </>
  );
}
Options.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      showToTopButton={false}
      showShareButton={false}
      sidebarActiveIndex={2}
    >
      {page}
    </Layout>
  );
};
