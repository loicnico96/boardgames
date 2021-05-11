import auth from "lib/firebase/auth"

export async function signOut(): Promise<void> {
  await auth.signOut()
}
