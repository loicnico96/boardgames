import auth from "lib/firebase/auth"

export async function setPersistence(persistence: boolean) {
  await auth.setPersistence(persistence ? "local" : "session")
}
