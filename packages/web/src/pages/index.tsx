import { PageContent } from "@boardgames/components"
import styled from "@emotion/styled"

import { GameTile } from "components/home/GameTile"
import { PageLayout } from "components/ui/PageLayout"
import { useTranslations } from "hooks/useTranslations"
import { GameType } from "lib/games/types"

const GameTileList = styled.div`
  column-gap: 48px;
  display: flex;
`

export default function HomePage() {
  const t = useTranslations()

  return (
    <PageLayout title={t.home.pageTitle}>
      <PageContent>
        <GameTileList>
          {Object.values(GameType).map(game => (
            <GameTile game={game} key={game} />
          ))}
        </GameTileList>
      </PageContent>
    </PageLayout>
  )
}
