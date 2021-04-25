import { User } from "lib/firebase/auth"

import { AuthUser } from "./types"

export async function formatUser(user: User): Promise<AuthUser> {
  return {
    isAnonymous: user.isAnonymous,
    token: await user.getIdToken(),
    userId: user.uid,
    userInfo: {
      email: user.email,
      imageUrl: user.photoURL,
      userName: user.displayName ?? "[Guest]",
    },
  }
}
