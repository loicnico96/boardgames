import React from "react"

import PageLayout from "components/layout/PageLayout"
import Room from "components/rooms/Room"
import RoomProvider from "components/rooms/RoomProvider"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import { useRoomIdParam } from "hooks/store/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { ROUTES } from "lib/utils/navigation"

export default function RoomPage() {
  const roomId = useRoomIdParam()

  const t = useTranslations()

  const parents: BreadcrumbsParent[] = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
    {
      path: ROUTES.roomList(),
      title: t.roomList.pageTitle,
    },
  ]

  return (
    <PageLayout parents={parents} title={t.roomPage.pageTitle}>
      <RoomProvider roomId={roomId}>
        <Room />
      </RoomProvider>
    </PageLayout>
  )
}
