import { createRoom } from "lib/api/rooms/create"
import { ApiTrigger, handleTrigger } from "lib/api/triggers"
import { GameType } from "lib/model/RoomData"
import { validateEnum, validateObject } from "lib/utils/validation"

export default handleTrigger<ApiTrigger.CREATE_ROOM>(
  validateObject({ game: validateEnum(GameType) }),
  ({ game }, userId) => createRoom(game, userId)
)
