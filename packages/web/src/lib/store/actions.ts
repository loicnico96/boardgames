import { Spec } from "immutability-helper"

import { AuthUser } from "lib/auth/types"
import { WithId } from "lib/db/types"
import { GameState, GameType } from "lib/games/types"
import { RoomData } from "lib/model/RoomData"
import { Resource } from "lib/utils/resource"

import { State } from "./state"

export type Actions = {
  setGameResource: <T extends GameType>(
    game: T,
    roomId: string,
    resource: Resource<GameState<T>>
  ) => void
  setRoomResources: (
    resources: Record<string, Resource<WithId<RoomData>>>
  ) => void
  setUser: (user: AuthUser | null) => void
  setUserName: (userName: string) => void
}

export type GetState = () => State
export type SetState = (action: string, spec: Spec<State>) => void

export function createActions(set: SetState): Actions {
  return {
    setGameResource(game, roomId, resource) {
      set("setGameResource", {
        games: {
          [game]: {
            $merge: {
              [roomId]: resource,
            },
          },
        },
      })
    },

    setRoomResources(resources) {
      set("setRoomResources", {
        rooms: {
          $merge: resources,
        },
      })
    },

    setUser(user) {
      set("setUser", {
        auth: {
          $merge: {
            loading: false,
            user,
          },
        },
      })
    },

    setUserName(userName) {
      set("setUserName", {
        auth: {
          user: {
            userInfo: {
              $merge: {
                userName,
              },
            },
          },
        },
      })
    },
  }
}
