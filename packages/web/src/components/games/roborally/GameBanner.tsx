import { useCallback } from "react"

import { AsyncButton } from "components/ui/AsyncButton"
import { Banner } from "components/ui/GameView/Banner"
import { usePlayerAction } from "hooks/usePlayerAction"
import { GamePhase } from "lib/games/roborally/model"
import { GameType } from "lib/games/types"

import {
  useRoborallyActions,
  useRoborallyPlayer,
  useRoborallyState,
  useRoborallyStore,
} from "./store"

export type GameBannerProps = {
  playerId: string
}

export function GameBanner({ playerId }: GameBannerProps) {
  const lockedProgram = useRoborallyPlayer(playerId, player => player.program)
  const phase = useRoborallyState(state => state.phase)
  const ready = useRoborallyPlayer(playerId, player => player.ready)
  const turn = useRoborallyState(state => state.turn)

  const playerAction = usePlayerAction(GameType.ROBORALLY)

  const { program, powerDown } = useRoborallyStore()
  const { resetSelection } = useRoborallyActions()

  const fullProgram = lockedProgram.map((card, index) => card ?? program[index])

  const confirmReady = useCallback(
    () => playerAction({ code: "ready" }),
    [playerAction]
  )

  const confirmProgram = useCallback(async () => {
    await playerAction({ code: "program", program: fullProgram, powerDown })
    resetSelection()
  }, [playerAction, fullProgram, powerDown, resetSelection])

  if (ready) {
    return null
  }

  if (phase === GamePhase.READY) {
    return (
      <Banner>
        Turn {turn}
        <AsyncButton
          onClick={confirmReady}
          translations={{
            label: "Ready",
          }}
        />
      </Banner>
    )
  }

  if (phase === GamePhase.PROGRAM) {
    return (
      <Banner>
        Choose your program
        <AsyncButton
          disabled={fullProgram.includes(null)}
          onClick={confirmProgram}
          translations={{
            label: "Confirm",
          }}
        />
      </Banner>
    )
  }

  return null
}
