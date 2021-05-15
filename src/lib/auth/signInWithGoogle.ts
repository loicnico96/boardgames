import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

import firebaseAuth from "lib/firebase/auth"

import { formatUser } from "./formatUser"
import { AuthUser } from "./types"

export async function signInWithGoogle(): Promise<AuthUser> {
  const googleAuthProvider = new GoogleAuthProvider()
  const { user } = await signInWithPopup(firebaseAuth, googleAuthProvider)
  if (user) {
    return formatUser(user)
  } else {
    throw Error("Login failed")
  }
}
