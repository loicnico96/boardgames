import { HttpMethod } from "lib/api/types"
import { WithId } from "lib/firebase/firestore"
import { GameOptions, GameType, RoomData } from "lib/games/types"
import { RoutePath } from "lib/utils/navigation"

import { apiCall, apiPath } from "./utils"

export async function updateRoom<T extends GameType>(
  roomId: string,
  options: GameOptions<T>
): Promise<WithId<RoomData<T>>> {
  return apiCall(HttpMethod.PATCH, apiPath(RoutePath.ROOMS, roomId), {
    options,
  })
}
