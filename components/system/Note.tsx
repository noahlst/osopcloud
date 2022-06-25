// Types
import type { ReactElement } from "react";

// Design
import {
  Box,
  Center,
  Code,
  Flex,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { Suspense } from "react";

interface NoteProps {
  children: ReactElement | string;
  type: string | boolean;
  isToast?: boolean;
  errorCode?: number;
  m?: boolean;
}

/**
 * Displays a notice to the user, informing them of something important.
 *
 * @remarks
 * This is from the system collection, replacing Chakra UI `<Alert>`. Inspired by Geist `<Note>`.
 *
 * @example
 * ```js
 * <Note>Always change your password after a leak on another site.</Note>
 * ```
 *
 * @example
 * We can add a string type, choosing from "error", "warning", or "success".
 * ```js
 * <Note type="error">Incorrect password.</Note>
 * ```
 *
 * @example
 * We can also remove the "note" bolded text label, like this:
 * ```js
 * <Note type={false}>A (more) discreet note without "note"</Note>
 * ```
 */
export default function Note({
  children,
  type,
  errorCode,
  isToast,
  m,
}: NoteProps) {
  // const greenFocusColour = useColorModeValue("green.400", "green.100");
  // const redFocusColour = useColorModeValue("red.400", "red.100");
  // const focusColour =
  //   type === "success"
  //     ? greenFocusColour
  //     : type === "warning"
  //     ? redFocusColour
  //     : type === "error"
  //     ? redFocusColour
  //     : "inherit";

  // Colours
  const bgGreenFocusColour = useColorModeValue("green.50", "green.700");
  const bgRedFocusColour = useColorModeValue("red.50", "red.700");
  const bgFocusColour =
    type === "success"
      ? bgGreenFocusColour
      : type === "warning"
      ? bgRedFocusColour
      : type === "error"
      ? bgRedFocusColour
      : "whiteAlpha.400";
  const bgFocusColourToast =
    type === "success"
      ? "green.100"
      : type === "warning"
      ? "red.100"
      : type === "error"
      ? "red.100"
      : "white.50";

  // Children
  function NoteContent() {}
  return (
    <Box
      bg={isToast ? bgFocusColourToast : bgFocusColour}
      px={5}
      py={2}
      borderRadius="xl"
      shadow="md"
      my={m ? 2 : 0}
      minW={errorCode ? 500 : "inherit"}
      color={isToast ? "gray.800" : "inherit"}
    >
      <Suspense fallback={children}>
        <Flex>
          <Stack direction="row" spacing={5}>
            <Center>
              {type !== false && (
                <Text fontSize="sm" fontWeight={600}>
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
          {errorCode && (
            <>
              <Spacer />
              <Center>
                <Code fontSize="xs">{errorCode}</Code>
              </Center>
            </>
          )}
        </Flex>
      </Suspense>
    </Box>
  );
}
