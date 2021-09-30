import { GameSettings } from "@boardgames/common"
import { PageError, PageLoader } from "@boardgames/components"
import { ReactNode, useCallback, useRef } from "react"

import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useActions } from "hooks/store/useActions"
import { useGameResource } from "hooks/useGameResource"
import { useTranslations } from "hooks/useTranslations"
import { getClientRef } from "lib/db/collections"
import { GameEvent, Games, GameState, GameType } from "lib/games/types"
import { Logger } from "lib/utils/logger"
import { wait } from "lib/utils/performance"
import { getLoadedResource } from "lib/utils/resource"

export type GameProviderProps<T extends GameType> = {
  children: ReactNode
  game: T
  resolveState: GameSettings<Games[T]>["resolveState"]
  roomId: string
}

export function GameProvider<T extends GameType>({
  children,
  game,
  resolveState,
  roomId,
}: GameProviderProps<T>) {
  const resource = useGameResource(game, roomId)
  const t = useTranslations()

  const { setGameResource } = useActions()

  const isResolving = useRef(false)
  const stateQueue = useRef<GameState<T>[]>([])

  useDocumentListener<GameState<T>>(
    getClientRef(game, roomId),
    useCallback(
      result => {
        const logger = new Logger(game)

        function setGameState(state: GameState<T>) {
          setGameResource(game, roomId, getLoadedResource(state))
        }

        function onStateChanged(state: GameState<T>, event: GameEvent<T>) {
          logger.log("Event:", event)
          setGameState(state)
          return wait(500)
        }

        async function resolveStateQueue() {
          try {
            isResolving.current = true
            while (stateQueue.current.length > 0) {
              const nextState = stateQueue.current.shift()
              if (nextState) {
                setGameState(await resolveState(nextState, onStateChanged))
              }
            }
          } finally {
            isResolving.current = false
          }
        }

        if (result.data) {
          stateQueue.current.push(result.data)
          if (!isResolving.current) {
            resolveStateQueue().catch(logger.error)
          }
        } else {
          setGameResource(game, roomId, result)
        }
      },
      [game, resolveState, roomId, setGameResource]
    )
  )

  if (!resource || resource.loading) {
    return <PageLoader message={t.game.pageLoading} />
  }

  if (resource.error) {
    return <PageError error={resource.error} />
  }

  return <>{children}</>
}
