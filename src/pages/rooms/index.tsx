import React from "react"

import PageLayout from "components/layout/PageLayout"
import RoomList from "components/rooms/RoomList"
import RoomListProvider from "components/rooms/RoomListProvider"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import Button from "components/ui/Button"
import { useApiTrigger } from "hooks/api/useApiTrigger"
import { useTranslations } from "hooks/useTranslations"
import { ApiTrigger } from "lib/api/types"
import { ROUTES } from "lib/utils/navigation"

export default function RoomListPage() {
  const t = useTranslations()

  const parents: BreadcrumbsParent[] = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  const onClick = useApiTrigger(ApiTrigger.ROOM_CREATE)

  return (
    <PageLayout parents={parents} title={t.roomList.pageTitle}>
      <Button
        onClick={async () => {
          await onClick({ abc: "def" })
        }}
      >
        Create room
      </Button>
      <RoomListProvider>{rooms => <RoomList rooms={rooms} />}</RoomListProvider>
    </PageLayout>
  )
}
