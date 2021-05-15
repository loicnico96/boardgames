import { User } from "firebase/auth"

import { AuthUser } from "./types"

export function formatUser(firebaseUser: User): AuthUser {
  return {
    isAnonymous: firebaseUser.isAnonymous,
    userId: firebaseUser.uid,
    userInfo: {
      email: firebaseUser.email,
      imageUrl: firebaseUser.photoURL,
      userName: firebaseUser.displayName ?? "...",
    },
  }
}
