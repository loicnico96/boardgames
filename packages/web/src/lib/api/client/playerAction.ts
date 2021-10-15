import { ActionCode, ActionData } from "@boardgames/common"

import { GenericHttpResponse, HttpMethod } from "lib/api/types"
import { Game, GameType } from "lib/games/types"

import { apiCall, apiPath } from "./utils"

export async function playerAction<
  T extends GameType,
  C extends ActionCode<Game<T>>
>(
  game: T,
  roomId: string,
  code: C,
  data: ActionData<Game<T>, C>
): Promise<GenericHttpResponse> {
  return apiCall<GenericHttpResponse>(
    HttpMethod.POST,
    apiPath(game, roomId, "action"),
    { code, ...data }
  )
}
