import { useQuery, UseQueryResult } from "hooks/db/useQuery"
import { Collection } from "lib/db/collections"
import { SortDirection } from "lib/db/types"
import { GameType } from "lib/games"
import { RoomData } from "lib/model/RoomData"

export function useRoomList(game: GameType | null): UseQueryResult<RoomData> {
  return useQuery<RoomData>(Collection.ROOMS, {
    filter: game
      ? [
          {
            field: "game",
            value: game,
          },
        ]
      : [],
    limit: 10,
    sort: [
      {
        field: "createdAt",
        direction: SortDirection.DESC,
      },
    ],
  })
}
