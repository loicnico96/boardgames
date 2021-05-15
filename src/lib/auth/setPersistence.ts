import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence as _setPersistence,
} from "firebase/auth"

import firebaseAuth from "lib/firebase/auth"

export async function setPersistence(persistence: boolean): Promise<void> {
  await _setPersistence(
    firebaseAuth,
    persistence ? browserLocalPersistence : browserSessionPersistence
  )
}
