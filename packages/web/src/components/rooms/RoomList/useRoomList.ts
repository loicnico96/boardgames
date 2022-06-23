import { SortDir } from "@boardgames/utils"

import { useQuery, UseQueryResult } from "hooks/db/useQuery"
import { GameType } from "lib/games/types"
import { RoomData } from "lib/model/RoomData"

export function useRoomList(game: GameType | null): UseQueryResult<RoomData> {
  return useQuery<RoomData>("rooms", {
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
        direction: SortDir.DESC,
      },
    ],
  })
}
