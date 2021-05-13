import { GetServerSideProps } from "next"
import React, { useState } from "react"

import PageContainer from "components/layout/PageContainer"
import PageContent from "components/layout/PageContent"
import PageHeader from "components/layout/PageHeader"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useTranslations } from "hooks/useTranslations"
import cache from "lib/utils/cache"
import { ROUTES } from "lib/utils/navigation"

export type RoomPageProps = {
  roomId: string
}

export default function RoomPage({ roomId }: RoomPageProps) {
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

  const docRef = `room/${roomId}`

  const [resource, setResource] = useState(cache.get(docRef))

  useDocumentListener(docRef, setResource)

  console.log("Room", resource)

  return (
    <PageContainer>
      <PageHeader parents={parents} title={t.roomPage.pageTitle} />
      <PageContent>{t.roomPage.pageTitle}</PageContent>
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps<RoomPageProps> = async ({
  query,
}) => {
  if (query.roomId) {
    return {
      props: {
        roomId: Array.isArray(query.roomId) ? query.roomId[0] : query.roomId,
      },
    }
  }

  return {
    notFound: true,
  }
}
