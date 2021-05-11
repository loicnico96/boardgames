import { GetServerSideProps } from "next"
import React, { useState } from "react"

import PageContainer from "components/ui/PageContainer"
import PageContent from "components/ui/PageContent"
import PageHeader from "components/ui/PageHeader"
import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useTranslations } from "hooks/useTranslations"
import cache from "lib/utils/cache"

export type RoomPageProps = {
  roomId: string
}

export default function RoomPage({ roomId }: RoomPageProps) {
  const t = useTranslations()

  const docRef = `room/${roomId}`

  const [resource, setResource] = useState(cache.get(docRef))

  useDocumentListener(docRef, setResource)

  console.log("Room", resource)

  return (
    <PageContainer>
      <PageHeader title={t.roomPage.pageTitle} />
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
