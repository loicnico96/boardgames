import { GetServerSideProps } from "next"

import { RoomProvider } from "components/providers/RoomProvider"
import { Room } from "components/rooms/Room"
import { PageLayout } from "components/ui/PageLayout"
import { getParam } from "hooks/useParam"
import { withSearchParams } from "hooks/useSearchParams"
import { useTranslations } from "hooks/useTranslations"
import { GameType, isGameType } from "lib/games/types"
import { Param, ROUTES } from "lib/utils/navigation"

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
      path: withSearchParams(ROUTES.roomList(), { [Param.GAME_TYPE]: game }),
      title: t.roomList.pageTitle,
    },
  ]

  return (
    <PageLayout parents={parents} title={t.games[game].name}>
      <RoomProvider game={game} roomId={roomId}>
        <Room />
      </RoomProvider>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps<RoomPageProps> = async ({
  params = {},
}) => {
  const game = getParam(params, Param.GAME_TYPE)
  const roomId = getParam(params, Param.ROOM_ID)

  if (!roomId || !isGameType(game)) {
    return { notFound: true }
  }

  return {
    props: {
      game,
      roomId,
    },
  }
}
