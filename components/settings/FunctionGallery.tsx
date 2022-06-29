// Design
import {
  Badge,
  Button,
  Center,
  Heading,
  MenuItem,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

// First party components
import DynamicModal from "components/system/DynamicModal";

import { useRef, useState } from "react";

interface FunctionGalleryProps {
  directLink: number;
  useMenuItem: boolean;
}

// Start component
export default function FunctionGallery({
  directLink,
  useMenuItem,
}: FunctionGalleryProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  function AvailableFunctions() {
    return (
      <Center h="full">
        <Text>Third-Party Functions are coming soon.</Text>
      </Center>
    );
  }
  function InstalledFunctions() {
    return (
      <>
        <Text>Access Functions in Options or the Function Bar.</Text>
        <Stack direction="column" spacing={2}>
          <Stack direction="column" spacing={0}>
            <Text>Home</Text>
            <Text fontSize="xs">
              Discover open-source operating systems on Osopcloud.
            </Text>
          </Stack>
          <Button isDisabled>Remove Function</Button>
        </Stack>
        <Stack direction="column" spacing={2}>
          <Stack direction="column" spacing={0}>
            <Text>Osopcloud Composer</Text>
            <Text fontSize="xs">
              Osopcloud Composer makes it easy to create, edit and publish
              Operating System Pages on Osopcloud.
            </Text>
          </Stack>
          <Button isDisabled>Remove Function</Button>
        </Stack>
      </>
    );
  }

  // Tab logic
  const [currentTab, setCurrentTab] = useState(0);
  const tabArray = [
    {
      title: "Browse Functions",
      component: <AvailableFunctions />,
    },
    {
      title: "Installed Functions",
      component: <InstalledFunctions />,
    },
  ];

  const modalTitle = useBreakpointValue({
    base: tabArray[currentTab].title,
    md: "Osopcloud Function Gallery",
  });

  return (
    <>
      {/* directLink will be a tab */}
      {/* Render a MenuItem with the matching title */}
      {useMenuItem ? (
        <MenuItem
          onClick={() => {
            setCurrentTab(directLink);
            onOpen();
          }}
        >
          {tabArray[directLink].title}
        </MenuItem>
      ) : (
        <Button
          onClick={() => {
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
        useAlertDialog={false}
        cancelRef={cancelRef}
        size="2xl"
      >
        <Stack direction="column" spacing={5}>
          <Stack direction="row" spacing={5}>
            <Heading size="md">{modalTitle}</Heading>
            <Center display={{ base: "none", sm: "flex" }}>
              <Badge colorScheme="orange">Beta Preview</Badge>
            </Center>
          </Stack>
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
            <Stack direction="column" spacing={5} w="full" minH={280}>
              {/* Show the current tab component */}
              {tabArray[currentTab].component}
            </Stack>
          </Stack>
          <Button onClick={onClose} ref={cancelRef}>
            Close
          </Button>
        </Stack>
      </DynamicModal>
    </>
  );
}
