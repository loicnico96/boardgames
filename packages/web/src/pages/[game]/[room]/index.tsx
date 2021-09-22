import { PageContent } from "@boardgames/components"
import { GetServerSideProps } from "next"

import { RoomProvider } from "components/rooms/RoomProvider"
import { PageLayout } from "components/ui/PageLayout"
import { getParam } from "hooks/useParam"
import { withSearchParams } from "hooks/useSearchParams"
import { useTranslations } from "hooks/useTranslations"
import { GameType, isGameType } from "lib/games"
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
    <PageLayout parents={parents} title={game}>
      <PageContent>
        <RoomProvider roomId={roomId}>
          {game} - {roomId}
        </RoomProvider>
      </PageContent>
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
