import { createRoom } from "lib/api/rooms/create"
import { handleTrigger } from "lib/api/server"
import { ApiTrigger } from "lib/api/triggers"
import { GameType } from "lib/games/GameType"
import { validateEnum, validateObject } from "lib/utils/validation"

export default handleTrigger<ApiTrigger.CREATE_ROOM>(
  validateObject({ game: validateEnum(GameType) }),
  ({ game }, userId) => createRoom(game, userId)
)
