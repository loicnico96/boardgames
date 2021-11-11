import { RoborallyContext } from "@boardgames/roborally"

import { GameProvider } from "components/providers/GameProvider"
import { GameType } from "lib/games/types"

import { Game } from "./Game"
import { RoborallyStoreProvider } from "./store"

export default function Cacao() {
  return (
    <RoborallyStoreProvider>
      <GameProvider context={RoborallyContext} game={GameType.ROBORALLY}>
        <Game />
      </GameProvider>
    </RoborallyStoreProvider>
  )
}
