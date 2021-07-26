import { ApiError } from "lib/api/error"
import { handle, readBody, readParam } from "lib/api/server"
import { getUserId } from "lib/api/server/auth"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { GameType } from "lib/games/GameType"
import { isEnum } from "lib/utils/enums"
import { Param } from "lib/utils/navigation"
import { any } from "lib/utils/validation"

export async function playerAction(
  userId: string,
  game: GameType,
  roomId: string,
  action: unknown
): Promise<void> {
  //
}

export default handle({
  [HttpMethod.POST]: async (request, logger) => {
    const userId = await getUserId(request, logger)
    const game = readParam(request, Param.GAME_TYPE)

    if (!isEnum(game, GameType)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, "Unknown game type")
    }

    const roomId = readParam(request, Param.ROOM_ID)
    const action = readBody(request, any())
    await playerAction(userId, game, roomId, action)
    return { success: true }
  },
})
