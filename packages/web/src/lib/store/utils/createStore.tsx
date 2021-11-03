import update, { Spec } from "immutability-helper"
import { ComponentType, ReactNode } from "react"
import create from "zustand"
import createContext, { UseContextStore } from "zustand/context"
import { combine } from "zustand/middleware"

export type Store<S, A> = Omit<S, "actions"> & { actions: A }

export type GetState<S> = () => S
export type SetState<S> = (spec: Spec<S>) => void

export type StoreProviderProps = {
  children: ReactNode
}

export type CreateStoreResult<S extends object, A extends object> = {
  Provider: ComponentType<StoreProviderProps>
  useActions: () => A
  useGetState: () => GetState<Store<S, A>>
  useStore: UseContextStore<Store<S, A>>
}

export function createStore<S extends object, A extends object>(
  initialState: S,
  createActions: (set: SetState<S>, get: GetState<S>) => A
): CreateStoreResult<S, A> {
  const createStoreInternal = () =>
    create(
      combine(initialState, (set, get) => ({
        actions: createActions(spec => set(state => update(state, spec)), get),
      }))
    )

  const { Provider, useStore, useStoreApi } = createContext<Store<S, A>>()

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
