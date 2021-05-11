import auth from "lib/firebase/auth"

export async function setPersistence(persistence: boolean): Promise<void> {
  await auth.setPersistence(persistence ? "local" : "session")
}
