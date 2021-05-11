import React from "react"

import PageContainer from "components/ui/PageContainer"
import PageContent from "components/ui/PageContent"
import PageHeader from "components/ui/PageHeader"
import { useQuery } from "hooks/db/useQuery"
import { useTranslations } from "hooks/useTranslations"
import { SortDirection } from "lib/db"

export default function RoomListPage() {
  const t = useTranslations()

  const [resource] = useQuery("room", {
    filter: [{ field: "game", value: "metropolys" }],
    sort: [{ field: "createdAt", direction: SortDirection.DESC }],
    limit: 5,
  })

  console.log("Rooms", resource)

  return (
    <PageContainer>
      <PageHeader title={t.roomList.pageTitle} />
      <PageContent>{t.roomList.pageTitle}</PageContent>
    </PageContainer>
  )
}
