import { compact, SortDir } from "@boardgames/utils"

import { useQuery, UseQueryResult } from "hooks/db/useQuery"
import { GameType } from "lib/games/types"
import { Collection } from "lib/model/collections"
import { RoomData } from "lib/model/RoomData"

const ROOM_DATA_FIELD_GAME: keyof RoomData = "game"
const ROOM_DATA_FIELD_CREATED_AT: keyof RoomData = "createdAt"
const ROOM_LIST_PAGE_SIZE = 10

export function useRoomList(game: GameType | null): UseQueryResult<RoomData> {
  return useQuery<RoomData>(Collection.ROOMS, {
    filter: compact([
      game && {
        field: ROOM_DATA_FIELD_GAME,
        value: game,
      },
    ]),
    limit: ROOM_LIST_PAGE_SIZE,
    sort: [
      {
        field: ROOM_DATA_FIELD_CREATED_AT,
        direction: SortDir.DESC,
      },
    ],
  })
}
