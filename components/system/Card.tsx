// Types
import { ReactElement } from "react";

// Design
import { Box } from "@chakra-ui/react";

interface CardProps {
  children: ReactElement;
}

/**
 * Displays content in a stylised card.
 *
 * @remarks
 * From the system collection.
 */
export default function Card({ children }: CardProps) {
  return (
    <Box bg="whiteAlpha.500" p={5} borderRadius="xl" shadow="md">
      {children}
    </Box>
  );
}
