// Routing
import Link from "next/link";

// Design
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";

import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

// Start component
export default function DocsLayout({ children }: LayoutProps) {
  // Escape hatch, not intended for production
  const [sidebarActiveIndex, setSidebarActiveIndex] = useState(0);
  return (
    <Stack direction="column" spacing={5}>
      <Flex display="flex" flexDirection={{ base: "column", md: "row" }}>
        <Stack
          direction="column"
          spacing={5}
          me={{ base: 0, sm: 10 }}
          display={{ base: "none", sm: "flex" }}
          as="aside"
        >
          <Link href="/docs" passHref>
            <Button
              as="a"
              isActive={sidebarActiveIndex === 0}
              onClick={() => {
                setSidebarActiveIndex(0);
              }}
            >
              Documentation Home
            </Button>
          </Link>
          <Link href="/docs/tour" passHref>
            <Button as="a">Osopcloud Tour</Button>
          </Link>
          <Stack direction="column" spacing={2}>
            <Text fontWeight={600}>Operating Systems</Text>
            <Link href="/docs/os-pages" passHref>
              <Button
                as="a"
                isActive={sidebarActiveIndex === 1}
                onClick={() => {
                  setSidebarActiveIndex(1);
                }}
              >
                Operating System Pages
              </Button>
            </Link>
            <Link href="/docs/composer" passHref>
              <Button
                as="a"
                isActive={sidebarActiveIndex === 2}
                onClick={() => {
                  setSidebarActiveIndex(2);
                }}
              >
                Create with Osopcloud Composer
              </Button>
            </Link>
            <Link href="/docs/exporting-composer" passHref>
              <Button
                as="a"
                isActive={sidebarActiveIndex === 3}
                onClick={() => {
                  setSidebarActiveIndex(3);
                }}
              >
                Exporting from Osopcloud Composer
              </Button>
            </Link>
            <Link href="/docs/osopcloud-organisations" passHref>
              <Button
                as="a"
                isActive={sidebarActiveIndex === 4}
                onClick={() => {
                  setSidebarActiveIndex(4);
                }}
              >
                About Osopcloud for Organisations
              </Button>
            </Link>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Text fontWeight={600}>
              Functions, Settings, &amp; Accessibility
            </Text>
            <Link href="/docs/functions" passHref>
              <Button
                as="a"
                isActive={sidebarActiveIndex === 5}
                onClick={() => {
                  setSidebarActiveIndex(5);
                }}
              >
                About Functions
              </Button>
            </Link>
            <Link href="/docs/settings" passHref>
              <Button
                as="a"
                isActive={sidebarActiveIndex === 6}
                onClick={() => {
                  setSidebarActiveIndex(6);
                }}
              >
                About Settings
              </Button>
            </Link>
            <Link href="/docs/accessibility" passHref>
              <Button
                as="a"
                isActive={sidebarActiveIndex === 7}
                onClick={() => {
                  setSidebarActiveIndex(7);
                }}
              >
                Accessibility Options
              </Button>
            </Link>
            <Link href="/docs/storage" passHref>
              <Button
                as="a"
                isActive={sidebarActiveIndex === 8}
                onClick={() => {
                  setSidebarActiveIndex(8);
                }}
              >
                About Storage
              </Button>
            </Link>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Text fontWeight={600}>Features</Text>
            <Link href="/docs/sharing" passHref>
              <Button
                as="a"
                isActive={sidebarActiveIndex === 9}
                onClick={() => {
                  setSidebarActiveIndex(9);
                }}
              >
                Share Points &amp; Printing
              </Button>
            </Link>
            <Link href="/docs/keyboard-shortcuts" passHref>
              <Button
                as="a"
                isActive={sidebarActiveIndex === 10}
                onClick={() => {
                  setSidebarActiveIndex(10);
                }}
              >
                Keyboard Shortcuts
              </Button>
            </Link>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Text fontWeight={600}>Technical Documentation</Text>
            <Button
              isActive={sidebarActiveIndex === 11}
              onClick={() => {
                setSidebarActiveIndex(11);
              }}
              isDisabled
            >
              Developer Documentation
            </Button>
            <Link href="/docs/errors" passHref>
              <Button
                as="a"
                isActive={sidebarActiveIndex === 12}
                onClick={() => {
                  setSidebarActiveIndex(12);
                }}
              >
                Error Code Reference
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Box flex={1}>{children}</Box>
      </Flex>
    </Stack>
  );
}
