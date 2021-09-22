import { Headline, Text, PageContent } from "@boardgames/components"

import { PageLayout } from "components/ui/PageLayout"
import { useTranslations } from "config/translations/useTranslations"
import { ROUTES } from "lib/utils/navigation"

export default function RoomListPage() {
  const t = useTranslations()

  const parents = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  return (
    <PageLayout parents={parents} title={t.roomList.pageTitle}>
      <PageContent>
        <Headline>Title</Headline>
        <Text>Paragraph 1</Text>
        <Text>Paragraph 2</Text>
      </PageContent>
    </PageLayout>
  )
}
