// Types
import type { ReactElement } from "react";

// Routing
import Link from "next/link";

// SEO
import Head from "next/head";

// Design
import { Button, Heading, Stack } from "@chakra-ui/react";

// Layouts
import Layout from "components/layouts/Layout";
import {
  FiHardDrive,
  FiLayout,
  FiLifeBuoy,
  FiShare,
  FiUser,
  FiWifi,
} from "react-icons/fi";
import SettingsOverlay from "components/settings/SettingsOverlay";

// Start page
export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings &mdash; Osopcloud</title>
        <meta name="description" content="Customise and configure Osopcloud." />
        <meta name="og:title" content="Osopcloud Settings" />
        <meta
          name="og:description"
          content="Customise and configure Osopcloud."
        />
      </Head>

      <Stack direction="column" spacing={5}>
        <Heading>Options</Heading>
        <Stack direction="column" spacing={2}>
          <SettingsOverlay directLink={0} useMenuItem={false} />
          <SettingsOverlay directLink={1} useMenuItem={false} />
          <SettingsOverlay directLink={2} useMenuItem={false} />
        </Stack>
        <Link href="/docs" passHref>
          <Button leftIcon={<FiLifeBuoy />} as="a">
            Osopcloud Documentation
          </Button>
        </Link>
      </Stack>
    </>
  );
}
Settings.getLayout = function getLayout(page: ReactElement) {
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
