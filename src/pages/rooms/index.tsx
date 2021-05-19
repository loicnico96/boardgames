import { useRouter } from "next/router"
import React, { useCallback } from "react"

import PageContainer from "components/layout/PageContainer"
import PageContent from "components/layout/PageContent"
import PageHeader from "components/layout/PageHeader"
import RoomList from "components/rooms/RoomList"
import RoomListProvider from "components/rooms/RoomListProvider"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import Button from "components/ui/Button"
import { useTranslations } from "hooks/useTranslations"
import { trigger } from "lib/api/client"
import { ApiTrigger } from "lib/api/triggers"
import { GameType } from "lib/model/RoomData"
import { ROUTES } from "lib/utils/navigation"

export default function RoomListPage() {
  const router = useRouter()
  const t = useTranslations()

  const parents: BreadcrumbsParent[] = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  const game = GameType.ROBORALLY

  const createRoom = useCallback(async () => {
    const { roomId } = await trigger(ApiTrigger.CREATE_ROOM, { game })
    router.push(ROUTES.room(roomId))
  }, [game, router])

  return (
    <PageContainer>
      <PageHeader parents={parents} title={t.roomList.pageTitle} />
      <PageContent>
        <Button onClick={createRoom}>Create room</Button>
        <RoomListProvider>
          {rooms => <RoomList rooms={rooms} />}
        </RoomListProvider>
      </PageContent>
    </PageContainer>
  )
}
