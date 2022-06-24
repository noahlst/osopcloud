// Types
import type { ReactElement } from "react";

// Design
import { Box, Center, Stack, Text } from "@chakra-ui/react";

import { Suspense } from "react";

interface CoreProps {
  children: ReactElement;
  type: string | boolean;
  m?: boolean;
}

export default function Note({ children, type, m }: CoreProps) {
  const focusColor =
    type === "success"
      ? "green"
      : type === "warning"
      ? "red"
      : type === "error"
      ? "red"
      : "inherit";
  return (
    <Box
      bg="whiteAlpha.500"
      px={5}
      py={2}
      border="1px"
      borderColor={focusColor}
      borderRadius="xl"
      shadow="sm"
      my={m ? 2 : 0}
    >
      <Suspense fallback={children}>
        <Stack direction="row" spacing={5}>
          <Center>
            {type !== false && (
              <Text fontSize="sm" fontWeight={600} color={focusColor}>
                {type === "success"
                  ? "Success:"
                  : type === "warning"
                  ? "Warning:"
                  : type === "error"
                  ? "Error:"
                  : "Note:"}
              </Text>
            )}
          </Center>
          <Text fontSize="sm">{children}</Text>
        </Stack>
      </Suspense>
    </Box>
  );
}
