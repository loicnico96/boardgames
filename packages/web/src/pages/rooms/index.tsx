import { PageContent } from "@boardgames/components"

import { RoomList } from "components/rooms/RoomList"
import { PageLayout } from "components/ui/PageLayout"
import { useTranslations } from "hooks/useTranslations"
import { ROUTES } from "lib/utils/navigation"
import { SSR } from "lib/utils/ssr"

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
        <RoomList />
      </PageContent>
    </PageLayout>
  )
}

export const getServerSideProps = SSR()
