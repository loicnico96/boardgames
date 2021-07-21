import { playerAction } from "lib/api/rooms/action"
import { handleTrigger } from "lib/api/server"
import { ApiTrigger } from "lib/api/triggers"
import { GameType } from "lib/games/GameType"
import { string, object, any, enumValue } from "lib/utils/validation"

export default handleTrigger<ApiTrigger.PLAYER_ACTION>(
  object({ action: any(), game: enumValue(GameType), roomId: string() }),
  ({ action, game, roomId }, userId) =>
    playerAction(game, roomId, userId, action)
)
