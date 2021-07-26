import { useRouter } from "next/router"
import { useCallback } from "react"

import { getAuth } from "hooks/store/useAuth"
import { AsyncHandler } from "hooks/useAsyncHandler"
import { createRoom } from "lib/api/client/createRoom"
import { GameType } from "lib/games/GameType"
import { useStore } from "lib/store/context"
import { handleGenericError } from "lib/utils/error"
import { ROUTES } from "lib/utils/navigation"

export enum CreateRoomReason {
  NO_GAME_SELECTED = "noGameSelected",
  NOT_AUTHENTICATED = "notAuthenticated",
  NO_USERNAME = "noUserName",
}

export function useCreateRoom(
  game: GameType | null
): [AsyncHandler<[]>, boolean, CreateRoomReason?] {
  const router = useRouter()

  const reason = useStore(
    useCallback(
      store => {
        const { user } = getAuth(store)
        if (!user) {
          return CreateRoomReason.NOT_AUTHENTICATED
        } else if (!user.userInfo.userName) {
          return CreateRoomReason.NO_USERNAME
        } else if (!game) {
          return CreateRoomReason.NO_GAME_SELECTED
        } else {
          return undefined
        }
      },
      [game]
    )
  )

  const trigger = useCallback(async () => {
    if (game) {
      const { roomId } = await createRoom(game)
      router.push(ROUTES.room(game, roomId)).catch(handleGenericError)
    }
  }, [game, router])

  return [trigger, !reason, reason]
}
