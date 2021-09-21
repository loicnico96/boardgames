import {
  Button,
  Headline,
  Text,
  PageContent,
  Box,
  Link,
} from "@boardgames/components"
import NextLink from "next/link"

import { PageLayout } from "components/PageLayout"
import { ROUTES } from "lib/utils/navigation"

export default function HomePage() {
  const title = "Home"

  return (
    <PageLayout title={title}>
      <PageContent>
        <Headline>Title</Headline>
        <Text>Paragraph 1</Text>
        <Text>Paragraph 2</Text>
        <Text>
          <Link component={NextLink} href={ROUTES.login()}>
            Login
          </Link>
        </Text>
        <Text>
          <Link component={NextLink} href={ROUTES.roomList()}>
            Rooms
          </Link>
        </Text>
        <Box gap={8}>
          <Button onClick={console.log}>Button 1</Button>
          <Button onClick={console.log}>Button 2</Button>
        </Box>
      </PageContent>
    </PageLayout>
  )
}
