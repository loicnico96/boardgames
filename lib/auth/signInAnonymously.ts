import auth from "lib/firebase/auth"

import { formatUser } from "./formatUser"

export async function signInAnonymously() {
  const { user } = await auth.signInAnonymously()
  if (user) {
    return formatUser(user)
  } else {
    throw Error("Login failed")
  }
}
