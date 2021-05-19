import { useRouter } from "next/router"
import React, { useCallback } from "react"

import PageContainer from "components/layout/PageContainer"
import PageContent from "components/layout/PageContent"
import PageHeader from "components/layout/PageHeader"
import RoomList from "components/rooms/RoomList"
import RoomListProvider from "components/rooms/RoomListProvider"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import Button from "components/ui/Button"
import { useApiTrigger } from "hooks/api/useApiTrigger"
import { useTranslations } from "hooks/useTranslations"
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

  const createRoom = useApiTrigger(ApiTrigger.CREATE_ROOM)

  const game = GameType.ROBORALLY

  const onClick = useCallback(async () => {
    const { roomId } = await createRoom({ game })
    router.push(ROUTES.room(roomId))
  }, [createRoom, game, router])

  return (
    <PageContainer>
      <PageHeader parents={parents} title={t.roomList.pageTitle} />
      <PageContent>
        <Button onClick={onClick}>Create room</Button>
        <RoomListProvider>
          {rooms => <RoomList rooms={rooms} />}
        </RoomListProvider>
      </PageContent>
    </PageContainer>
  )
}
