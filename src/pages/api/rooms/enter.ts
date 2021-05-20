import { enterRoom } from "lib/api/rooms/enter"
import { ApiTrigger, handleTrigger } from "lib/api/triggers"
import { validateObject, validateString } from "lib/utils/validation"

export default handleTrigger<ApiTrigger.ENTER_ROOM>(
  validateObject({ roomId: validateString() }),
  ({ roomId }, userId) => enterRoom(roomId, userId)
)
