import { Auth } from "lib/firebase/auth"

export async function signOut(): Promise<void> {
  await Auth.signOut()
}
