import { startGame } from "lib/api/rooms/start"
import { handleTrigger } from "lib/api/server"
import { ApiTrigger } from "lib/api/triggers"
import { validateObject, validateString } from "lib/utils/validation"

export default handleTrigger<ApiTrigger.START_GAME>(
  validateObject({ roomId: validateString() }),
  ({ roomId }, userId) => startGame(roomId, userId)
)
