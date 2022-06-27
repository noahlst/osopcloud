// Design
import {
  Button,
  Center,
  createStandaloneToast,
  Flex,
  Heading,
  MenuItem,
  Spacer,
  Spinner,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Switch,
  Text,
  useBreakpointValue,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";
import theme from "lib/Theming";

// First party components
import DynamicModal from "components/system/DynamicModal";
import Note from "components/system/Note";
import DeleteSettings from "lib/DeleteSettings";
import { version } from "components/Version";

// Storage
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

import { useEffect, useRef, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface SettingsOverlayProps {
  directLink: number;
  useMenuItem: boolean;
}

// Start component
export default function SettingsOverlay({
  directLink,
  useMenuItem,
}: SettingsOverlayProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

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
  const [composerName] = useLocalStorage("composerName");
  const [composerDescription] = useLocalStorage("composerDescription");
  const [composerDate] = useLocalStorage("composerDate");
  const [composerTags] = useLocalStorage("composerTags");
  const [composerPlatforms] = useLocalStorage("composerPlatforms");
  const [composerBasedOn] = useLocalStorage("composerBasedOn");
  const [composerDefaultDesktop] = useLocalStorage("composerDefaultDesktop");
  const [composerDefaultShell] = useLocalStorage("composerDefaultShell");
  const [composerSoftware] = useLocalStorage("composerSoftware");
  const [composerPackageManagement] = useLocalStorage(
    "composerPackageManagement"
  );
  const [composerStartup] = useLocalStorage("composerStartup");
  const [composerAuthors] = useLocalStorage("composerAuthors");
  const [composerWebsite] = useLocalStorage("composerWebsite");
  const [composerRepository] = useLocalStorage("composerRepository");
  const [composerOrganisationName] = useLocalStorage(
    "composerOrganisationName"
  );

  const [applyingCustomFont, setApplyingCustomFont] = useState(false);

  // Setup storage tab

  const toast = createStandaloneToast({ theme: theme });

  // Get storage size
  const [storageSize, setStorageSize] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (navigator.storage) {
        navigator.storage.estimate().then((estimate) => {
          // estimate.usage is in bytes
          // We need to log the full byte value
          console.log("Full storage size", estimate.usage);
          // However to show the user, we need to convert to MB and round to one decimal place
          const storageSizeMB = estimate.usage
            ? Math.round((estimate.usage / 1024 / 1024) * 10) / 10
            : 0;
          setStorageSize(storageSizeMB);
        });
      }
    }
  });

  useEffect(() => {
    writeStorage("version", version);
  });

  // Reset functions
  function BeginReset() {
    DeleteSettings();
    if (systemFont) {
      window.location.reload();
    }
    console.info("Reset completed.");
  }
  function BeginResetWithToast() {
    DeleteSettings();
    if (systemFont) {
      setResetting(true);
      window.location.reload();
    }
    toast({
      position: "top",
      render: () => (
        <Note type="success" isToast={true}>
          Reset Successful
        </Note>
      ),
    });
    console.info("Reset completed.");
    onClose();
  }

  // Check reset eligibility
  const resetStatus = showPrintButton
    ? false
    : disableDynamicPrinting
    ? false
    : systemFont
    ? false
    : switchLabels
    ? false
    : settingsDisableCOKeyboardShortcuts
    ? false
    : immediateUpdate
    ? false
    : composerName
    ? false
    : composerDescription
    ? false
    : composerDate
    ? false
    : composerTags
    ? false
    : composerPlatforms
    ? false
    : composerBasedOn
    ? false
    : composerDefaultDesktop
    ? false
    : composerDefaultShell
    ? false
    : composerSoftware
    ? false
    : composerPackageManagement
    ? false
    : composerStartup
    ? false
    : composerAuthors
    ? false
    : composerWebsite
    ? false
    : composerRepository
    ? false
    : composerOrganisationName
    ? false
    : true;

  // Export settings
  const storage = typeof window !== "undefined" ? localStorage : "";
  const exportedSettings = JSON.stringify(storage);
  const { onCopy } = useClipboard(exportedSettings);
  function ExportSettings() {
    onCopy();
    console.info(
      "Export completed. Osopcloud storage data copied to clipboard."
    );
    toast({
      position: "top",
      render: () => (
        <Note type="success" isToast={true}>
          Storage Data Successfully Exported
        </Note>
      ),
    });
  }

  // Import settings
  function ImportSettings() {
    // @ts-ignore
    if (navigator.clipboard.readText) {
      console.debug(
        "navigator.clipboard.readText() supported. Beginning import."
      );
      navigator.clipboard.readText().then((text) => {
        // Try to JSON parse the text, if it fails, it's not a valid JSON string
        // Then show an error toast
        try {
          const importedSettings = JSON.parse(text);
          // If the version key in the imported settings is not the same as the current version, show an error toast
          if (importedSettings.version !== version) {
            console.error(
              "Storage data is from a different version (6)",
              importedSettings.version,
              version
            );
            toast({
              position: "top",
              render: () => (
                <Note type="error" isToast={true} errorCode={6}>
                  This Storage data is from a different version.
                </Note>
              ),
            });
          } else {
            console.debug(
              "JSON detected in clipboard. Resetting Osopcloud and applying new storage data.",
              text
            );
            BeginReset();
            for (const key in importedSettings) {
              writeStorage(key, importedSettings[key]);
            }
            // If text includes the settingsUseSystemFont key, refresh the page
            // Else just show a toast
            if (importedSettings.settingsUseSystemFont) {
              setImporting(true);
              console.info(
                "Import completed. Reloading to apply font settings."
              );
              window.location.reload();
            } else {
              console.info(
                "Import completed. Applied storage data from clipboard."
              );
              toast({
                position: "top",
                render: () => (
                  <Note type="success" isToast={true}>
                    Storage Successfully Imported
                  </Note>
                ),
              });
            }
          }
        } catch (e) {
          // If it fails, it's not a valid JSON string
          console.error("Import failed. Invalid JSON string.", e, text);
          toast({
            position: "top",
            render: () => (
              <Note isToast={true} type="error">
                No Storage Data Detected
              </Note>
            ),
          });
        }
      });
    } else {
      console.error(
        "Import failed. navigator.clipboard.readText() not supported. (2)"
      );
      toast({
        position: "top",
        render: () => (
          <Note type="error" isToast={true} errorCode={2}>
            This browser doesn't support reading the clipboard.
          </Note>
        ),
      });
    }
  }

  // Make the import and reset buttons have loading states
  const [importing, setImporting] = useState(false);
  const [resetting, setResetting] = useState(false);

  const [resetPrompt, setResetPrompt] = useState(false);

  // Render storage tab
  function ManageStorage() {
    return (
      <>
        {storageSize !== 0 && (
          <Center>
            <Stat>
              <StatLabel>Osopcloud is Storing</StatLabel>
              <StatNumber>{storageSize}mb</StatNumber>
              <StatHelpText>On this device, for this browser</StatHelpText>
            </Stat>
          </Center>
        )}
        <Button
          onClick={ImportSettings}
          isLoading={importing}
          loadingText="Importing"
        >
          Import Storage from Clipboard
        </Button>
        <Button onClick={ExportSettings} isDisabled={resetStatus}>
          Export Storage Data to Clipboard
        </Button>
        <Button onClick={() => setResetPrompt(true)} isDisabled={resetStatus}>
          Reset Osopcloud
        </Button>
      </>
    );
  }

  // Render other tabs
  function AccessibilityOptions() {
    return (
      <>
        <Flex>
          <Text>Use System Font</Text>
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
                window.location.reload();
              }}
              colorScheme="almondScheme"
              size="lg"
            />
          </Stack>
        </Flex>
        <Flex>
          <Center>
            <Text>Show Labels on Switches</Text>
          </Center>
          <Spacer />
          <Stack direction="row" spacing={5}>
            <Center>
              <Text fontSize="xs">{switchLabels ? "on" : "off"}</Text>
            </Center>
            <Switch
              // @ts-ignore
              isChecked={switchLabels}
              onChange={() => {
                writeStorage(
                  "settingsShowSwitchLabels",
                  switchLabels ? false : true
                );
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
              }}
              colorScheme="almondScheme"
              size="lg"
            />
          </Stack>
        </Flex>
      </>
    );
  }
  function AdvancedSettings() {
    return (
      <>
        <Flex display={{ base: "none", sm: "flex" }}>
          <Center>
            <Text>Show Printing Options</Text>
          </Center>
          <Spacer />
          <Stack direction="row" spacing={5}>
            {switchLabels && (
              <Center>
                <Text fontSize="xs">{showPrintButton ? "on" : "off"}</Text>
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
            <Text>Install Updates Immediately</Text>
          </Center>
          <Spacer />
          <Stack direction="row" spacing={5}>
            {switchLabels && (
              <Center>
                <Text fontSize="xs">{immediateUpdate ? "on" : "off"}</Text>
              </Center>
            )}
            <Switch // @ts-ignore
              isChecked={immediateUpdate}
              onChange={() =>
                writeStorage("forceUpdate", immediateUpdate ? false : true)
              }
              colorScheme="almondScheme"
              size="lg"
            />
          </Stack>
        </Flex>
      </>
    );
  }

  // Tab logic
  const [currentTab, setCurrentTab] = useState(0);
  const tabArray = [
    {
      title: "Accessibility Options",
      component: <AccessibilityOptions />,
    },
    {
      title: "Advanced Settings",
      component: <AdvancedSettings />,
    },
    {
      title: "Manage Storage",
      component: <ManageStorage />,
    },
  ];

  const modalTitle = useBreakpointValue({
    base: tabArray[currentTab].title,
    md: "Osopcloud Settings",
  });

  return (
    <>
      {/* directLink will be a tab */}
      {/* Render a MenuItem with the matching title */}
      {useMenuItem ? (
        <MenuItem
          onClick={() => {
            setResetPrompt(false);
            setCurrentTab(directLink);
            onOpen();
          }}
        >
          {tabArray[directLink].title}
        </MenuItem>
      ) : (
        <Button
          onClick={() => {
            setResetPrompt(false);
            setCurrentTab(directLink);
            onOpen();
          }}
        >
          {tabArray[directLink].title}
        </Button>
      )}

      <DynamicModal
        isOpen={isOpen}
        onClose={onClose}
        useAlertDialog={resetPrompt ? true : false}
        cancelRef={cancelRef}
        size="2xl"
      >
        <Stack direction="column" spacing={5}>
          {resetPrompt ? (
            <>
              <Heading size="md">Reset Osopcloud?</Heading>
              <Text>
                Resetting Osopcloud will restore the default settings
                {composerName &&
                  `, and destroy "${composerName}" in Osopcloud Composer`}
                .
              </Text>
              <Button
                leftIcon={<FiTrash2 />}
                onClick={BeginResetWithToast}
                isLoading={resetting}
                loadingText="Resetting Osopcloud"
              >
                Continue &amp; Reset
              </Button>
              <Button onClick={() => setResetPrompt(false)} ref={cancelRef}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Heading size="md">{modalTitle}</Heading>
              <Stack direction="row">
                <Stack
                  direction="column"
                  spacing={2}
                  display={{ base: "none", md: "flex" }}
                  me={10}
                  as="aside"
                >
                  {/* Map tab buttons */}
                  {tabArray.map((tab, index) => (
                    <Button
                      key={index}
                      // @ts-ignore
                      isActive={tab.title === tabArray[currentTab].title}
                      onClick={() => setCurrentTab(index)}
                    >
                      {tab.title}
                    </Button>
                  ))}
                </Stack>
                <Stack
                  direction="column"
                  spacing={5}
                  w="full"
                  h={storageSize ? 310 : 200}
                >
                  {/* Show the current tab component */}
                  {tabArray[currentTab].component}
                </Stack>
              </Stack>
              <Button onClick={onClose} ref={cancelRef}>
                Close
              </Button>
            </>
          )}
        </Stack>
      </DynamicModal>
    </>
  );
}
