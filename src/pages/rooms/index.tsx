import React from "react"

import PageContainer from "components/layout/PageContainer"
import PageContent from "components/layout/PageContent"
import PageHeader from "components/layout/PageHeader"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import { useQuery } from "hooks/db/useQuery"
import { useTranslations } from "hooks/useTranslations"
import { SortDirection } from "lib/db"
import { ROUTES } from "lib/utils/navigation"

export default function RoomListPage() {
  const t = useTranslations()

  const parents: BreadcrumbsParent[] = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  const [resource] = useQuery("room", {
    filter: [{ field: "game", value: "metropolys" }],
    sort: [{ field: "createdAt", direction: SortDirection.DESC }],
    limit: 5,
  })

  console.log("Rooms", resource)

  return (
    <PageContainer>
      <PageHeader parents={parents} title={t.roomList.pageTitle} />
      <PageContent>{t.roomList.pageTitle}</PageContent>
    </PageContainer>
  )
}
