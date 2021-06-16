import styled from "@emotion/styled"

import GameTile from "components/home/GameTile"
import PageContent from "components/layout/PageContent"
import PageLayout from "components/layout/PageLayout"
import { useTranslations } from "hooks/useTranslations"
import { GameType } from "lib/games/GameType"
import { enumValues } from "lib/utils/enums"

const StyledPageContent = styled(PageContent)`
  display: flex;
  gap: 0px 48px;
`

export default function HomePage() {
  const t = useTranslations()

  return (
    <PageLayout title={t.home.pageTitle}>
      <StyledPageContent>
        {enumValues(GameType).map(game => (
          <GameTile game={game} key={game} />
        ))}
      </StyledPageContent>
    </PageLayout>
  )
}
