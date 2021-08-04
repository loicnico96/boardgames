import { ReactNode, useCallback, useRef } from "react"

import PageError from "components/layout/PageError"
import PageLoader from "components/layout/PageLoader"
import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useActions } from "hooks/store/useActions"
import { useGameResource } from "hooks/store/useGameResource"
import { useTranslations } from "hooks/useTranslations"
import { getClientRef } from "lib/db/collections"
import { GameEvent, GameState, getGameSettings } from "lib/games/GameSettings"
import { GameType } from "lib/games/GameType"
import { Debug } from "lib/utils/debug"
import { handleGenericError } from "lib/utils/error"
import {
  getLoadedResource,
  getResourceError,
  isLoading,
} from "lib/utils/resources"
import { wait } from "lib/utils/time"

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

  const { resolveState } = getGameSettings(game)

  const isResolving = useRef(false)
  const stateQueue = useRef<GameState<T>[]>([])

  useDocumentListener<GameState<T>>(
    getClientRef(game, roomId),
    useCallback(
      resource => {
        function setGameState(newState: GameState<T>) {
          setGameResource(game, roomId, getLoadedResource(newState))
        }

        async function onStateChanged(
          newState: GameState<T>,
          event: GameEvent<T>
        ) {
          Debug.log("[GameEvent]", event)
          setGameState(newState)
          await wait(500)
        }

        async function resolveStateQueue() {
          try {
            isResolving.current = true
            while (stateQueue.current.length > 0) {
              const newState = stateQueue.current.shift()
              if (newState) {
                setGameState(await resolveState(newState, onStateChanged))
              }
            }
          } finally {
            isResolving.current = false
          }
        }

        if (resource.data) {
          stateQueue.current.push(resource.data)
          if (!isResolving.current) {
            resolveStateQueue().catch(handleGenericError)
          }
        } else {
          setGameResource(game, roomId, resource)
        }
      },
      [game, roomId, resolveState, setGameResource]
    )
  )

  const error = useGameResource(game, getResourceError)
  const loading = useGameResource(game, isLoading)

  if (loading) {
    return <PageLoader message={t.gamePage.pageLoading} />
  }

  if (error) {
    return <PageError error={error} />
  }

  return <>{children}</>
}
