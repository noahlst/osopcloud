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

// First party components
import TourOverlay from "components/docs/TourOverlay";

// Start component
export default function HelpPopover() {
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<FiLifeBuoy />} aria-label="Help" />
      <Portal>
        <MenuList borderRadius="xl">
          <TourOverlay useMenuItem={true} />
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
            <MenuItem as="a">Osopcloud Privacy Statement</MenuItem>
          </Link>
          <Link href="/about/terms" passHref>
            <MenuItem as="a">Terms</MenuItem>
          </Link>
        </MenuList>
      </Portal>
    </Menu>
  );
}
