// Types
import type { ReactElement } from "react";

// Routing
import Link from "next/link";

// SEO
import Head from "next/head";

// Design
import { Badge, Button, Center, Heading, Stack, Text } from "@chakra-ui/react";

// First party components
import Card from "components/system/Card";

// Layouts
import Layout from "components/layouts/Layout";
import DocsLayout from "components/layouts/DocsLayout";
import { FiArrowRight } from "react-icons/fi";

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
        <Stack direction="row" spacing={5}>
          <Heading>Osopcloud Documentation</Heading>
          <Center>
            <Badge colorScheme="orange">Beta Preview</Badge>
          </Center>
        </Stack>
        <Text>
          Osopcloud Documentation is help, tips, and insights for the Osopcloud
          platform.
        </Text>
        <Card>
          <Stack direction="column" spacing={5}>
            <Text fontWeight={600}>Osopcloud Tour</Text>
            <Text>
              Learn Osopcloud basics like navigation, Share Points, Home,
              Osopcloud Composer, and Storage in two minutes.
            </Text>
            <Link href="/docs/tour" passHref>
              <Button as="a" leftIcon={<FiArrowRight />}>
                Start the Tour
              </Button>
            </Link>
          </Stack>
        </Card>
        <Stack
          direction="column"
          spacing={5}
          me={{ base: 0, sm: 10 }}
          display={{ base: "flex", sm: "none" }}
        >
          <Stack direction="column" spacing={2}>
            <Text fontWeight={600}>Operating Systems</Text>
            <Link href="/docs/os-pages" passHref>
              <Button as="a">Operating System Pages</Button>
            </Link>
            <Link href="/docs/composer" passHref>
              <Button as="a">Create with Osopcloud Composer</Button>
            </Link>
            <Link href="/docs/exporting-composer" passHref>
              <Button as="a">Exporting from Osopcloud Composer</Button>
            </Link>
            <Link href="/docs/osopcloud-organisations" passHref>
              <Button as="a">About Osopcloud for Organisations</Button>
            </Link>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Text fontWeight={600}>Badges, Settings, &amp; Accessibility</Text>
            <Link href="/docs/badges" passHref>
              <Button as="a">About Badges</Button>
            </Link>
            <Link href="/docs/settings" passHref>
              <Button as="a">About Settings</Button>
            </Link>
            <Link href="/docs/accessibility" passHref>
              <Button as="a">Accessibility Options</Button>
            </Link>
            <Link href="/docs/storage" passHref>
              <Button as="a">About Storage</Button>
            </Link>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Text fontWeight={600}>Features</Text>
            <Link href="/docs/sharing" passHref>
              <Button as="a">Share Points &amp; Printing</Button>
            </Link>
            <Link href="/docs/keyboard-shortcuts" passHref>
              <Button as="a">Keyboard Shortcuts</Button>
            </Link>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Text fontWeight={600}>Technical Documentation</Text>
            <Button isDisabled>Developer Documentation</Button>
            <Link href="/docs/errors" passHref>
              <Button as="a">Error Code Reference</Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
DocumentationHome.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      <DocsLayout>{page}</DocsLayout>
    </Layout>
  );
};
