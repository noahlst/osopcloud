// Types
import type { ReactElement } from "react";

// Design
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import Card from "components/system/Card";

import { useState } from "react";

interface DeepDiveProps {
  children: ReactElement;
  title: string;
}

/**
 * Hides technical and specialised information behind a button.
 *
 * @remarks
 * From the system collection. Inspired by the new React docs.
 */
export default function DeepDive({ children, title }: DeepDiveProps) {
  const [showDeepDive, setShowDeepDive] = useState(false);
  return (
    <Card>
      <Stack direction="column" spacing={5}>
        <Flex>
          <Center>
            <Stack direction="row" spacing={5}>
              <Text fontWeight={600}>{title}</Text>
              <Center>
                <Badge colorScheme="purple">Deep Dive</Badge>
              </Center>
            </Stack>
          </Center>
          <Spacer />
          <Button
            size="sm"
            onClick={() => {
              showDeepDive ? setShowDeepDive(false) : setShowDeepDive(true);
            }}
          >
            {showDeepDive ? "Hide Deep Dive" : "Show Deep Dive"}
          </Button>
        </Flex>
        {showDeepDive && <Box>{children}</Box>}
      </Stack>
    </Card>
  );
}
