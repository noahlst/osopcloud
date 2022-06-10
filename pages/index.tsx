// This page uses the legacy Node.js Runtime delivery technology
// Reason: Uses eval() to process MDX
// https://nextjs.org/docs/api-reference/edge-runtime

// Types
import type { ReactElement } from "react";
import { GetStaticProps } from "next";

// Suspense
import { Suspense } from "react";
import Loading from "components/Loading";

// Routing
import Link from "next/link";

// SEO
import Head from "next/head";

// Design
import {
  Stack,
  Text,
  SimpleGrid,
  Button,
  Badge,
  Center,
  Icon,
} from "@chakra-ui/react";

// First-party components
import Logo from "components/brand/Logo";

// Settings
import { useLocalStorage } from "@rehooks/local-storage";

// JSON processing
import { GetSortedOperatingSystemPages, SortByTags } from "lib/Sorting";

// Search libraries
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

// Layouts
import Layout from "components/layouts/Layout";

import { useState } from "react";

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
  length: number;
}

// Start page
export default function Home({
  AZOSPageData,
  SortedTagsData,
}: {
  AZOSPageData: MetadataTypes;
  SortedTagsData: MetadataTypes;
}) {
  // Get settings
  const [showTagsOnHome] = useLocalStorage("settingsShowTagsOnHome");

  // List tabs
  function ListByName() {
    return (
      <>
        {AZOSPageData.map(
          ({
            slug,
            name,
            tags,
            platforms,
            packageManagement,
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
                  {showTagsOnHome ? (
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
                            {platforms.indexOf(platform) < 2 && <>{platform}</>}
                            {/* Add a comma if not the last date */}
                            {platforms.indexOf(platform) < 1 &&
                              platforms.indexOf(platform) <
                                platforms.length - 1 && <>, </>}
                          </>
                        ))}
                      </Text>
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
                    </>
                  )}
                </Stack>
              </Button>
            </Link>
          )
        )}
      </>
    );
  }
  // List by tags
  function ListByTags() {
    return (
      <>
        {/* Get AZOSPageData, and sort it by tags */}
        {SortedTagsData.map(({ slug, name, tags }: MetadataTypes) => (
          <Link href={`/browse/${slug}`} key={`/browse/${slug}`} passHref>
            <Button as="a" display="block" minH="fit-content" py={3}>
              <Text>{name}</Text>
              <Stack
                direction="row"
                spacing={2}
                fontWeight="normal"
                fontSize="sm"
              >
                {tags.map((tag: string) => (
                  <Badge key={`${slug}-${tag}`}>{tag}</Badge>
                ))}
              </Stack>
            </Button>
          </Link>
        ))}
      </>
    );
  }

  // Tab system for the list
  const [activeTab, setActiveTab] = useState(0);
  const tabArray = [
    {
      label: "Sort by Name",
      component: <ListByName />,
    },
    {
      label: "Sort by Tag",
      component: <ListByTags />,
    },
  ];

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

      <SimpleGrid minChildWidth="340px" spacing={10}>
        <Stack direction="column" spacing={10} p={{ base: 0, sm: 20 }}>
          <AutoComplete>
            <AutoCompleteInput
              variant="outline"
              size="md"
              borderRadius="xl"
              shadow="inner"
              placeholder="Find an Operating System..."
            />
            <AutoCompleteList>
              {AZOSPageData.map(
                ({
                  slug,
                  name,
                  tags,
                  platforms,
                  packageManagement,
                }: MetadataTypes) => (
                  <Link
                    href={`/browse/${slug}`}
                    key={`/browse/${slug}`}
                    passHref
                  >
                    <AutoCompleteItem
                      value={name}
                      key={`option-${name}`}
                      textDecoration="none"
                      p={4}
                      mb={1}
                      as="a"
                    >
                      <Text>{name}</Text>
                      <Stack
                        direction="row"
                        spacing={2}
                        fontWeight="normal"
                        fontSize="sm"
                      >
                        {showTagsOnHome ? (
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
                          </>
                        )}
                      </Stack>
                    </AutoCompleteItem>
                  </Link>
                )
              )}
            </AutoCompleteList>
          </AutoComplete>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={5} fontSize="xs">
              <Text>
                {AZOSPageData.length} Operating System
                {AZOSPageData.length <= 1 ? "" : "s"}
              </Text>
              <Suspense fallback={<Text>Preparing the Operating List...</Text>}>
                <Text>
                  {showTagsOnHome
                    ? "Showing All Tags"
                    : "Showing Selected Metadata"}
                </Text>
              </Suspense>
            </Stack>
            <Stack direction="row" spacing={2} fontSize="xs">
              {/* Map tab buttons */}
              {tabArray.map((tab, index: number) => (
                <Button
                  key={`tab-${index}`}
                  isActive={activeTab === index}
                  size="sm"
                  onClick={() => setActiveTab(index)}
                >
                  {tab.label}
                </Button>
              ))}
            </Stack>
            <Suspense fallback={<Loading />}>
              {/* Current tab */}
              {tabArray[activeTab].component}
            </Suspense>
          </Stack>
        </Stack>
        <Center h="100vh" pb="100" display={{ base: "none", sm: "flex" }}>
          <Icon w={250} h={250} aria-label="Osopcloud Logo">
            <Logo />
          </Icon>
        </Center>
      </SimpleGrid>
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
  const SortedTagsData = SortByTags();
  return {
    props: {
      AZOSPageData,
      SortedTagsData,
    },
  };
};
