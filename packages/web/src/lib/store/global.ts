import { RoomData } from "lib/model/RoomData"
import { Resource } from "lib/utils/resource"

import { createStore, Store } from "./utils"

export type GlobalState = {
  rooms: {
    [roomId in string]?: Resource<RoomData>
  }
}

export type GlobalActions = {
  setRoomResources: (resources: {
    [roomId in string]?: Resource<RoomData>
  }) => void
}

export type GlobalStore = Store<GlobalState, GlobalActions>

const initialState: GlobalState = {
  rooms: {},
}

export const {
  Provider: GlobalStoreProvider,
  useActions: useGlobalActions,
  useGetState: useGlobalState,
  useStore: useGlobalStore,
} = createStore<GlobalState, GlobalActions>(initialState, set => ({
  setRoomResources(resources) {
    set({
      rooms: {
        $merge: resources,
      },
    })
  },
}))
