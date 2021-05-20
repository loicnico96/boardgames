import { leaveRoom } from "lib/api/rooms/leave"
import { ApiTrigger, handleTrigger } from "lib/api/triggers"
import { validateObject, validateString } from "lib/utils/validation"

export default handleTrigger<ApiTrigger.LEAVE_ROOM>(
  validateObject({ roomId: validateString() }),
  ({ roomId }, userId) => leaveRoom(roomId, userId)
)
