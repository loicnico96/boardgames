import { Spec } from "immutability-helper"

import { GameEvent, GameState, GameType } from "lib/games/types"
import {
  createStore,
  GetState,
  SetState,
  Store,
  UseStore,
} from "lib/store/utils/createStore"

export type GameStoreState<T extends GameType, S> = {
  error: Error | null
  loading: boolean
  state: GameState<T>
  ui: S
}

export type GameStoreActions<T extends GameType, A> = A & {
  onEvent: (event: GameEvent<T>) => Promise<void>
  setError: (error: Error) => void
  setState: (state: GameState<T>) => void
}

export type GameStore<T extends GameType, S = {}, A = {}> = Store<
  GameStoreState<T, S>,
  GameStoreActions<T, A>
>

export type UseGameStore<T extends GameType, S = {}, A = {}> = UseStore<
  GameStore<T, S, A>
>

export function createGameStore<T extends GameType, S = {}, A = {}>(
  initialUiState: S,
  onEvent: (
    event: GameEvent<T>,
    set: SetState<S>,
    get: GetState<S>
  ) => Promise<void>,
  createActions: (set: SetState<S>, get: GetState<S>) => A
): UseGameStore<T, S, A> {
  const initialGameState = new Proxy({} as GameState<T>, {
    get: () => {
      throw Error("Invalid context")
    },
    set: () => {
      throw Error("Invalid context")
    },
  })

  return createStore<GameStoreState<T, S>, GameStoreActions<T, A>>(
    {
      error: null,
      loading: true,
      state: initialGameState,
      ui: initialUiState,
    },
    (set, get) => {
      const setUi = (spec: Spec<S>) => set({ ui: spec })
      const getUi = () => get().ui

      return {
        ...createActions(setUi, getUi),
        onEvent: event => onEvent(event, setUi, getUi),
        setError: error => set({ $merge: { error, loading: false } }),
        setState: state => set({ $merge: { state, loading: false } }),
      }
    }
  )
}
