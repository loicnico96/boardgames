import { GenericHttpResponse, HttpMethod } from "lib/api/types"
import { GameAction, GameType } from "lib/games/types"

import { apiCall, apiPath } from "./utils"

export async function playerAction<
  T extends GameType,
  C extends GameAction<T>["code"]
>(
  game: T,
  roomId: string,
  code: C,
  data: Omit<Extract<GameAction<T>, { code: C }>, "code">
): Promise<GenericHttpResponse> {
  return apiCall<GenericHttpResponse>(
    HttpMethod.POST,
    apiPath(game, roomId, "action"),
    { code, ...data }
  )
}
