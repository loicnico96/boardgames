import { PageContent } from "@boardgames/components"
import { assert } from "@boardgames/utils"

import { RoomProvider } from "components/providers/RoomProvider"
import { PageLayout } from "components/ui/PageLayout"
import { useTranslations } from "hooks/useTranslations"
import { getParam, RouteParam, ROUTES } from "lib/utils/navigation"
import { SSR } from "lib/utils/ssr"

export type RoomPageProps = {
  roomId: string
}

export default function RoomPage({ roomId }: RoomPageProps) {
  const t = useTranslations()

  const parents = [
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
    <PageLayout parents={parents} title="...">
      <PageContent>
        <RoomProvider roomId={roomId}>{roomId}</RoomProvider>
      </PageContent>
    </PageLayout>
  )
}

export const getServerSideProps = SSR<RoomPageProps>(params => {
  const roomId = getParam(params, RouteParam.ROOM)
  assert(!!roomId, "Missing room ID")
  return { roomId }
})
