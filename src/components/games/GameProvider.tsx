import { ReactNode, useState } from "react"

import PageError from "components/layout/PageError"
import PageLoader from "components/layout/PageLoader"
import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useTranslations } from "hooks/useTranslations"
import { getClientRef } from "lib/db/collections"
import { GameState } from "lib/games/GameSettings"
import { GameType } from "lib/games/GameType"
import { LOADING, Resource } from "lib/utils/resources"

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

  const [resource, setResource] = useState<Resource<GameState<T>>>(LOADING)

  useDocumentListener<GameState<T>>(getClientRef(game, roomId), setResource)

  if (resource.loading) {
    return <PageLoader message={t.gamePage.pageLoading} />
  }

  if (resource.error) {
    return <PageError error={resource.error} />
  }

  return (
    <div>
      {game} - {roomId}: {JSON.stringify(resource)}
      <div>{children}</div>
    </div>
  )
}
