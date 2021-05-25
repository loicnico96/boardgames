import { useRouter } from "next/router"
import React, { useCallback } from "react"

import PageContainer from "components/layout/PageContainer"
import PageContent from "components/layout/PageContent"
import PageHeader from "components/layout/PageHeader"
import PageLoader from "components/layout/PageLoader"
import RoomList from "components/rooms/RoomList"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import Button from "components/ui/Button"
import GameSelect from "components/ui/GameSelect"
import { useParamState } from "hooks/useParamState"
import { useTranslations } from "hooks/useTranslations"
import { trigger } from "lib/api/client"
import { ApiTrigger } from "lib/api/triggers"
import { useHydrationContext } from "lib/context/HydrationContext"
import { GameType } from "lib/model/RoomData"
import { isEnum } from "lib/utils/enums"
import { ROUTES } from "lib/utils/navigation"

export const GAME_PARAM = "game"

export default function RoomListPage() {
  const isHydrated = useHydrationContext()
  const router = useRouter()
  const t = useTranslations()

  const parents: BreadcrumbsParent[] = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  const [gameParam, setGameParam] = useParamState(GAME_PARAM)

  const game = isEnum(gameParam, GameType) ? gameParam : null

  const createRoom = useCallback(async () => {
    if (game) {
      const { roomId } = await trigger(ApiTrigger.CREATE_ROOM, { game })
      router.push(ROUTES.room(roomId))
    }
  }, [game, router])

  return (
    <PageContainer>
      <PageHeader parents={parents} title={t.roomList.pageTitle} />
      <PageContent>
        <div>
          <GameSelect
            disabled={!isHydrated}
            onChange={setGameParam}
            value={game}
          />
          <Button
            disabled={!game}
            onClick={createRoom}
            title={t.roomList.createRoom.tooltip}
          >
            {t.roomList.createRoom.label}
          </Button>
        </div>
        {isHydrated ? (
          <RoomList game={game} />
        ) : (
          <PageLoader message={t.roomList.pageLoading} />
        )}
        <style jsx>{`
          div {
            margin-bottom: 24px;
          }
        `}</style>
      </PageContent>
    </PageContainer>
  )
}
