import { PageError, PageLoader } from "@boardgames/components"
import { ReactNode, useCallback, useRef } from "react"

import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useActions } from "hooks/store/useActions"
import { useGameResource } from "hooks/useGameResource"
import { useTranslations } from "hooks/useTranslations"
import { getClientRef } from "lib/db/collections"
import { Constructor, GameContext } from "lib/games/context"
import { GameEvent, GameState, GameType } from "lib/games/types"
import { Logger } from "lib/utils/logger"
import { wait } from "lib/utils/performance"
import { getLoadedResource } from "lib/utils/resource"

export interface GameProviderProps<T extends GameType> {
  children: ReactNode
  context: Constructor<GameContext<T>, [state: GameState<T>]>
  game: T
  roomId: string
}

export function GameProvider<T extends GameType>({
  children,
  context,
  game,
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

        function onStateChange(state: GameState<T>, event: GameEvent<T>) {
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
                const ctx = new context(nextState)
                ctx.onStateChange(onStateChange)
                await ctx.resolve()
                setGameState(ctx.state)
              }
            }
          } finally {
            isResolving.current = false
          }
        }

        if (result.data) {
          stateQueue.current.push(result.data)
          if (!isResolving.current) {
            resolveStateQueue().catch(error => logger.error(error))
          }
        } else {
          setGameResource(game, roomId, result)
        }
      },
      [context, game, roomId, setGameResource]
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
