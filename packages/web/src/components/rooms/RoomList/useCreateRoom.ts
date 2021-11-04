import { useRouter } from "next/router"
import { useCallback } from "react"

import { createRoom } from "lib/api/client/createRoom"
import { useAuthContext } from "lib/auth/context"
import { GameType } from "lib/games/types"
import { Console } from "lib/utils/logger"
import { ROUTES } from "lib/utils/navigation"

export function useCreateRoom(game: GameType | null) {
  const { user } = useAuthContext()

  const router = useRouter()

  const reason = user
    ? game
      ? user.userInfo.userName
        ? undefined
        : "noUserName"
      : "noGameSelected"
    : "notAuthenticated"

  const trigger = useCallback(async () => {
    if (game) {
      const data = await createRoom(game)
      router.push(ROUTES.room(game, data.id)).catch(Console.error)
    }
  }, [game, router])

  return [trigger, !!reason, reason] as const
}
