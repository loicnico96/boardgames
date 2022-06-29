import { GameContext, getClientRef } from "@boardgames/common"
import { PageError, PageLoader } from "@boardgames/components"
import { toError, wait } from "@boardgames/utils"
import { ReactNode, useCallback, useRef } from "react"

import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useGameResource } from "hooks/rooms/useGameResource"
import { useRoomId } from "hooks/rooms/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { NotFoundError } from "lib/api/error"
import {
  GameEvent,
  GameModel,
  GameData,
  GameType,
  GameState,
} from "lib/games/types"
import { useGlobalActions } from "lib/store/global"
import { Logger } from "lib/utils/logger"
import {
  getErrorResource,
  getLoadedResource,
  Resource,
} from "lib/utils/resource"

const EVENT_DURATION_MS = 600

export interface GameProviderProps<T extends GameType> {
  children: ReactNode
  game: T
  resolveState: (context: GameContext<GameModel<T>>) => Promise<void>
}

export function GameProvider<T extends GameType>({
  children,
  game,
  resolveState,
}: GameProviderProps<T>) {
  const { setGameResource } = useGlobalActions()

  const roomId = useRoomId()
  const gameResource = useGameResource(game, roomId)

  const t = useTranslations()

  const isResolving = useRef(false)
  const resourceQueue = useRef<Resource<GameData<T>>[]>([])

  useDocumentListener<GameData<T>>(
    getClientRef(game, roomId),
    useCallback(
      result => {
        const logger = new Logger(game)

        async function onStateChange(state: GameState<T>, event: GameEvent<T>) {
          logger.log("Event", event)
          setGameResource(game, roomId, getLoadedResource(state))
          return wait(EVENT_DURATION_MS)
        }

        async function handleGameData(data: GameData<T>) {
          const context = new GameContext(data, onStateChange)
          logger.log("State", context.state)
          setGameResource(game, roomId, getLoadedResource(context.state))
          if (context.isReady()) {
            await resolveState(context)
            logger.log("State", context.state)
            setGameResource(game, roomId, getLoadedResource(context.state))
          }
        }

        async function resolveQueue() {
          if (!isResolving.current) {
            try {
              isResolving.current = true
              while (resourceQueue.current.length) {
                const resource = resourceQueue.current.shift()
                if (resource?.data) {
                  try {
                    await handleGameData(resource.data)
                  } catch (error) {
                    const errorResource = getErrorResource(toError(error))
                    logger.error(error)
                    setGameResource(game, roomId, errorResource)
                  }
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
      [game, resolveState, roomId, setGameResource]
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
