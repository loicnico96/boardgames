import { getClientRef, getRoomRef, getServerRef } from "@boardgames/common"

import { DocRef, firestore } from "lib/firebase/admin"
import { GameData, GameType, RoomData } from "lib/games/types"

export function getRoomDocRef<T extends GameType>(
  roomId: string
): DocRef<RoomData<T>> {
  return firestore.doc(getRoomRef(roomId)) as DocRef<RoomData<T>>
}

export function getClientDocRef<T extends GameType>(
  game: T,
  roomId: string
): DocRef<GameData<T>> {
  return firestore.doc(getClientRef(game, roomId)) as DocRef<GameData<T>>
}

export function getServerDocRef<T extends GameType>(
  game: T,
  roomId: string
): DocRef<GameData<T>> {
  return firestore.doc(getServerRef(game, roomId)) as DocRef<GameData<T>>
}
