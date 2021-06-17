import { startGame } from "lib/api/rooms/start"
import { handleTrigger } from "lib/api/server"
import { ApiTrigger } from "lib/api/triggers"
import { object, string } from "lib/utils/validation"

export default handleTrigger<ApiTrigger.START_GAME>(
  object({ roomId: string() }),
  ({ roomId }, userId) => startGame(roomId, userId)
)
