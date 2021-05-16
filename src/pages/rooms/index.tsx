import React from "react"

import PageLayout from "components/layout/PageLayout"
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
    <PageLayout parents={parents} title={t.roomList.pageTitle}>
      <RoomListProvider>{rooms => <RoomList rooms={rooms} />}</RoomListProvider>
    </PageLayout>
  )
}
