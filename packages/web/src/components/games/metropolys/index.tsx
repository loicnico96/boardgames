import { Text } from "@boardgames/components"

import { GameProvider } from "components/providers/GameProvider"
import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { MetropolysApi } from "lib/games/metropolys/api"
import { GameType } from "lib/games/types"

import { Counter } from "./Counter"

export default function Metropolys() {
  const roomId = useRoomId()
  const t = useTranslations()

  return (
    <GameProvider
      api={MetropolysApi}
      game={GameType.METROPOLYS}
      roomId={roomId}
    >
      <Text>{t.games.metropolys.name}</Text>
      <Counter />
    </GameProvider>
  )
}
