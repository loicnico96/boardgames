import { HttpMethod } from "lib/api/types"
import { WithId } from "lib/firebase/firestore"
import { GameType } from "lib/games/types"
import { RoomData, RoomOptions } from "lib/model/RoomData"
import { RoutePath } from "lib/utils/navigation"

import { apiCall, apiPath } from "./utils"

export async function updateRoom<T extends GameType>(
  roomId: string,
  options: Partial<RoomOptions>
): Promise<WithId<RoomData<T>>> {
  return apiCall(HttpMethod.PATCH, apiPath(RoutePath.ROOMS, roomId), {
    options,
  })
}
