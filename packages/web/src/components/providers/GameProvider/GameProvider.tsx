import { PageError, PageLoader } from "@boardgames/components"
import { ReactNode, useCallback, useRef } from "react"

import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useTranslations } from "hooks/useTranslations"
import { getClientRef } from "lib/db/collections"
import { WithId } from "lib/db/types"
import { Constructor, GameContext } from "lib/games/context"
import { GameEvent, GameState, GameType } from "lib/games/types"
import { UseGameStore } from "lib/store/utils/createGameStore"
import { Resource } from "lib/utils/resource"

export interface GameProviderProps<T extends GameType> {
  children: ReactNode
  context: Constructor<GameContext<T>, [state: GameState<T>]>
  game: T
  roomId: string
  store: UseGameStore<T>
}

function GameProviderInternal<T extends GameType>({
  children,
  context,
  game,
  roomId,
  store: useGameStore,
}: GameProviderProps<T>) {
  const t = useTranslations()

  const { actions, error, loading } = useGameStore()

  const isResolving = useRef(false)
  const resourceQueue = useRef<Resource<WithId<GameState<T>>>[]>([])

  useDocumentListener<GameState<T>>(
    getClientRef(game, roomId),
    useCallback(
      result => {
        async function onStateChange(state: GameState<T>, event: GameEvent<T>) {
          actions.setState(state)
          await actions.onEvent(event)
        }

        async function resolveQueue() {
          if (!isResolving.current) {
            try {
              isResolving.current = true
              while (resourceQueue.current.length > 0) {
                const resource = resourceQueue.current.shift()
                if (resource?.data) {
                  const ctx = new context(resource.data)
                  await ctx.resolve(onStateChange)
                  actions.setState(ctx.state)
                } else if (resource?.error) {
                  actions.setError(resource.error)
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
      [actions, context]
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

export function GameProvider<T extends GameType>(props: GameProviderProps<T>) {
  return (
    <props.store.Provider>
      <GameProviderInternal {...props} />
    </props.store.Provider>
  )
}
