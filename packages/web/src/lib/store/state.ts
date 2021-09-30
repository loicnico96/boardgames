import { AuthState } from "lib/auth/types"
import { WithId } from "lib/db/types"
import { GameState, GameType } from "lib/games/types"
import { RoomData } from "lib/model/RoomData"
import { Resource } from "lib/utils/resource"

export type State = {
  auth: AuthState
  games: {
    [T in GameType]: Partial<Record<string, Resource<GameState<T>>>>
  }
  rooms: Partial<Record<string, Resource<WithId<RoomData>>>>
}

export function getInitialState(): State {
  return {
    auth: {
      loading: true,
      user: null,
    },
    games: {
      metropolys: {},
      roborally: {},
    },
    rooms: {},
  }
}
