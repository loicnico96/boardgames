import auth from "lib/firebase/auth"

export async function setPersistence(persistence: boolean) {
  return auth.setPersistence(persistence ? "local" : "session")
}
