import { enterRoom } from "lib/api/rooms/enter"
import { handleTrigger } from "lib/api/server"
import { ApiTrigger } from "lib/api/triggers"
import { object, string } from "lib/utils/validation"

export default handleTrigger<ApiTrigger.ENTER_ROOM>(
  object({ roomId: string() }),
  ({ roomId }, userId) => enterRoom(roomId, userId)
)
