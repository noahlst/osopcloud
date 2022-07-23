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
  Flex,
  Heading,
  Icon,
  Kbd,
  SimpleGrid,
  Spacer,
  Spinner,
  Stack,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiDatabase,
  FiSettings,
  FiSidebar,
  FiSliders,
  FiTool,
} from "react-icons/fi";
import { AnimatePresence, m } from "framer-motion";

// First party components
import DynamicModal from "components/system/DynamicModal";
import ResetOsopcloudOverlay from "components/settings/ResetOsopcloudOverlay";
import { version } from "components/Version";

// Layouts
import Layout from "components/layouts/Layout";

// Storage handling
import useLocalStorage, { writeStorage } from "@rehooks/local-storage";
import { exportCB, importCB, version as versionMXUPS } from "@hikium/mxups";

import { useState, useEffect, useRef } from "react";

// Start page
export default function Settings() {
  // Get settings
  const [systemFont] = useLocalStorage("settingsUseSystemFont");
  const [switchLabels] = useLocalStorage("settingsShowSwitchLabels");
  const [settingsDisableCOKeyboardShortcuts] = useLocalStorage(
    "settingsDisableCOKeyboardShortcuts"
  );
  const [showPrintButton] = useLocalStorage("settingsShowPrintButton");
  const [disableDynamicPrinting] = useLocalStorage(
    "settingsDisableDynamicPrinting"
  );
  const [immediateUpdate] = useLocalStorage("forceUpdate");

  const [applyingCustomFont, setApplyingCustomFont] = useState(false);

  // Icons from the array
  const [iconIndex, setIconIndex] = useState(0);
  const icon = [
    { component: <FiSettings />, function: FiSettings, label: "Settings" },
    { component: <FiSidebar />, function: FiSidebar, label: "Sidebar" },
    {
      component: <FiSliders />,
      function: FiSliders,
      label: "Advanced Settings",
    },
    { component: <FiDatabase />, function: FiDatabase, label: "Storage" },
    {
      component: <FiTool />,
      function: FiTool,
      label: "Diagnostic Information",
    },
  ];

  // Get storage size
  const [storageSize, setStorageSize] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (navigator.storage) {
        navigator.storage.estimate().then((estimate) => {
          // estimate.usage is in bytes
          // However to show the user, we need to convert to MB and round to one decimal place
          const storageSizeMB = estimate.usage
            ? Math.round((estimate.usage / 1024 / 1024) * 10) / 10
            : 0;
          setStorageSize(storageSizeMB);
        });
      }
    }
  });

  // Check if local storage is not empty
  const isLocalStorageEmpty =
    typeof window !== "undefined"
      ? Object.keys(window.localStorage).length === 0
      : false;

  // Import storage
  const [hasImportedStorage, setHasImportedStorage] = useState(false);
  function ImportStorageCB() {
    importCB();

    // For 3 seconds, make hasExportedStorage true
    // This will disable the button
    setHasImportedStorage(true);
    setTimeout(() => {
      setHasImportedStorage(false);
    }, 3000);
  }

  // Export storage
  const [hasExportedStorage, setHasExportedStorage] = useState(false);
  function ExportStorageCB() {
    exportCB();

    // For 3 seconds, make hasExportedStorage true
    // This will disable the button
    setHasExportedStorage(true);
    setTimeout(() => {
      setHasExportedStorage(false);
    }, 3000);
  }

  // Log MXUPS version
  useEffect(() => {
    // This automatically logs the version of MXUPS
    versionMXUPS();
  });

  // Disable Keyboard Shortcuts confirmation modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

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

      <Stack direction="column" spacing={10}>
        <Heading>Osopcloud Settings</Heading>
        <SimpleGrid minChildWidth="340px" spacing={10}>
          <m.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Stack direction="column" spacing={{ base: 5, md: 10 }}>
              <Stack
                direction="column"
                spacing={2}
                onMouseOver={() => setIconIndex(1)}
                display={{ base: "none", sm: "flex" }}
              >
                <Text textStyle="miniHeading">In the Sidebar</Text>
                <Flex>
                  <Center>
                    <Text>Show Printing Options</Text>
                  </Center>
                  <Spacer />
                  <Stack direction="row" spacing={5}>
                    {switchLabels && (
                      <Center>
                        <Text fontSize="xs">
                          {showPrintButton ? "on" : "off"}
                        </Text>
                      </Center>
                    )}
                    <Switch
                      // @ts-ignore
                      isChecked={showPrintButton}
                      onChange={() =>
                        writeStorage(
                          "settingsShowPrintButton",
                          showPrintButton ? false : true
                        )
                      }
                      colorScheme="almondScheme"
                      size="lg"
                    />
                  </Stack>
                </Flex>
              </Stack>
              <Stack
                direction="column"
                spacing={2}
                onMouseOver={() => setIconIndex(2)}
              >
                <Text textStyle="miniHeading">
                  Advanced Application Behaviours
                </Text>
                <Flex>
                  <Center>
                    <Text>Disable Dynamic Printing</Text>
                  </Center>
                  <Spacer />
                  <Center>
                    <Stack direction="row" spacing={5}>
                      {switchLabels && (
                        <Center>
                          <Text fontSize="xs">
                            {disableDynamicPrinting ? "on" : "off"}
                          </Text>
                        </Center>
                      )}
                      <Switch
                        // @ts-ignore
                        isChecked={disableDynamicPrinting}
                        onChange={() =>
                          writeStorage(
                            "settingsDisableDynamicPrinting",
                            disableDynamicPrinting ? false : true
                          )
                        }
                        colorScheme="almondScheme"
                        size="lg"
                      />
                    </Stack>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Disable Custom Product Fonts</Text>
                  </Center>
                  <Spacer />
                  <Stack direction="row" spacing={5}>
                    {/* If applying the custom font, show a Spinner */}
                    {applyingCustomFont && (
                      <Center>
                        <Spinner size="xs" />
                      </Center>
                    )}
                    {switchLabels && (
                      <Center>
                        <Text fontSize="xs">
                          {applyingCustomFont
                            ? systemFont
                              ? "turning on"
                              : "turning off"
                            : systemFont
                            ? "on"
                            : "off"}
                        </Text>
                      </Center>
                    )}
                    <Switch
                      // @ts-ignore
                      isChecked={systemFont}
                      onChange={() => {
                        setApplyingCustomFont(true);
                        writeStorage(
                          "settingsUseSystemFont",
                          systemFont ? false : true
                        );
                        window.location.href = "/";
                      }}
                      colorScheme="almondScheme"
                      size="lg"
                    />
                  </Stack>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Disable Character-Only Keyboard Shortcuts</Text>
                  </Center>
                  <Spacer />
                  <Stack direction="row" spacing={5}>
                    {switchLabels && (
                      <Center>
                        <Text fontSize="xs">
                          {settingsDisableCOKeyboardShortcuts ? "on" : "off"}
                        </Text>
                      </Center>
                    )}
                    <Switch
                      // @ts-ignore
                      isChecked={settingsDisableCOKeyboardShortcuts}
                      onChange={() => {
                        writeStorage(
                          "settingsDisableCOKeyboardShortcuts",
                          settingsDisableCOKeyboardShortcuts ? false : true
                        );

                        // Open modal to confirm
                        if (!settingsDisableCOKeyboardShortcuts) {
                          onOpen();
                        }
                      }}
                      colorScheme="almondScheme"
                      size="lg"
                    />
                  </Stack>
                </Flex>
                <DynamicModal
                  useAlertDialog={true}
                  cancelRef={cancelRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <Stack direction="column" spacing={5}>
                    <Heading size="md">Disable Keyboard Shortcuts?</Heading>
                    <Text>
                      This will disable keyboard shortcuts that only use
                      character keys, like <Kbd>g then h</Kbd>.
                    </Text>
                    <Text>
                      Most Osopcloud keyboard shortcuts will no longer work.
                    </Text>
                    <Text fontSize="xs">
                      <Kbd>esc</Kbd> and <Kbd>tab</Kbd> cannot be disabled.
                    </Text>
                    <Button onClick={onClose}>Continue &amp; Disable</Button>
                    <Button
                      onClick={() => {
                        onClose();
                        writeStorage(
                          "settingsDisableCOKeyboardShortcuts",
                          settingsDisableCOKeyboardShortcuts ? false : true
                        );
                      }}
                      ref={cancelRef}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </DynamicModal>
                <Flex>
                  <Center>
                    <Text>Install Updates Immediately</Text>
                  </Center>
                  <Spacer />
                  <Stack direction="row" spacing={5}>
                    {switchLabels && (
                      <Center>
                        <Text fontSize="xs">
                          {immediateUpdate ? "on" : "off"}
                        </Text>
                      </Center>
                    )}
                    <Switch
                      // @ts-ignore
                      isChecked={immediateUpdate}
                      onChange={() =>
                        writeStorage(
                          "forceUpdate",
                          immediateUpdate ? false : true
                        )
                      }
                      colorScheme="almondScheme"
                      size="lg"
                    />
                  </Stack>
                </Flex>
              </Stack>
              <Stack
                direction="column"
                spacing={2}
                onMouseOver={() => setIconIndex(3)}
              >
                <Text textStyle="miniHeading">Manage Application Storage</Text>
                <Button
                  onClick={ImportStorageCB}
                  isDisabled={hasImportedStorage}
                >
                  {hasImportedStorage
                    ? "Imported"
                    : "Import Storage from Clipboard"}
                </Button>
                <Button
                  onClick={ExportStorageCB}
                  isDisabled={isLocalStorageEmpty || hasExportedStorage}
                >
                  {hasExportedStorage
                    ? "Copied"
                    : "Export Storage to Clipboard"}
                </Button>
                <ResetOsopcloudOverlay />
              </Stack>
              <Stack
                direction="column"
                spacing={2}
                onMouseOver={() => setIconIndex(4)}
              >
                {storageSize && (
                  <Text fontSize="xs">
                    Osopcloud is storing {storageSize} MB, on this device, for
                    this browser
                  </Text>
                )}
                <Text fontSize="xs">
                  Osopcloud Web Application version {version}
                </Text>
                <Text fontSize="xs">
                  Application storage powered by{" "}
                  <Link href="https://github.com/hikium/mxups">
                    Hikium MXUPS
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </m.div>
          <Center h="50vh" display={{ base: "none", lg: "flex" }}>
            <AnimatePresence exitBeforeEnter>
              <m.div
                key={iconIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {/* Use the icon with the iconIndex param */}
                <Icon
                  as={icon[iconIndex].function}
                  w={150}
                  h={150}
                  aria-label={icon[iconIndex].label}
                ></Icon>
              </m.div>
            </AnimatePresence>
          </Center>
        </SimpleGrid>
      </Stack>
    </>
  );
}
Settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showToTopButton={false} showShareButton={false}>
      {page}
    </Layout>
  );
};
