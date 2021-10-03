import { GameApi } from "@boardgames/common"

import { MetropolysApi } from "./metropolys/api"
import { PapayooApi } from "./papayoo/api"
import { RoborallyApi } from "./roborally/api"
import { Games, GameType } from "./types"

export function getGameApi<T extends GameType>(game: T): GameApi<Games[T]> {
  return {
    metropolys: MetropolysApi,
    papayoo: PapayooApi,
    roborally: RoborallyApi,
  }[game] as GameApi<any>
}
