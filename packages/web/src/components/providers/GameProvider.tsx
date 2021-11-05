import { PageError, PageLoader } from "@boardgames/components"
import { toError, wait } from "@boardgames/utils"
import { ReactNode, useCallback, useRef } from "react"

import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useGameResource } from "hooks/store/useGameResource"
import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { getClientRef } from "lib/db/collections"
import { WithId } from "lib/db/types"
import { Constructor, GameContext } from "lib/games/context"
import { GameEvent, GameState, GameType } from "lib/games/types"
import { useGlobalActions } from "lib/store/global"
import { Logger } from "lib/utils/logger"
import {
  getErrorResource,
  getLoadedResource,
  Resource,
} from "lib/utils/resource"

export type GameProviderProps<T extends GameType> = {
  children: ReactNode
  context: Constructor<GameContext<T>>
  game: T
}

export function GameProvider<T extends GameType>({
  children,
  context,
  game,
}: GameProviderProps<T>) {
  const roomId = useRoomId()
  const t = useTranslations()

  const { setGameState } = useGlobalActions()

  const resourceError = useGameResource(game, roomId, res => res.error)
  const resourceLoading = useGameResource(game, roomId, res => res.loading)

  const isResolving = useRef(false)
  const resourceQueue = useRef<Resource<WithId<GameState<T>>>[]>([])

  useDocumentListener<GameState<T>>(
    getClientRef(game, roomId),
    useCallback(
      result => {
        const logger = new Logger(game)

        async function onStateChange(state: GameState<T>, event: GameEvent<T>) {
          logger.log("Event", event)
          setGameState(game, roomId, getLoadedResource(state))
          return wait(500)
        }

        async function resolveQueue() {
          if (!isResolving.current) {
            try {
              isResolving.current = true
              while (resourceQueue.current.length > 0) {
                const resource = resourceQueue.current.shift()
                if (resource?.data) {
                  logger.log("State", resource.data)
                  try {
                    const ctx = new context()
                    ctx.setState(resource.data)
                    ctx.onStateChange(onStateChange)
                    await ctx.resolve()
                    logger.log("State", ctx.state)
                    setGameState(game, roomId, getLoadedResource(ctx.state))
                  } catch (error) {
                    logger.error(error)
                    setGameState(game, roomId, getErrorResource(toError(error)))
                  }
                } else if (resource?.error) {
                  logger.error(resource.error)
                  setGameState(game, roomId, resource)
                }
              }
            } finally {
              isResolving.current = false
            }
          }
        }

        resourceQueue.current.push(result)
        resolveQueue().catch(console.error)
      },
      [context, game, roomId, setGameState]
    )
  )

  if (resourceLoading) {
    return <PageLoader message={t.game.pageLoading} />
  }

  if (resourceError) {
    return <PageError error={resourceError} />
  }

  return <>{children}</>
}
