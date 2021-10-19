import { Text } from "@boardgames/components"

import { GameProvider } from "components/providers/GameProvider"
import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { RoborallyContext } from "lib/games/roborally/context"
import { GameType } from "lib/games/types"
export default function Roborally() {
  const roomId = useRoomId()
  const t = useTranslations()

  return (
    <GameProvider
      context={RoborallyContext}
      game={GameType.ROBORALLY}
      roomId={roomId}
    >
      <Text>{t.games.roborally.name}</Text>
    </GameProvider>
  )
}
