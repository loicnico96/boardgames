import styled from "@emotion/styled"

import PageContent from "components/layout/PageContent"
import PageLayout from "components/layout/PageLayout"
import PageLoader from "components/layout/PageLoader"
import RoomList from "components/rooms/RoomList"
import { useCreateRoom } from "components/rooms/RoomList/useCreateRoom"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import Button from "components/ui/Button"
import GameSelect from "components/ui/GameSelect"
import { useParamState } from "hooks/useParamState"
import { useTranslations } from "hooks/useTranslations"
import { useHydrationContext } from "lib/context/HydrationContext"
import { GameType } from "lib/games/GameType"
import { isEnum } from "lib/utils/enums"
import { ROUTES } from "lib/utils/navigation"

export const GAME_PARAM = "game"

const RoomListToolbar = styled.div`
  column-gap: 24px;
  display: flex;
  margin-bottom: 24px;
`

const StyledGameSelect = styled(GameSelect)`
  min-width: 240px;
`

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
    <PageLayout parents={parents} title={t.roomList.pageTitle}>
      <PageContent>
        <RoomListToolbar>
          <StyledGameSelect
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
        </RoomListToolbar>
        {isHydrated ? (
          <RoomList game={game} />
        ) : (
          <PageLoader message={t.roomList.pageLoading} />
        )}
      </PageContent>
    </PageLayout>
  )
}
