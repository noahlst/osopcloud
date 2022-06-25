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
        <Text>Documentation Home</Text>
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
