// This page uses the legacy Node.js Runtime delivery technology
// Reason: Uses eval() to process MDX
// https://nextjs.org/docs/api-reference/edge-runtime

// Types
import type { ReactElement } from "react";
import { GetStaticProps } from "next";

// Routing
import Link from "next/link";

// SEO
import Head from "next/head";

// Design
import {
  Heading,
  Stack,
  Text,
  SimpleGrid,
  Button,
  Badge,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

// First-party components

// Settings
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

// Markdown processing
import { GetSortedOperatingSystemPages } from "lib/Sorting";

// Layouts
import Layout from "components/layouts/Layout";

interface MetadataTypes {
  map: any;
  slug: string;
  name: string;
  tags: {
    map: any;
    indexOf: (value: string) => number;
    length: number;
  };
  platforms: {
    map: any;
    indexOf: (value: string) => number;
    length: number;
  };
  packageManagement: {
    map: any;
    indexOf: (value: string) => number;
    length: number;
  };
  startupManagement: string;
}

// Start page
export default function Home({
  AZOSPageData,
}: {
  AZOSPageData: MetadataTypes;
}) {
  // Get settings
  const [metadataView] = useLocalStorage("settingsHomeMetadataView");
  return (
    <>
      <Head>
        <title>Discover Open-Source Operating Systems &mdash; Osopcloud</title>
        <meta
          name="description"
          content="Discover Open-Source Operating Systems and Build Open-Source Operating System Culture."
        />
        <meta
          name="og:title"
          content="Discover Open-Source Operating Systems"
        />
        <meta
          name="og:description"
          content="Discover Open-Source Operating Systems and Build Culture."
        />
      </Head>

      <Stack direction="column" spacing={5}>
        <Heading>Home</Heading>
        <SimpleGrid minChildWidth="340px" spacing={10}>
          <Text>This is the new Osopcloud.</Text>
          <Stack direction="column" spacing={2}>
            <Menu>
              <MenuButton as={Button}>Change View</MenuButton>
              <MenuList>
                <MenuItem
                  isDisabled={metadataView === false || metadataView === null}
                  onClick={(_) =>
                    writeStorage("settingsHomeMetadataView", false)
                  }
                >
                  Show Package Management
                </MenuItem>
                <MenuItem
                  isDisabled={metadataView === "startupManagement"}
                  onClick={(_) =>
                    writeStorage(
                      "settingsHomeMetadataView",
                      "startupManagement"
                    )
                  }
                >
                  Show Startup Framework
                </MenuItem>
                <MenuItem
                  isDisabled={metadataView === "allTags"}
                  onClick={(_) =>
                    writeStorage("settingsHomeMetadataView", "allTags")
                  }
                >
                  Show All Tags
                </MenuItem>
              </MenuList>
            </Menu>
            {AZOSPageData.map(
              ({
                slug,
                name,
                tags,
                platforms,
                packageManagement,
                startupManagement,
              }: MetadataTypes) => (
                <Link href={`/browse/${slug}`} key={`/browse/${slug}`} passHref>
                  <Button as="a" display="block" minH="fit-content" py={3}>
                    <Text>{name}</Text>
                    <Stack
                      direction="row"
                      spacing={2}
                      fontWeight="normal"
                      fontSize="sm"
                    >
                      {metadataView === "allTags" ? (
                        // Show all tags
                        tags.map((tag: string) => (
                          <Badge key={`${slug}-${tag}`}>{tag}</Badge>
                        ))
                      ) : (
                        <>
                          <Badge pt="0.5">
                            {tags.map((tag: string) => (
                              <>
                                {/* Limit to 1 tag */}
                                {tags.indexOf(tag) < 1 && <>{tag}</>}
                              </>
                            ))}
                          </Badge>
                          <Text>
                            {platforms.map((platform: string) => (
                              <>
                                {/* Limit to 2 platforms */}
                                {platforms.indexOf(platform) < 2 && (
                                  <>{platform}</>
                                )}
                                {/* Add a comma if not the last date */}
                                {platforms.indexOf(platform) < 1 &&
                                  platforms.indexOf(platform) <
                                    platforms.length - 1 && <>, </>}
                              </>
                            ))}
                          </Text>
                          {metadataView === "startupManagement" ? (
                            <Text>{startupManagement}</Text>
                          ) : (
                            <Text>
                              {packageManagement.map((manager: string) => (
                                <>
                                  {/* Limit to 2 platforms */}
                                  {packageManagement.indexOf(manager) < 2 && (
                                    <>{manager}</>
                                  )}
                                  {/* Add a comma if not the last date */}
                                  {packageManagement.indexOf(manager) < 1 &&
                                    packageManagement.indexOf(manager) <
                                      packageManagement.length - 1 && <>, </>}
                                </>
                              ))}
                            </Text>
                          )}
                        </>
                      )}
                    </Stack>
                  </Button>
                </Link>
              )
            )}
          </Stack>
        </SimpleGrid>
      </Stack>
    </>
  );
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout showToTopButton={true}>{page}</Layout>;
};

// Disable the Edge Runtime
export const config = {
  runtime: "nodejs",
};

// Import AZOSPageData OS Page handling
export const getStaticProps: GetStaticProps = async () => {
  const AZOSPageData = GetSortedOperatingSystemPages();
  return {
    props: {
      AZOSPageData,
    },
  };
};
