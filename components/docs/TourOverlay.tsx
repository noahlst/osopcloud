// Design
import { Button, MenuItem, useDisclosure } from "@chakra-ui/react";

// First party components
import DynamicModal from "components/system/DynamicModal";
import AppTour from "components/docs/AppTour";

import { useRef } from "react";

interface TourOverlayProps {
  useMenuItem: boolean;
}

// Start component
export default function TourOverlay({ useMenuItem }: TourOverlayProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      {/* directLink will be a tab */}
      {/* Render a MenuItem with the matching title */}
      {useMenuItem ? (
        <MenuItem
          onClick={() => {
            onOpen();
          }}
        >
          Open Osopcloud Tour
        </MenuItem>
      ) : (
        <Button
          onClick={() => {
            onOpen();
          }}
        >
          Open Osopcloud Tour
        </Button>
      )}

      <DynamicModal
        isOpen={isOpen}
        onClose={onClose}
        useAlertDialog={false}
        cancelRef={cancelRef}
        size="5xl"
      >
        <AppTour />
      </DynamicModal>
    </>
  );
}
