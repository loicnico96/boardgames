import { getClientRef } from "@boardgames/common"
import { PageError, PageLoader } from "@boardgames/components"
import { ReactNode, useCallback } from "react"

import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useGameResource } from "hooks/rooms/useGameResource"
import { useRoomId } from "hooks/rooms/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { NotFoundError } from "lib/api/error"
import { GameState, GameType } from "lib/games/types"
import { useGlobalActions } from "lib/store/global"

export type GameProviderProps<T extends GameType> = {
  children: ReactNode
  game: T
}

export function GameProvider<T extends GameType>({
  children,
  game,
}: GameProviderProps<T>) {
  const { setGameResource } = useGlobalActions()

  const roomId = useRoomId()
  const gameResource = useGameResource(game, roomId)

  const t = useTranslations()

  useDocumentListener<GameState<T>>(
    getClientRef(game, roomId),
    useCallback(
      resource => setGameResource(game, roomId, resource),
      [game, roomId, setGameResource]
    )
  )

  if (gameResource.loading) {
    return <PageLoader message={t.room.pageLoading} />
  }

  if (gameResource.error instanceof NotFoundError) {
    return <PageError error={t.reason.notFoundRoom} />
  }

  if (gameResource.error) {
    return <PageError error={t.room.pageError} />
  }

  return <>{children}</>
}
