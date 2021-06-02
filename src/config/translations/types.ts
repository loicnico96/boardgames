import { EnterRoomReason } from "components/rooms/Room/useEnterRoom"
import { LeaveRoomReason } from "components/rooms/Room/useLeaveRoom"
import { CreateRoomReason } from "components/rooms/RoomList/useCreateRoom"
import { Debug } from "lib/utils/debug"

export type TranslationConfig = {
  home: {
    pageTitle: string
  }
  login: {
    pageTitle: string
    rememberMe: string
    setUserName: string
    signIn: string
    signInAnonymously: ButtonTranslation
    signInWithGoogle: ButtonTranslation
    signOut: ButtonTranslation
  }
  roomList: {
    allGames: string
    createRoom: ButtonTranslation<CreateRoomReason>
    noRooms: string
    pageLoading: string
    pageTitle: string
  }
  roomPage: {
    enterRoom: ButtonTranslation<EnterRoomReason>
    leaveRoom: ButtonTranslation<LeaveRoomReason>
    pageLoading: string
    pageTitle: string
  }
}

export type ButtonTranslation<Reason extends string = never> = {
  label: string
  reason: Record<Reason, string>
  tooltip: string
}

export type ReplaceParam = number | string
export type ReplaceParams<T extends string> = Record<T, ReplaceParam>
export type Replace<T extends string> = (params: ReplaceParams<T>) => string

export function replace<T extends string>(entry: string): Replace<T> {
  return (params: ReplaceParams<T>) =>
    entry.replace(/{{([a-zA-Z0-9_]+)}}/g, (match, key: T) => {
      if (params[key]) {
        return String(params[key])
      }

      Debug.warn(`Could not replace parameters ${key}`, params)

      return match
    })
}
