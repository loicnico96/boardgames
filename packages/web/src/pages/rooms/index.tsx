import { PageContent } from "@boardgames/components"
import { GetServerSideProps } from "next"

import { RoomList } from "components/rooms/RoomList"
import { useCreateRoom } from "components/rooms/RoomList/useCreateRoom"
import { AsyncButton } from "components/ui/AsyncButton"
import { PageLayout } from "components/ui/PageLayout"
import { useSearchParam } from "hooks/useSearchParams"
import { useTranslations } from "hooks/useTranslations"
import { isGameType } from "lib/games"
import { Param, ROUTES } from "lib/utils/navigation"

export default function RoomListPage() {
  const t = useTranslations()
  const gameParam = useSearchParam(Param.GAME_TYPE)
  const game = isGameType(gameParam) ? gameParam : null

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
        <AsyncButton
          disabled={disabled}
          marginBottom={16}
          onClick={createRoom}
          reason={reason}
          translations={t.roomList.createRoom}
        />
        <RoomList game={game} />
      </PageContent>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
})
