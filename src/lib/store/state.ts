import { AuthState } from "lib/auth/types"
import { RoomData } from "lib/model/RoomData"
import { UnsafeRecord } from "lib/utils/objects"
import { Resource } from "lib/utils/resources"

export type State = {
  auth: AuthState
  rooms: UnsafeRecord<Resource<RoomData>>
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
