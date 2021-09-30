import { HttpMethod } from "lib/api/types"
import { WithId } from "lib/db/types"
import { GameType } from "lib/games/types"
import { RoomData } from "lib/model/RoomData"

import { apiCall, apiPath } from "./utils"

export async function createRoom<T extends GameType>(
  game: T
): Promise<WithId<RoomData<T>>> {
  return apiCall<WithId<RoomData<T>>>(
    HttpMethod.POST,
    apiPath("rooms", "create"),
    { game }
  )
}
