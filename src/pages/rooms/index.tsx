import React from "react"

import PageContainer from "components/layout/PageContainer"
import PageContent from "components/layout/PageContent"
import PageHeader from "components/layout/PageHeader"
import PageLoader from "components/layout/PageLoader"
import RoomList from "components/rooms/RoomList"
import { useCreateRoom } from "components/rooms/RoomList/useCreateRoom"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import Button from "components/ui/Button"
import GameSelect from "components/ui/GameSelect"
import { useParamState } from "hooks/useParamState"
import { useTranslations } from "hooks/useTranslations"
import { useHydrationContext } from "lib/context/HydrationContext"
import { GameType } from "lib/model/RoomData"
import { isEnum } from "lib/utils/enums"
import { ROUTES } from "lib/utils/navigation"

export const GAME_PARAM = "game"

export default function RoomListPage() {
  const isHydrated = useHydrationContext()
  const t = useTranslations()

  const parents: BreadcrumbsParent[] = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  const [gameParam, setGameParam] = useParamState(GAME_PARAM)

  const game = isEnum(gameParam, GameType) ? gameParam : null

  const [createRoom, createRoomEnabled, createRoomReason] = useCreateRoom(game)

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
            disabled={!createRoomEnabled}
            onClick={createRoom}
            reason={createRoomReason}
            translations={t.roomList.createRoom}
          />
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
