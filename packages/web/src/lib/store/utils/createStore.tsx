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

export type UseStore<S extends object> = UseContextStore<S> & {
  Provider: ComponentType<StoreProviderProps>
}

export function createStore<S extends object, A>(
  initialState: S,
  createActions: (set: SetState<S>, get: GetState<S>) => A
): UseStore<Store<S, A>> {
  const createStoreInternal = () =>
    create(
      combine(initialState, (set, get) => ({
        actions: createActions(spec => set(state => update(state, spec)), get),
      }))
    )

  const { Provider, useStore } = createContext<Store<S, A>>()

  const StoreProvider = ({ children }: StoreProviderProps) => (
    <Provider createStore={createStoreInternal}>{children}</Provider>
  )

  return Object.assign(useStore, { Provider: StoreProvider })
}
