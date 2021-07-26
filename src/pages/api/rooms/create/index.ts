import { ApiError } from "lib/api/error"
import { handle, readBody } from "lib/api/server"
import { getUserId, getUserInfo } from "lib/api/server/auth"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { Collection } from "lib/db/collections"
import { firestore } from "lib/firebase/admin"
import { getGameSettings } from "lib/games/GameSettings"
import { GameType } from "lib/games/GameType"
import { RoomData, RoomStatus } from "lib/model/RoomData"
import { enumValue, object } from "lib/utils/validation"

export async function createRoom<T extends GameType>(
  userId: string,
  game: T
): Promise<string> {
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

  return doc.id
}

export default handle({
  [HttpMethod.POST]: async (request, logger) => {
    const userId = await getUserId(request, logger)
    const { game } = readBody(request, object({ game: enumValue(GameType) }))
    const roomId = await createRoom(userId, game)
    return { roomId }
  },
})
