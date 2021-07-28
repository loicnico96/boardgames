import { ReactNode, useCallback } from "react"

import PageError from "components/layout/PageError"
import PageLoader from "components/layout/PageLoader"
import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useActions } from "hooks/store/useActions"
import { useGameResource } from "hooks/store/useGameResource"
import { useTranslations } from "hooks/useTranslations"
import { getClientRef } from "lib/db/collections"
import { GameState } from "lib/games/GameSettings"
import { GameType } from "lib/games/GameType"

export type GameProviderProps<T extends GameType> = {
  children: ReactNode
  game: T
  roomId: string
}

export default function GameProvider<T extends GameType>({
  children,
  game,
  roomId,
}: GameProviderProps<T>) {
  const t = useTranslations()

  const { setGameResource } = useActions()

  const { data, error, loading } = useGameResource(game, r => r)

  useDocumentListener<GameState<T>>(
    getClientRef(game, roomId),
    useCallback(
      resource => setGameResource(game, roomId, resource),
      [game, roomId, setGameResource]
    )
  )

  if (loading) {
    return <PageLoader message={t.gamePage.pageLoading} />
  }

  if (error) {
    return <PageError error={error} />
  }

  return (
    <div>
      {game} - {roomId}: {JSON.stringify(data)}
      <div>{children}</div>
    </div>
  )
}
