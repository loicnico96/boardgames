import { Collection, getGameRef, getRef, RoomStatus } from "@boardgames/common"
import { enumValue, Random } from "@boardgames/utils"
import { ApiError } from "next/dist/server/api-utils"

import { getUserId, getUserInfo } from "lib/api/server/auth"
import { handle, readBody } from "lib/api/server/handle"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { firestore } from "lib/firebase/admin"
import { WithId } from "lib/firebase/firestore"
import { getGameDefinition } from "lib/games/definitions"
import { GameType, RoomData } from "lib/games/types"

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

  const { getInitialOptions } = getGameDefinition(game)

  const seed = Date.now()
  const generator = new Random(seed)
  const fetcher = async <S>(ref: string): Promise<S> => {
    const fullRef = getRef(getGameRef(game), ref)
    const doc = await firestore.doc(fullRef).get()
    if (doc.exists) {
      return doc.data() as S
    } else {
      throw new ApiError(HttpStatus.NOT_FOUND, `Not found: ${fullRef}`)
    }
  }

  const options = await getInitialOptions(generator, fetcher)

  const roomData: RoomData<T> = {
    createdAt: Date.now(),
    createdBy: userId,
    game,
    options,
    playerOrder: [userId],
    players: { [userId]: { name: userName } },
    status: RoomStatus.OPEN,
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
