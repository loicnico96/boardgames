import auth from "lib/firebase/auth"

export async function setUserName(userName: string) {
  if (auth.currentUser) {
    return auth.currentUser.updateProfile({ displayName: userName })
  } else {
    throw Error("Cannot set username while unauthenticated")
  }
}
