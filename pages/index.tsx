import type { ReactElement } from "react";

import Layout from "components/layouts/Layout";

import { Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Page() {
  return <Text>This is the new Osopcloud <Link href="/test">Test</Link></Text>;
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
