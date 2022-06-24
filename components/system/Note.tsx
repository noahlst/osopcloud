// Types
import type { ReactElement } from "react";

// Design
import { Box, Center, Stack, Text } from "@chakra-ui/react";

import { Suspense } from "react";

interface NoteProps {
  children: ReactElement;
  type: string | boolean;
  m?: boolean;
}

/**
 * Displays a notice to the user, informing them of something important.
 *
 * @remarks
 * This is from the system collection, replacing Chakra UI `<Alert>`. Inspired by Geist `<Note>`.
 *
 * @param children Content of the window. Everything below the window's title bar.
 * @param type The type of note. Accepts "error", "warning", "success", and "note".
 * @param m Applies my={5}. Useful in Markdown.
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
export default function Note({ children, type, m }: NoteProps) {
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
