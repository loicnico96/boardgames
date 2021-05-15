import React from "react"

import PageContainer from "components/layout/PageContainer"
import PageContent from "components/layout/PageContent"
import PageHeader from "components/layout/PageHeader"
import RoomList from "components/rooms/RoomList"
import RoomListProvider from "components/rooms/RoomListProvider"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import { useTranslations } from "hooks/useTranslations"
import { ROUTES } from "lib/utils/navigation"

export default function RoomListPage() {
  const t = useTranslations()

  const parents: BreadcrumbsParent[] = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  return (
    <PageContainer>
      <PageHeader parents={parents} title={t.roomList.pageTitle} />
      <PageContent>
        <RoomListProvider>
          {rooms => <RoomList rooms={rooms} />}
        </RoomListProvider>
      </PageContent>
    </PageContainer>
  )
}
