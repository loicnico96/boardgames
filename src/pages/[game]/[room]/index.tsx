import PageLayout from "components/layout/PageLayout"
import Room from "components/rooms/Room"
import RoomProvider from "components/rooms/RoomProvider"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import { useRoomId } from "hooks/store/useRoomId"
import { useParam } from "hooks/useParam"
import { useTranslations } from "hooks/useTranslations"
import { GameType } from "lib/games/GameType"
import { isEnum } from "lib/utils/enums"
import { Param, ROUTES } from "lib/utils/navigation"
import { withSearchParams } from "lib/utils/search"
import { SSR } from "lib/utils/ssr"
import NotFoundPage from "pages/404"

export default function RoomPage() {
  const game = useParam(Param.GAME_TYPE)
  const roomId = useRoomId()

  const t = useTranslations()

  if (!isEnum(game, GameType) || !roomId) {
    return <NotFoundPage />
  }

  const parents: BreadcrumbsParent[] = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
    {
      path: withSearchParams(ROUTES.roomList(), { game }),
      title: t.games[game].name,
    },
  ]

  return (
    <PageLayout parents={parents} title={roomId}>
      <RoomProvider roomId={roomId}>
        <Room />
      </RoomProvider>
    </PageLayout>
  )
}

export const getServerSideProps = SSR()
