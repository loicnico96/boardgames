import { Auth } from "lib/firebase/auth"

export async function setUserName(userName: string): Promise<void> {
  if (Auth.currentUser) {
    await Auth.currentUser.updateProfile({ displayName: userName })
  } else {
    throw Error("Cannot set username while unauthenticated")
  }
}
