import {
  Headline,
  Text,
  PageContent,
  Box,
  Button,
} from "@boardgames/components"

import { PageLayout } from "components/ui/PageLayout"
import { ROUTES } from "lib/utils/navigation"

export default function LoginPage() {
  const parents = [
    {
      path: ROUTES.home(),
      title: "Homepage",
    },
  ]

  return (
    <PageLayout parents={parents} title="Login">
      <PageContent>
        <Headline>Title</Headline>
        <Text>Paragraph 1</Text>
        <Text>Paragraph 2</Text>
        <Box gap={8}>
          <Button>Sign in as guest</Button>
        </Box>
      </PageContent>
    </PageLayout>
  )
}
