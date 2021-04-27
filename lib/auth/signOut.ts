import auth from "lib/firebase/auth"

export async function signOut(): Promise<void> {
  return auth.signOut()
}
