import { getUserId } from "lib/api/auth"
import { handle } from "lib/api/rest"
import { ApiTrigger, handleTrigger } from "lib/api/triggers"
import { createRoom } from "lib/api/triggers/createRoom"
import { HttpMethod } from "lib/api/types"
import { GameType } from "lib/model/RoomData"
import { validateEnum, validateObject } from "lib/utils/validation"

export default handle({
  [HttpMethod.POST]: async (request, logger) => {
    const userId = await getUserId(request, logger)
    return handleTrigger<ApiTrigger.CREATE_ROOM>(
      validateObject({ game: validateEnum(GameType) }),
      ({ game }) => createRoom(game, userId)
    )(request)
  },
})
