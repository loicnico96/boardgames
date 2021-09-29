import { HttpMethod } from "lib/api/types"
import { WithId } from "lib/db/types"
import { GameOptions, GameType } from "lib/games"
import { RoomData } from "lib/model/RoomData"

import { apiCall, apiPath } from "./utils"

export async function updateRoom<T extends GameType>(
  roomId: string,
  options: Partial<GameOptions<T>>
): Promise<WithId<RoomData<T>>> {
  return apiCall<WithId<RoomData<T>>>(
    HttpMethod.POST,
    apiPath("rooms", roomId, "options"),
    { options }
  )
}
