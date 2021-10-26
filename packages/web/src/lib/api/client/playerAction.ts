import { GenericHttpResponse, HttpMethod } from "lib/api/types"
import { GameAction, GameType } from "lib/games/types"

import { apiCall, apiPath } from "./utils"

export async function playerAction<T extends GameType>(
  game: T,
  roomId: string,
  action: GameAction<T>
): Promise<GenericHttpResponse> {
  return apiCall<GenericHttpResponse>(
    HttpMethod.POST,
    apiPath(game, roomId, "action"),
    action
  )
}
