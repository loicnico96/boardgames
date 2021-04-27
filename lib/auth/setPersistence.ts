import auth from "lib/firebase/auth"

export async function setPersistence(persistence: boolean): Promise<void> {
  return auth.setPersistence(persistence ? "local" : "session")
}
