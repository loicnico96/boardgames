import { PageError, PageLoader } from "@boardgames/components"
import { wait } from "@boardgames/utils"
import { ReactNode, useCallback, useRef } from "react"

import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { getClientRef } from "lib/db/collections"
import { WithId } from "lib/db/types"
import { Constructor, GameContext } from "lib/games/context"
import { GameEvent, GameState, GameType } from "lib/games/types"
import { useGlobalActions, useGlobalStore } from "lib/store/global"
import { Logger } from "lib/utils/logger"
import { getLoadedResource, Resource } from "lib/utils/resource"

export type GameProviderProps<T extends GameType> = {
  children: ReactNode
  context: Constructor<GameContext<T>, [state: GameState<T>]>
  game: T
}

export function GameProvider<T extends GameType>({
  children,
  context,
  game,
}: GameProviderProps<T>) {
  const roomId = useRoomId()
  const t = useTranslations()

  const { setGameResource } = useGlobalActions()

  const error = useGlobalStore(
    store => store.games[game][roomId]?.error ?? null
  )

  const loading = useGlobalStore(
    store => store.games[game][roomId]?.loading !== false
  )

  const isResolving = useRef(false)
  const resourceQueue = useRef<Resource<WithId<GameState<T>>>[]>([])

  useDocumentListener<GameState<T>>(
    getClientRef(game, roomId),
    useCallback(
      result => {
        const logger = new Logger(game)

        async function onStateChange(state: GameState<T>, event: GameEvent<T>) {
          setGameResource(game, roomId, getLoadedResource(state))
          logger.log("Event", event)
          await wait(500)
        }

        async function resolveQueue() {
          if (!isResolving.current) {
            try {
              isResolving.current = true
              while (resourceQueue.current.length > 0) {
                const resource = resourceQueue.current.shift()
                if (resource?.data) {
                  logger.log("State", resource.data)
                  const ctx = new context(resource.data)
                  await ctx.resolve(onStateChange)
                  setGameResource(game, roomId, getLoadedResource(ctx.state))
                } else if (resource?.error) {
                  logger.error(resource.error)
                  setGameResource(game, roomId, resource)
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
      [context, game, roomId, setGameResource]
    )
  )

  if (loading) {
    return <PageLoader message={t.game.pageLoading} />
  }

  if (error) {
    return <PageError error={error} />
  }

  return <>{children}</>
}
