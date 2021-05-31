import { useQuery } from "hooks/db/useQuery"
import { useActions } from "hooks/store/useActions"
import { UseCacheResult } from "hooks/useCache"
import { Collection } from "lib/db/collections"
import { QueryFilter, QueryOptions, SortDirection, WithId } from "lib/db/types"
import { GameType, RoomData } from "lib/model/RoomData"
import { generate } from "lib/utils/arrays"
import { getLoadedResource } from "lib/utils/resources"

const defaultOptions: QueryOptions = {
  sort: [{ field: "createdAt", direction: SortDirection.DESC }],
  limit: 20,
}

export function getQueryOptions(game: GameType | null): QueryOptions {
  const filter: QueryFilter[] = []

  if (game) {
    filter.push({ field: "game", value: game })
  }

  return {
    ...defaultOptions,
    filter,
  }
}

export function useRoomList(
  game: GameType | null
): UseCacheResult<WithId<RoomData>[]> {
  const { setRoomResources } = useActions()

  return useQuery<RoomData>(Collection.ROOMS, getQueryOptions(game), data => {
    setRoomResources(generate(data, room => [room.id, getLoadedResource(room)]))
  })
}
