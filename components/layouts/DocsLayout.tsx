// Routing
import Link from "next/link";

// Design
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
  docsSidebarActiveIndex: number;
}

// Start component
export default function DocsLayout({
  children,
  docsSidebarActiveIndex,
}: LayoutProps) {
  return (
    <Stack direction="column" spacing={5}>
      <Flex display="flex" flexDirection={{ base: "column", md: "row" }}>
        <Stack direction="column" spacing={5} me={10} mb={5}>
          <Link href="/docs" passHref>
            <Button as="a" isActive={docsSidebarActiveIndex === 0}>
              Documentation Home
            </Button>
          </Link>
          <Link href="/docs/tour" passHref>
            <Button as="a">Osopcloud Tour</Button>
          </Link>
          <Stack direction="column" spacing={2}>
            <Text fontWeight={600}>Operating Systems</Text>
            <Button isActive={docsSidebarActiveIndex === 1}>
              Operating System Pages
            </Button>
            <Link href="/docs/composer" passHref>
              <Button as="a" isActive={docsSidebarActiveIndex === 2}>
                Osopcloud Composer
              </Button>
            </Link>
            <Button isActive={docsSidebarActiveIndex === 3}>
              Importing to Osopcloud Composer
            </Button>
            <Button isActive={docsSidebarActiveIndex === 4}>
              Exporting from Osopcloud Composer
            </Button>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Text fontWeight={600}>Experiences</Text>
            <Link href="/docs/sharing" passHref>
              <Button as="a" isActive={docsSidebarActiveIndex === 5}>
                Share Points &amp; Printing
              </Button>
            </Link>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Text fontWeight={600}>Badges, Settings, &amp; Accessibility</Text>
            <Button isActive={docsSidebarActiveIndex === 6}>
              About Badges
            </Button>
            <Link href="/docs/settings" passHref>
              <Button as="a" isActive={docsSidebarActiveIndex === 7}>
                About Settings
              </Button>
            </Link>
            <Link href="/docs/accessibility" passHref>
              <Button as="a" isActive={docsSidebarActiveIndex === 8}>
                Accessibility Options
              </Button>
            </Link>
            <Link href="/docs/storage" passHref>
              <Button as="a" isActive={docsSidebarActiveIndex === 9}>
                Storage
              </Button>
            </Link>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Text fontWeight={600}>Technical Documentation</Text>
            <Link href="/docs/keyboard-shortcuts" passHref>
              <Button as="a" isActive={docsSidebarActiveIndex === 10}>
                Keyboard Shortcuts
              </Button>
            </Link>
            <Button isActive={docsSidebarActiveIndex === 11}>
              How Osopcloud Content Works
            </Button>
            <Link href="/docs/errors" passHref>
              <Button as="a" isActive={docsSidebarActiveIndex === 12}>
                Error Reference
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Box flex={1}>{children}</Box>
      </Flex>
    </Stack>
  );
}
