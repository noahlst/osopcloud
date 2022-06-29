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
  FiFileText,
  FiGithub,
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

      <Stack direction="column" spacing={5}>
        <Heading>Options</Heading>
        <Stack direction="column" spacing={2}>
          <SettingsOverlay directLink={0} useMenuItem={false} />
          <SettingsOverlay directLink={1} useMenuItem={false} />
          <SettingsOverlay directLink={2} useMenuItem={false} />
        </Stack>
        <Link href="https://github.com/osopcloud/osopcloud" passHref>
          <Button leftIcon={<FiGithub />} as="a" target="_blank">
            GitHub
          </Button>
        </Link>
        <Link href="/docs" passHref>
          <Button leftIcon={<FiLifeBuoy />} as="a">
            Osopcloud Documentation
          </Button>
        </Link>
        <Stack direction="column" spacing={2}>
          <Link href="/about/privacy" passHref>
            <Button leftIcon={<FiFileText />} as="a">
              Osopcloud Privacy Notice
            </Button>
          </Link>
          <Link href="/about/terms" passHref>
            <Button leftIcon={<FiFileText />} as="a">
              Terms
            </Button>
          </Link>
        </Stack>
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
