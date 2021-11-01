import { ApiError } from "lib/api/error"
import { handle, readBody } from "lib/api/server"
import { getUserId, getUserInfo } from "lib/api/server/auth"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { Collection } from "lib/db/collections"
import { WithId } from "lib/db/types"
import { firestore } from "lib/firebase/admin"
import { getGameContext } from "lib/games/context"
import { GameType } from "lib/games/types"
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

  const context = getGameContext(game)

  const options = context.getDefaultOptions()

  const roomData: RoomData<T> = {
    createdAt: Date.now(),
    game,
    options,
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
    const { game } = readBody<{ game: GameType }>(request)
    return createRoom(userId, game)
  },
})
