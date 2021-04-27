import { Auth } from "lib/firebase/auth"

export async function setPersistence(persistence: boolean): Promise<void> {
  await Auth.setPersistence(persistence ? "local" : "session")
}
