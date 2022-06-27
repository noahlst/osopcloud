// Routing
import Link from "next/link";

// Design
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import { FiLifeBuoy } from "react-icons/fi";

// Start component
export default function HelpPopover() {
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<FiLifeBuoy />} aria-label="Help" />
      <Portal>
        <MenuList borderRadius="xl">
          <Link href="/docs/tour" passHref>
            <MenuItem as="a">Open Osopcloud Tour</MenuItem>
          </Link>
          <Link href="/docs" passHref>
            <MenuItem as="a">Documentation Home</MenuItem>
          </Link>
          <MenuDivider />
          <Link href="https://github.com/osopcloud/osopcloud" passHref>
            <MenuItem as="a" target="_blank">
              GitHub Source Repository
            </MenuItem>
          </Link>
          <MenuItem isDisabled>Developer Documentation on GitHub</MenuItem>
          <MenuDivider />
          <Link href="/about/privacy" passHref>
            <MenuItem as="a">Osopcloud Privacy Notice</MenuItem>
          </Link>
          <Link href="/about/terms" passHref>
            <MenuItem as="a">Terms</MenuItem>
          </Link>
        </MenuList>
      </Portal>
    </Menu>
  );
}
