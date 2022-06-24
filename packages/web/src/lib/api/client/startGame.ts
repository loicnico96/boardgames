import { HttpMethod } from "lib/api/types"
import { WithId } from "lib/firebase/firestore"
import { RoomData } from "lib/model/RoomData"
import { RoutePath } from "lib/utils/navigation"

import { apiCall, apiPath } from "./utils"

export async function startGame(roomId: string): Promise<WithId<RoomData>> {
  return apiCall(HttpMethod.POST, apiPath(RoutePath.ROOMS, roomId, "start"))
}
