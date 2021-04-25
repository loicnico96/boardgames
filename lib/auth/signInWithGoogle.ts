import auth, { GoogleAuthProvider } from "lib/firebase/auth"

import { formatUser } from "./formatUser"

export async function signInWithGoogle() {
  const googleAuthProvider = new GoogleAuthProvider()
  const { user } = await auth.signInWithPopup(googleAuthProvider)
  if (user) {
    return formatUser(user)
  } else {
    throw Error("Login failed")
  }
}
