import React from "react"

import PageContainer from "components/layout/PageContainer"
import PageHeader from "components/layout/PageHeader"
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
    <PageContainer>
      <PageHeader parents={parents} title={t.roomPage.pageTitle} />
      <RoomProvider roomId={roomId}>
        <Room />
      </RoomProvider>
    </PageContainer>
  )
}
