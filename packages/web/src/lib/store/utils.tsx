import update, { Spec } from "immutability-helper"
import { ComponentType, ReactNode } from "react"
import create, { StoreApi } from "zustand"
import createContext from "zustand/context"
import { combine } from "zustand/middleware"

export type Store<S, A> = Omit<S, "actions"> & { actions: A }

export type GetState<S> = () => S
export type SetState<S> = (spec: Spec<S>) => void

export type Selector<S, T> = (state: S) => T
export type UseStore<S> = <T>(selector: Selector<S, T>) => T

export type StoreProviderProps = {
  children: ReactNode
}

export type CreateStoreResult<S, A> = {
  Provider: ComponentType<StoreProviderProps>
  useActions: () => A
  useGetState: () => GetState<Store<S, A>>
  useStore: UseStore<Store<S, A>>
}

export function createStore<S extends Record<string, unknown>, A>(
  initialState: S,
  createActions: (set: SetState<S>, get: GetState<S>) => A
): CreateStoreResult<S, A> {
  const createStoreInternal = () =>
    create(
      combine(initialState, (set, get) => ({
        actions: createActions(spec => set(state => update(state, spec)), get),
      }))
    )

  const { Provider, useStore, useStoreApi } =
    createContext<StoreApi<Store<S, A>>>()

  const StoreProvider = ({ children }: StoreProviderProps) => (
    <Provider createStore={createStoreInternal}>{children}</Provider>
  )

  return {
    Provider: StoreProvider,
    useActions: () => useStore(store => store.actions),
    useGetState: () => useStoreApi().getState,
    useStore,
  }
}
