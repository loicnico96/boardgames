import { createRoom } from "lib/api/rooms/create"
import { handleTrigger } from "lib/api/server"
import { ApiTrigger } from "lib/api/triggers"
import { GameType } from "lib/games/GameType"
import { enumValue, object } from "lib/utils/validation"

export default handleTrigger<ApiTrigger.CREATE_ROOM>(
  object({ game: enumValue(GameType) }),
  ({ game }, userId) => createRoom(game, userId)
)
