import { enumValue } from "@boardgames/utils"
import { ApiError } from "next/dist/server/api-utils"

import { getUserId, getUserInfo } from "lib/api/server/auth"
import { handle, readBody } from "lib/api/server/handle"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { firestore } from "lib/firebase/admin"
import { WithId } from "lib/firebase/firestore"
import { GameType } from "lib/games/types"
import { Collection } from "lib/model/collections"
import { RoomData, RoomStatus } from "lib/model/RoomData"

export async function createRoom<T extends GameType>(
  userId: string,
  game: T
): Promise<WithId<RoomData<T>>> {
  const { userName } = await getUserInfo(userId)

  if (!userName) {
    throw new ApiError(
      HttpStatus.FAILED_PRECONDITION,
      "You must set an username in order to create or join rooms"
    )
  }

  const roomData: RoomData<T> = {
    createdAt: Date.now(),
    createdBy: userId,
    game,
    options: {}, // TODO - Default options
    playerOrder: [userId],
    players: { [userId]: { name: userName } },
    status: RoomStatus.OPENED,
  }

  const doc = await firestore.collection(Collection.ROOMS).add(roomData)

  return { ...roomData, id: doc.id }
}

export default handle({
  [HttpMethod.POST]: async request => {
    const userId = await getUserId(request)
    const { game } = readBody(request, { game: enumValue(GameType) })
    return createRoom(userId, game)
  },
})
