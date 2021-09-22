import { PageContent } from "@boardgames/components"
import { GetServerSideProps } from "next"

import { RoomList } from "components/rooms/RoomList"
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

  return (
    <PageLayout parents={parents} title={t.roomList.pageTitle}>
      <PageContent>
        <RoomList game={game} />
      </PageContent>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
})
