// Types
import type { ReactElement } from "react";

// Routing
import Link from "next/link";

// SEO
import Head from "next/head";

// Design
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  DarkMode,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  Select,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiMinus,
  FiMoreHorizontal,
  FiPlus,
  FiRefreshCw,
  FiRepeat,
  FiSettings,
  FiShare,
  FiX,
  FiXCircle,
} from "react-icons/fi";
import { LogoNoColour } from "components/brand/Logo";
import Window from "components/system/Window";

// Start page
export default function AppTour() {
  function LogoIcon() {
    return (
      <Icon w={8} h={8}>
        <LogoNoColour />
      </Icon>
    );
  }

  // Tab system
  const [activeTab, setActiveTab] = useState(0);
  const [navBarIconFocus, setNavBarIconFocus] = useState(0);
  function TourNavigationBar() {
    return (
      <Stack direction="row" spacing={10}>
        <Box bg="almond" borderRadius="xl">
          {/* @ts-ignore */}
          <DarkMode>
            <Flex direction="column" p={5} h="50vh">
              <Stack
                direction="column"
                spacing={2}
                // @ts-ignore: Not typed
                sx={navBarIconFocus > 1 ? { filter: "blur(2px)" } : ""}
              >
                <IconButton
                  icon={<LogoIcon />}
                  aria-label="Go Home"
                  size="lg"
                  isDisabled={navBarIconFocus > 1}
                />
                <IconButton
                  icon={<FiPlus />}
                  aria-label="Osopcloud Composer"
                  size="lg"
                  isDisabled={navBarIconFocus > 1}
                />
              </Stack>
              <Spacer />
              <Stack
                direction="column"
                spacing={2}
                // @ts-ignore: Not typed
              >
                <IconButton
                  icon={<FiShare />}
                  aria-label="Share"
                  size="lg"
                  // @ts-ignore: Not typed
                  sx={navBarIconFocus === 1 ? { filter: "blur(2px)" } : ""}
                  isDisabled={navBarIconFocus === 1}
                />
                <IconButton
                  icon={<FiSettings />}
                  aria-label="Settings"
                  size="lg"
                  // @ts-ignore: Not typed
                  sx={navBarIconFocus > 1 ? { filter: "blur(2px)" } : ""}
                  isDisabled={navBarIconFocus > 1}
                />
              </Stack>
            </Flex>
          </DarkMode>
        </Box>
        <Stack direction="column" spacing={5}>
          {navBarIconFocus === 0 ? (
            <>
              <Text>
                Welcome to the Osopcloud Tour. Let's start by explaining how to
                get around.
              </Text>
              <Text>
                This is the sidebar and it's the main way you'll navigate around
                the app.
              </Text>
              <Button
                leftIcon={<FiArrowRight />}
                onClick={() => {
                  setNavBarIconFocus(1);
                }}
              >
                Continue
              </Button>
            </>
          ) : navBarIconFocus === 1 ? (
            <>
              <Text>
                The sidebar has three links that move you around the app.
              </Text>
              <Text>
                Link number 1, which shows the Osopcloud logo, takes you Home.
              </Text>
              <Text>
                Link number 2, which shows a plus icon, takes you to the
                Osopcloud Composer.
              </Text>
              <Text>
                Link number 3, down the bottom, takes you to Osopcloud Settings.
              </Text>
              <Text>We'll return each of these shortly.</Text>
              <Button
                leftIcon={<FiArrowRight />}
                onClick={() => {
                  setNavBarIconFocus(2);
                }}
              >
                Continue
              </Button>
              <Button
                leftIcon={<FiArrowLeft />}
                onClick={() => {
                  setNavBarIconFocus(0);
                }}
              >
                Go Back
              </Button>
            </>
          ) : (
            <>
              <Text>Also on the sidebar is a Share Point.</Text>
              <Text>
                Share Points allow you to bring your apps and friends into the
                Osopcloud experience. When you open one, the native operating
                system share sheet appears.
              </Text>
              <Text>
                There's lots of Share Points sprinkled around the app. This
                Share Point shares the page that you're currently on.
              </Text>
              <Text>
                You can also enable printing options on the sidebar. Open
                Settings to do this.
              </Text>
              <Button
                leftIcon={<FiArrowRight />}
                onClick={() => {
                  setActiveTab(1);
                }}
              >
                Continue
              </Button>
              <Button
                leftIcon={<FiArrowLeft />}
                onClick={() => {
                  setNavBarIconFocus(1);
                }}
              >
                Go Back
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    );
  }
  const [homeAreaFocus, setHomeAreaFocus] = useState(0);
  function TourHome() {
    return (
      <Stack direction="row" spacing={10}>
        <Window title="Osopcloud Home">
          <Stack direction="column" spacing={5}>
            <Input
              placeholder="Find an Operating System"
              shadow="inner"
              borderRadius="xl"
              // @ts-ignore: Not typed
              sx={homeAreaFocus === 1 ? { filter: "blur(2px)" } : ""}
              isDisabled={homeAreaFocus === 1}
            />
            <Stack
              direction="column"
              spacing={2}
              // @ts-ignore: Not typed
              sx={homeAreaFocus > 1 ? { filter: "blur(2px)" } : ""}
            >
              <Stack direction="row" spacing={2}>
                <Button size="sm" isActive isDisabled={homeAreaFocus > 1}>
                  Name
                </Button>
                <Button size="sm" isDisabled={homeAreaFocus > 1}>
                  More
                </Button>
              </Stack>
              <Button
                display="block"
                h="fit-content"
                textAlign="left"
                py={3}
                isDisabled={homeAreaFocus > 1}
              >
                <Text>Elementary OS</Text>
                <Stack
                  direction="row"
                  spacing={2}
                  fontWeight="normal"
                  fontSize="sm"
                >
                  <Badge pt="0.5">Desktop</Badge>
                  <Text>Ubuntu</Text>
                  <Text>apt, flatpak</Text>
                </Stack>
              </Button>
              <Button
                display="block"
                h="fit-content"
                textAlign="left"
                py={3}
                isDisabled={homeAreaFocus > 1}
              >
                <Text>FreeBSD</Text>
                <Stack
                  direction="row"
                  spacing={2}
                  fontWeight="normal"
                  fontSize="sm"
                >
                  <Badge pt="0.5">Advanced</Badge>
                  <Text>BSD 4.4</Text>
                  <Text>FreeBSD Ports</Text>
                </Stack>
              </Button>
            </Stack>
          </Stack>
        </Window>
        <Stack direction="column" spacing={5}>
          {homeAreaFocus === 0 ? (
            <>
              <Text>On the left is a simplified overview of Home.</Text>
              <Text>
                Home can be divided into two parts &mdash; Search and the
                Operating System List.
              </Text>
              <Text>
                Select an operating system to jump into a description, metadata,
                and more.
              </Text>
              <Button
                leftIcon={<FiArrowRight />}
                onClick={() => {
                  setHomeAreaFocus(1);
                }}
              >
                Continue
              </Button>
              <Button
                leftIcon={<FiArrowLeft />}
                onClick={() => {
                  setActiveTab(0);
                }}
              >
                Go Back
              </Button>
            </>
          ) : homeAreaFocus === 1 ? (
            <>
              <Text>First we'll discuss the Operating System List.</Text>
              <Text>
                Like the name suggests, the Operating System List shows every
                operating system on Osopcloud.
              </Text>
              <Text>
                By default this is sorted alphabetically. However, if you click
                on More, then you can choose to group OSs by metadata, like
                desktops and package managers.
              </Text>
              <Text>
                When sorted alphabetically, we see the name, top tag, what the
                OS is based on, and package managers.
              </Text>
              <Button
                leftIcon={<FiArrowRight />}
                onClick={() => {
                  setHomeAreaFocus(2);
                }}
              >
                Continue
              </Button>
              <Button
                leftIcon={<FiArrowLeft />}
                onClick={() => {
                  setHomeAreaFocus(0);
                }}
              >
                Go Back
              </Button>
            </>
          ) : (
            <>
              <Text>At the top of Home is Search.</Text>
              <Text>
                With Search, you can search the Operating System List. Enter the
                name of an OS in the box, select it, and you're off!
              </Text>
              <Button
                leftIcon={<FiArrowRight />}
                onClick={() => {
                  setActiveTab(2);
                }}
              >
                Continue
              </Button>
              <Button
                leftIcon={<FiArrowLeft />}
                onClick={() => {
                  setHomeAreaFocus(1);
                }}
              >
                Go Back
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    );
  }
  const [tags, setTags] = useState([]);
  const [basedOn, setBasedOn] = useState("");
  const [editingTags, setEditingTags] = useState(false);
  const availableTags = [
    "Select an Option...",
    "Desktop",
    "Mobile",
    "Advanced",
    "Enterprise",
    "Utility",
    "Shell",
    "Server",
    "Research",
  ];
  const [editingTagsInput, setEditingTagsInput] = useState("");
  const [composerAreaFocus, setComposerAreaFocus] = useState(0);
  function TourComposerSettingsStorage() {
    return (
      <Stack direction="row" spacing={10}>
        <Box w="125%">
          <Window title="Osopcloud Composer">
            <Stack direction="column" spacing={5}>
              <Stack direction="row" spacing={5}>
                <Heading
                  size="md"
                  // @ts-ignore: Not typed
                  sx={composerAreaFocus === 1 ? { filter: "blur(2px)" } : ""}
                >
                  Haiku
                </Heading>
                <Center>
                  <Stack direction="row" spacing={2}>
                    <Badge
                      colorScheme="almondScheme"
                      // @ts-ignore: Not typed
                      sx={
                        composerAreaFocus === 1 ? { filter: "blur(2px)" } : ""
                      }
                    >
                      Composer
                    </Badge>
                    <Badge colorScheme="green">Saved to Storage</Badge>
                  </Stack>
                </Center>
              </Stack>
              <Textarea
                placeholder="Write about Haiku"
                // @ts-ignore: Not typed
                sx={composerAreaFocus === 1 ? { filter: "blur(2px)" } : ""}
                isDisabled={composerAreaFocus === 1}
              />
              <Table
                size="sm"
                variant="simple" // @ts-ignore: Not typed
                sx={composerAreaFocus === 1 ? { filter: "blur(2px)" } : ""}
              >
                <Tbody>
                  <Tr>
                    <Td>All Tags</Td>
                    <Td>
                      {editingTags ? (
                        <Stack direction="row" spacing={5}>
                          <Select
                            onChange={(e) => {
                              setEditingTagsInput(e.target.value);
                            }}
                            size="sm"
                          >
                            {availableTags.map((tag, index) => (
                              <option key={index} value={tag}>
                                {tag}
                              </option>
                            ))}
                          </Select>
                          <Stack direction="row" spacing={2}>
                            <Button
                              onClick={() => {
                                // @ts-ignore
                                setTags([...tags, editingTagsInput]);
                                setEditingTags(false);
                              }}
                              size="sm"
                            >
                              Add Tag
                            </Button>
                            <IconButton
                              icon={<FiX />}
                              aria-label="Cancel"
                              onClick={() => {
                                setEditingTags(false);
                              }}
                              size="sm"
                            />
                          </Stack>
                        </Stack>
                      ) : (
                        <Stack direction="row" spacing={5}>
                          <Center>
                            <Stack direction="row" spacing={2}>
                              {tags.map((tag, index) => (
                                <Badge key={index}>{tag}</Badge>
                              ))}
                            </Stack>
                          </Center>
                          <Stack direction="row" spacing={2}>
                            <IconButton
                              icon={<FiPlus />}
                              aria-label="Add a Tag"
                              onClick={() => {
                                setEditingTags(true);
                              }}
                              size="sm"
                              isDisabled={composerAreaFocus === 1}
                            />
                            {tags.length > 0 && (
                              <IconButton
                                icon={<FiMinus />}
                                aria-label="Remove the Last Tag"
                                onClick={() => {
                                  setTags(
                                    tags.filter(
                                      (tag, index) => index !== tags.length - 1
                                    )
                                  );
                                }}
                                size="sm"
                                isDisabled={composerAreaFocus === 1}
                              />
                            )}
                          </Stack>
                        </Stack>
                      )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Based On</Td>
                    <Td>
                      <Editable
                        // @ts-ignore
                        value={basedOn || "Click to Edit..."}
                      >
                        <EditablePreview />
                        <Input
                          as={EditableInput}
                          onChange={(e) => {
                            setBasedOn(e.target.value);
                          }}
                          size="sm"
                          isDisabled={composerAreaFocus === 1}
                        />
                      </Editable>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Stack>
          </Window>
        </Box>
        <Stack direction="column" spacing={5}>
          {composerAreaFocus === 0 ? (
            <>
              <Text>Now let's look at the Osopcloud Composer.</Text>
              <Text>
                Osopcloud Composer makes it easy to create or edit Osopcloud
                operating system content.
              </Text>
              <Text>
                So, to get a new operating system onto Osopcloud, open up the
                Composer.
              </Text>
              <Text>
                To edit something that's already on Osopcloud, open it's page
                and select "Open in Composer".
              </Text>
              <Text fontSize="xs">
                Once you've completed your work in the Composer, you'll need to
                publish this onto our GitHub repository, something which the
                Composer guides you through.
              </Text>
              <Button
                leftIcon={<FiArrowRight />}
                onClick={() => {
                  setComposerAreaFocus(1);
                }}
              >
                Continue
              </Button>
              <Button
                leftIcon={<FiArrowLeft />}
                onClick={() => {
                  setActiveTab(1);
                }}
              >
                Go Back
              </Button>
            </>
          ) : (
            <>
              <Text>
                A key element of Osopcloud behind the scenes is persistent
                storage.
              </Text>
              <Text>
                This means your Composer work, along with Settings and Badges,
                last longer than your current session. You can come back to them
                tomorrow and they won't be lost.
              </Text>
              <Text>
                There is also automatic content downloading, so you can use
                Osopcloud when you're offline.
              </Text>
              <Button
                leftIcon={<FiArrowRight />}
                onClick={() => {
                  setActiveTab(3);
                }}
              >
                Continue
              </Button>
              <Button
                leftIcon={<FiArrowLeft />}
                onClick={() => {
                  setComposerAreaFocus(0);
                }}
              >
                Go Back
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    );
  }
  function EndOfTour() {
    return (
      <Stack direction="column" spacing={5}>
        <Text>That's the basics of Osopcloud.</Text>
        <Text>
          You can learn more about Osopcloud features with our comprehensive
          documentation. Or, go home and jump into the world of open-source
          operating systems!
        </Text>
        <Stack direction="column" spacing={2}>
          <Link href="/" passHref>
            <Button leftIcon={<FiArrowRight />} as="a">
              Close Tour &amp; Go Home
            </Button>
          </Link>
          <Link href="/docs" passHref>
            <Button leftIcon={<FiArrowRight />} as="a">
              Learn More in Documentation
            </Button>
          </Link>
        </Stack>
        <Stack direction="column" spacing={2}>
          <Button
            leftIcon={<FiArrowLeft />}
            onClick={() => {
              setActiveTab(2);
            }}
          >
            Go Back to Tour
          </Button>
          <Button
            leftIcon={<FiRefreshCw />}
            onClick={() => {
              setNavBarIconFocus(0);
              setHomeAreaFocus(0);
              setComposerAreaFocus(0);
              setActiveTab(0);
            }}
          >
            Restart the Tour
          </Button>
        </Stack>
      </Stack>
    );
  }
  const tabArray = [
    {
      label: "Navigation",
      component: <TourNavigationBar />,
    },
    {
      label: "Home",
      component: <TourHome />,
    },
    {
      label: "Osopcloud Composer & Storage",
      component: <TourComposerSettingsStorage />,
    },
    {
      label: "End of Tour",
      component: <EndOfTour />,
    },
  ];
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

      <Box bg={useColorModeValue("gray.50", "inherit")} h="100vh">
        <Container maxW="container.md" py={20}>
          <Flex>
            <Link href="/docs" passHref>
              <Button leftIcon={<FiX />} size="sm" as="a">
                Close Tour
              </Button>
            </Link>
            <Spacer />
            <Text fontSize="xs">
              {tabArray[activeTab].label} ({activeTab + 1}/4)
            </Text>
          </Flex>
          <Box pt={100}>
            {/* Current tab */}
            {tabArray[activeTab].component}
          </Box>
        </Container>
      </Box>
    </>
  );
}
