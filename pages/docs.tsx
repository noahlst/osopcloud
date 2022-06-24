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
  Text,
} from "@chakra-ui/react";
import Card from "components/system/Card";

// Layouts
import Layout from "components/layouts/Layout";
import { FiMap } from "react-icons/fi";
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
        <Heading>Osopcloud Documentation</Heading>
        <SimpleGrid minChildWidth="340px" spacing={10}>
          <Card>
            <Stack direction="column" spacing={5}>
              <Center py={5}>
                <Icon as={FiMap} aria-label="Map" w={14} h={14} />
              </Center>
              <Link href="/docs/tour" passHref>
                <Button>Osopcloud Flight Tour</Button>
              </Link>
              <Text>Learn Osopcloud basics.</Text>
            </Stack>
          </Card>
          <Card>
            <Stack direction="column" spacing={5}>
              <Center py={5}>
                <Icon as={FiMap} aria-label="Map" w={14} h={14} />
              </Center>
              <Button isDisabled>Osopcloud Flight Tour</Button>
              <Text>Learn Osopcloud basics.</Text>
            </Stack>
          </Card>
        </SimpleGrid>
      </Stack>
    </>
  );
}
DocumentationHome.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      <DocsLayout docsSidebarActiveIndex={0}>{page}</DocsLayout>
    </Layout>
  );
};