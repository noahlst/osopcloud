// Design
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";

// First party components
import SettingsOverlay from "components/settings/SettingsOverlay";

// Start component
export default function SettingsPopover() {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FiMoreVertical />}
        aria-label="Settings"
      />
      <Portal>
        <MenuList borderRadius="xl">
          <MenuItem isDisabled>Open in Osopcloud App</MenuItem>
          <MenuDivider />
          <SettingsOverlay directLink={0} useMenuItem={true} />
          <SettingsOverlay directLink={1} useMenuItem={true} />
          <SettingsOverlay directLink={2} useMenuItem={true} />
          <MenuDivider />
          <Stack direction="column" spacing={0} px={3}>
            <Text fontSize="xs">Osopcloud Web Application</Text>
            <Text fontSize="xs">Version 1.0.0</Text>
          </Stack>
        </MenuList>
      </Portal>
    </Menu>
  );
}
