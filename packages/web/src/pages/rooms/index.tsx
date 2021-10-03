import { Box, PageContent } from "@boardgames/components"
import styled from "@emotion/styled"
import { GetServerSideProps } from "next"
import { useEffect } from "react"

import { RoomList } from "components/rooms/RoomList"
import { useCreateRoom } from "components/rooms/RoomList/useCreateRoom"
import { AsyncButton } from "components/ui/AsyncButton"
import { GameSelect } from "components/ui/GameSelect"
import { PageLayout } from "components/ui/PageLayout"
import { useParamState } from "hooks/useParamState"
import { useTranslations } from "hooks/useTranslations"
import { isGameType } from "lib/games/types"
import { Console } from "lib/utils/logger"
import { Param, ROUTES } from "lib/utils/navigation"

const StyledToolbar = styled(Box)`
  column-gap: 16px;
  margin-bottom: 16px;
`

const StyledGameSelect = styled(GameSelect)`
  padding: 4px;
  min-width: 240px;
`

export default function RoomListPage() {
  const t = useTranslations()
  const [gameParam, setGameParam] = useParamState(Param.GAME_TYPE)
  const game = isGameType(gameParam) ? gameParam : null

  useEffect(() => {
    if (game !== gameParam) {
      setGameParam(game).catch(error => Console.error(error))
    }
  }, [game, gameParam, setGameParam])

  const parents = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  const [createRoom, disabled, reason] = useCreateRoom(game)

  return (
    <PageLayout parents={parents} title={t.roomList.pageTitle}>
      <PageContent>
        <StyledToolbar>
          <StyledGameSelect onChange={setGameParam} value={game} />
          <AsyncButton
            disabled={disabled}
            onClick={createRoom}
            reason={reason}
            translations={t.roomList.createRoom}
          />
        </StyledToolbar>
        <RoomList game={game} />
      </PageContent>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
})
