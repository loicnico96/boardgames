import { PageContent } from "@boardgames/components"
import styled from "@emotion/styled"

import { GameTile } from "components/home/GameTile"
import { PageLayout } from "components/ui/PageLayout"
import { useTranslations } from "hooks/useTranslations"
import { GameType } from "lib/games/types"

const StyledPageContent = styled(PageContent)`
  display: flex;
  gap: 0px 48px;
`

export default function HomePage() {
  const t = useTranslations()

  return (
    <PageLayout title={t.home.pageTitle}>
      <StyledPageContent>
        {Object.values(GameType).map(game => (
          <GameTile game={game} key={game} />
        ))}
      </StyledPageContent>
    </PageLayout>
  )
}
