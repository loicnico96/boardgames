import { Text } from "@boardgames/components"

import { GameProvider } from "components/providers/GameProvider"
import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { MetropolysContext } from "lib/games/metropolys/context"
import { GameType } from "lib/games/types"

import { Counter } from "./Counter"

export default function Metropolys() {
  const roomId = useRoomId()
  const t = useTranslations()

  return (
    <GameProvider
      context={MetropolysContext}
      game={GameType.METROPOLYS}
      roomId={roomId}
    >
      <Text>{t.games.metropolys.name}</Text>
      <Counter />
    </GameProvider>
  )
}
