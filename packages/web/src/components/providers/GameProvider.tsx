import { getClientRef } from "@boardgames/common"
import { PageError, PageLoader } from "@boardgames/components"
import { toError, wait } from "@boardgames/utils"
import { ReactNode, useCallback, useRef } from "react"

import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useGameResource } from "hooks/rooms/useGameResource"
import { useRoomId } from "hooks/rooms/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { NotFoundError } from "lib/api/error"
import { Constructor, GameContext } from "lib/games/context"
import { GameEvent, GameState, GameType } from "lib/games/types"
import { useGlobalActions } from "lib/store/global"
import { Logger } from "lib/utils/logger"
import {
  getErrorResource,
  getLoadedResource,
  Resource,
} from "lib/utils/resource"

const EVENT_DURATION_MS = 600

export type GameProviderProps<T extends GameType> = {
  children: ReactNode
  context: Constructor<GameContext<T>>
  game: T
}

export function GameProvider<T extends GameType>({
  children,
  context: Context,
  game,
}: GameProviderProps<T>) {
  const { setGameResource } = useGlobalActions()

  const roomId = useRoomId()
  const gameResource = useGameResource(game, roomId)

  const t = useTranslations()

  const isResolving = useRef(false)
  const resourceQueue = useRef<Resource<GameState<T>>[]>([])

  useDocumentListener<GameState<T>>(
    getClientRef(game, roomId),
    useCallback(
      result => {
        const logger = new Logger(game)

        async function onStateChange(state: GameState<T>, event: GameEvent<T>) {
          logger.log("Event", event)
          setGameResource(game, roomId, getLoadedResource(state))
          return wait(EVENT_DURATION_MS)
        }

        async function handleState(state: GameState<T>) {
          logger.log("State", state)
          setGameResource(game, roomId, getLoadedResource(state))

          try {
            const context = new Context()
            context.setState(state)
            context.onStateChange(onStateChange)
            await context.resolveState()
            logger.log("State", context.state)
          } catch (error) {
            logger.error(error)
            setGameResource(game, roomId, getErrorResource(toError(error)))
          }
        }

        async function resolveQueue() {
          if (!isResolving.current) {
            try {
              isResolving.current = true
              while (resourceQueue.current.length) {
                const resource = resourceQueue.current.shift()
                if (resource?.data) {
                  await handleState(resource.data)
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
        resolveQueue().catch(logger.error)
      },
      [Context, game, roomId, setGameResource]
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
