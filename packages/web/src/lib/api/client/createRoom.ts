import { HttpMethod } from "lib/api/types"
import { WithId } from "lib/firebase/firestore"
import { GameType } from "lib/games/types"
import { RoomData } from "lib/model/RoomData"
import { RoutePath } from "lib/utils/navigation"

import { apiCall, apiPath } from "./utils"

export async function createRoom<T extends GameType>(
  game: T
): Promise<WithId<RoomData<T>>> {
  return apiCall(HttpMethod.POST, apiPath(RoutePath.ROOMS, "create"), { game })
}
