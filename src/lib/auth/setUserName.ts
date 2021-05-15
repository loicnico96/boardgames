import { updateProfile } from "firebase/auth"

import firebaseAuth from "lib/firebase/auth"

export async function setUserName(userName: string): Promise<void> {
  if (firebaseAuth.currentUser) {
    await updateProfile(firebaseAuth.currentUser, { displayName: userName })
  } else {
    throw Error("Cannot set username while unauthenticated")
  }
}
