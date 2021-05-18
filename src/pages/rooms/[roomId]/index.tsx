import React from "react"

import PageLayout from "components/layout/PageLayout"
import PageLoader from "components/layout/PageLoader"
import Room from "components/rooms/Room"
import RoomProvider from "components/rooms/RoomProvider"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import { useHydratedState } from "hooks/useHydratedState"
import { useParams } from "hooks/useParams"
import { useTranslations } from "hooks/useTranslations"
import { RoomId } from "lib/model/RoomData"
import { ROUTES } from "lib/utils/navigation"

export type RoomPageParams = {
  roomId: RoomId
}

export default function RoomPage() {
  const isHydrated = useHydratedState()
  const { roomId } = useParams<RoomPageParams>()

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
      {isHydrated ? (
        <RoomProvider roomId={roomId}>
          {room => <Room room={room} />}
        </RoomProvider>
      ) : (
        <PageLoader message={t.roomPage.pageLoading} />
      )}
    </PageLayout>
  )
}
