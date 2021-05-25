import React from "react"

import PageContainer from "components/layout/PageContainer"
import PageContent from "components/layout/PageContent"
import PageHeader from "components/layout/PageHeader"
import PageLoader from "components/layout/PageLoader"
import Room from "components/rooms/Room"
import RoomProvider from "components/rooms/RoomProvider"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import { useParams } from "hooks/useParams"
import { useTranslations } from "hooks/useTranslations"
import { useHydrationContext } from "lib/context/HydrationContext"
import { ROUTES } from "lib/utils/navigation"

export type RoomPageParams = {
  roomId: string
}

export default function RoomPage() {
  const isHydrated = useHydrationContext()
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
    <PageContainer>
      <PageHeader parents={parents} title={t.roomPage.pageTitle} />
      {isHydrated ? (
        <PageContent>
          <RoomProvider roomId={roomId}>
            {room => <Room room={room} />}
          </RoomProvider>
        </PageContent>
      ) : (
        <PageLoader message={t.roomPage.pageLoading} />
      )}
    </PageContainer>
  )
}
