import { leaveRoom } from "lib/api/rooms/leave"
import { handleTrigger } from "lib/api/server"
import { ApiTrigger } from "lib/api/triggers"
import { object, string } from "lib/utils/validation"

export default handleTrigger<ApiTrigger.LEAVE_ROOM>(
  object({ roomId: string() }),
  ({ roomId }, userId) => leaveRoom(roomId, userId)
)
