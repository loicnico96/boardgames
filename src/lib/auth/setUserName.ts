import auth from "lib/firebase/auth"

export async function setUserName(userName: string): Promise<void> {
  if (auth.currentUser) {
    await auth.currentUser.updateProfile({ displayName: userName })
  } else {
    throw Error("Cannot set username while unauthenticated")
  }
}
