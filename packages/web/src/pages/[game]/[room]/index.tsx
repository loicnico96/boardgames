import { PageContent } from "@boardgames/components"
import { assert } from "@boardgames/utils"

import { RoomProvider } from "components/providers/RoomProvider"
import { PageLayout } from "components/ui/PageLayout"
import { useTranslations } from "hooks/useTranslations"
import { GameType, isGameType } from "lib/games/types"
import { getParam, RouteParam, ROUTES } from "lib/utils/navigation"
import { SSR } from "lib/utils/ssr"

export type RoomPageProps = {
  game: GameType
  roomId: string
}

export default function RoomPage({ game, roomId }: RoomPageProps) {
  const t = useTranslations()

  const parents = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
    {
      path: ROUTES.roomList(game),
      title: t.roomList.pageTitle,
    },
  ]

  return (
    <PageLayout parents={parents} title={t.games[game].name}>
      <PageContent>
        <RoomProvider game={game} roomId={roomId}>
          {t.games[game].name} - {roomId}
        </RoomProvider>
      </PageContent>
    </PageLayout>
  )
}

export const getServerSideProps = SSR<RoomPageProps>(params => {
  const game = getParam(params, RouteParam.GAME)
  assert(isGameType(game), "Missing or invalid game type")
  const roomId = getParam(params, RouteParam.ROOM)
  assert(!!roomId, "Missing room ID")
  return { game, roomId }
})
