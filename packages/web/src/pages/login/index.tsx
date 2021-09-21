import {
  Button,
  Headline,
  Text,
  PageContent,
  Box,
} from "@boardgames/components"

import { PageLayout } from "components/PageLayout"
import { ROUTES } from "lib/utils/navigation"

export default function LoginPage() {
  const parents = [
    {
      path: ROUTES.home(),
      title: "Home",
    },
  ]

  const title = "Login"

  return (
    <PageLayout parents={parents} title={title}>
      <PageContent>
        <Headline>Title</Headline>
        <Text>Paragraph 1</Text>
        <Text>Paragraph 2</Text>
        <Box gap={8}>
          <Button onClick={console.log}>Button 1</Button>
          <Button onClick={console.log}>Button 2</Button>
        </Box>
      </PageContent>
    </PageLayout>
  )
}
