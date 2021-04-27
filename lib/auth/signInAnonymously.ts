import { Auth } from "lib/firebase/auth"

import { formatUser } from "./formatUser"
import { AuthUser } from "./types"

export async function signInAnonymously(): Promise<AuthUser> {
  const { user } = await Auth.signInAnonymously()
  if (user) {
    return formatUser(user)
  } else {
    throw Error("Login failed")
  }
}
