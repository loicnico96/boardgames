import { signOut as _signOut } from "firebase/auth"

import firebaseAuth from "lib/firebase/auth"

export async function signOut(): Promise<void> {
  await _signOut(firebaseAuth)
}
