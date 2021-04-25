import auth from "lib/firebase/auth"

export async function signOut() {
  await auth.signOut()
}
