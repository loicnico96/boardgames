import { enterRoom } from "lib/api/rooms/enter"
import { handleTrigger } from "lib/api/server"
import { ApiTrigger } from "lib/api/triggers"
import { validateObject, validateString } from "lib/utils/validation"

export default handleTrigger<ApiTrigger.ENTER_ROOM>(
  validateObject({ roomId: validateString() }),
  ({ roomId }, userId) => enterRoom(roomId, userId)
)
