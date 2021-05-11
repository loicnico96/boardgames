import auth from "lib/firebase/auth"

import { formatUser } from "./formatUser"
import { promptUserName } from "./promptUserName"
import { AuthUser } from "./types"

export async function signInAnonymously(): Promise<AuthUser> {
  const userName = await promptUserName()

  if (!userName) {
    throw Error("Username cannot be empty")
  }

  const { user } = await auth.signInAnonymously()

  if (!user) {
    throw Error("Login failed")
  }

  const authUser = formatUser(user)

  try {
    await user.updateProfile({ displayName: userName })
    authUser.userInfo.userName = userName
  } catch (error) {
    console.error(error)
  }

  return authUser
}
