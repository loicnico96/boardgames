import { useRouter } from "next/router"
import { useCallback } from "react"

import { useAuth } from "hooks/store/useAuth"
import { AsyncHandler } from "hooks/useAsyncHandler"
import { trigger } from "lib/api/client"
import { ApiTrigger } from "lib/api/triggers"
import { GameType } from "lib/games/GameType"
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

  const { user } = useAuth()

  const createRoom = useCallback(async () => {
    if (game) {
      const { roomId } = await trigger(ApiTrigger.CREATE_ROOM, { game })
      router.push(ROUTES.room(roomId)).catch(handleGenericError)
    }
  }, [game, router])

  if (!user) {
    return [createRoom, false, CreateRoomReason.NOT_AUTHENTICATED]
  } else if (!user.userInfo.userName) {
    return [createRoom, false, CreateRoomReason.NO_USERNAME]
  } else if (!game) {
    return [createRoom, false, CreateRoomReason.NO_GAME_SELECTED]
  } else {
    return [createRoom, true]
  }
}
