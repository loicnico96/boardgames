import { AuthState } from "lib/auth/types"
import { WithId } from "lib/db/types"
import { RoomData } from "lib/model/RoomData"
import { Resource } from "lib/utils/resource"

export type State = {
  auth: AuthState
  rooms: Partial<Record<string, Resource<WithId<RoomData>>>>
}

export function getInitialState(): State {
  return {
    auth: {
      loading: true,
      user: null,
    },
    rooms: {},
  }
}
