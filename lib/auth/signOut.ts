import auth from "lib/firebase/auth"

export async function signOut() {
  return auth.signOut()
}
