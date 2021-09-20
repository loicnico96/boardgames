import {
  Button,
  Headline,
  Text,
  PageContainer,
  PageContent,
  PageHeader,
  Box,
  Breadcrumbs,
  UserInfo,
  BreadcrumbsParent,
} from "@boardgames/components"
import Head from "next/head"

export default function Home() {
  const parents: BreadcrumbsParent[] = [
    {
      path: "/parent",
      title: "Parent",
    },
  ]

  const title = "Title"
  const userName = "User"

  return (
    <PageContainer>
      <PageHeader>
        <Head>
          <title>{title}</title>
          <meta name="description" content={title} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Breadcrumbs flex={1} parents={parents} title={title} />
        <UserInfo onClick={console.log} userName={userName} />
      </PageHeader>
      <PageContent>
        <Headline>{title}</Headline>
        <Text>Paragraph 1</Text>
        <Text>Paragraph 2</Text>
        <Box gap={8}>
          <Button onClick={console.log}>Button 1</Button>
          <Button onClick={console.log}>Button 2</Button>
        </Box>
      </PageContent>
    </PageContainer>
  )
}
