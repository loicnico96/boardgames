import { Text, PageContent } from "@boardgames/components"

import { PageLayout } from "components/ui/PageLayout"
import { RouterLink } from "components/ui/RouterLink"
import { withSearchParams } from "hooks/useSearchParams"
import { useTranslations } from "hooks/useTranslations"
import { GameType } from "lib/games/types"
import { Param, ROUTES } from "lib/utils/navigation"

export default function HomePage() {
  const t = useTranslations()

  return (
    <PageLayout title={t.home.pageTitle}>
      <PageContent>
        {Object.values(GameType).map(game => {
          const url = withSearchParams(ROUTES.roomList(), {
            [Param.GAME_TYPE]: game,
          })

          return (
            <Text key={game}>
              <RouterLink href={url}>{t.games[game].name}</RouterLink>
            </Text>
          )
        })}
      </PageContent>
    </PageLayout>
  )
}
