// Types
import { ReactElement } from "react";

// Design
import { Box } from "@chakra-ui/react";

interface CoreProps {
  children: ReactElement;
}

export default function Card({ children }: CoreProps) {
  return (
    <Box bg="whiteAlpha.500" p={5} borderRadius="xl" shadow="md">
      {children}
    </Box>
  );
}
