import { ApiError } from "lib/api/error"
import { handle } from "lib/api/server"
import { getUserId, getUserInfo } from "lib/api/server/auth"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { Collection } from "lib/db/collections"
import { WithId } from "lib/db/types"
import { firestore } from "lib/firebase/admin"
import { GameType, getGameSettings } from "lib/games"
import { RoomData, RoomStatus } from "lib/model/RoomData"

export async function createRoom<T extends GameType>(
  userId: string,
  game: T
): Promise<WithId<RoomData<T>>> {
  const { userName } = await getUserInfo(userId)

  if (!userName) {
    throw new ApiError(
      HttpStatus.FAILED_PRECONDITION,
      "You must set an username in order to create or enter rooms."
    )
  }

  const { defaultOptions } = getGameSettings(game)

  const roomData: RoomData<T> = {
    createdAt: Date.now(),
    game,
    options: defaultOptions,
    ownerId: userId,
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
    // TODO - Validate body
    return createRoom(userId, request.body.game)
  },
})
