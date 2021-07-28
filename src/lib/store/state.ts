import { AuthState } from "lib/auth/types"
import { GameState } from "lib/games/GameSettings"
import { GameType } from "lib/games/GameType"
import { RoomData } from "lib/model/RoomData"
import { generate } from "lib/utils/arrays"
import { enumValues } from "lib/utils/enums"
import { UnsafeRecord } from "lib/utils/objects"
import { Resource } from "lib/utils/resources"

export type State = {
  auth: AuthState
  games: { [T in GameType]: UnsafeRecord<Resource<GameState<T>>> }
  rooms: UnsafeRecord<Resource<RoomData>>
}

export function getInitialState(): State {
  return {
    auth: {
      loading: true,
      user: null,
    },
    games: generate(enumValues(GameType), game => [game, {}]),
    rooms: {},
  }
}
