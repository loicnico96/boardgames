import { Box, PageContent } from "@boardgames/components"
import styled from "@emotion/styled"
import { GetServerSideProps } from "next"

import { PageLayout } from "components/ui/PageLayout"
import { useParamState } from "hooks/useParamState"
import { useTranslations } from "hooks/useTranslations"
import { isGameType } from "lib/games/types"
import { RouteParam, ROUTES } from "lib/utils/navigation"

const StyledToolbar = styled(Box)`
  column-gap: 16px;
  margin-bottom: 16px;
`

export default function RoomListPage() {
  const t = useTranslations()

  const [gameParam] = useParamState(RouteParam.GAME)
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
        <StyledToolbar />
        {game ? t.games[game].name : "Unknown"}
      </PageContent>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
})
