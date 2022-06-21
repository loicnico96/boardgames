import { assert } from "@boardgames/utils"
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
  Unsubscribe,
  updateProfile,
  User,
} from "firebase/auth"

import { AuthUser, AuthUserInfo } from "lib/auth/types"

import firebaseApp from "./app"

const firebaseAuth = getAuth(firebaseApp)

function formatUser(user: User, userName?: string): AuthUser {
  return {
    isAnonymous: user.isAnonymous,
    userId: user.uid,
    userInfo: {
      email: user.email,
      imageUrl: user.photoURL,
      userName: userName ?? user.displayName,
    },
  }
}

export const FirebaseAuth = {
  getCurrentUser(): AuthUser | null {
    const { currentUser } = firebaseAuth
    return currentUser && formatUser(currentUser)
  },
  onAuthStateChanged(
    onChange: (user: AuthUser | null) => void,
    onError: (error: Error) => void
  ): Unsubscribe {
    return onAuthStateChanged(
      firebaseAuth,
      user => onChange(user && formatUser(user)),
      onError
    )
  },
  async signInAnonymously(userName: string): Promise<AuthUser> {
    const { user } = await signInAnonymously(firebaseAuth)
    await updateProfile(user, { displayName: userName })
    return formatUser(user, userName)
  },
  async signInWithGoogle(): Promise<AuthUser> {
    const googleAuthProvider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(firebaseAuth, googleAuthProvider)
    return formatUser(user)
  },
  async signOut(): Promise<void> {
    const { currentUser } = firebaseAuth
    assert(currentUser !== null, "Not authenticated")
    await signOut(firebaseAuth)
  },
  async updateProfile(userInfo: Partial<AuthUserInfo>): Promise<AuthUser> {
    const { currentUser } = firebaseAuth
    assert(currentUser !== null, "Not authenticated")

    const updatedUser: User = {
      ...currentUser,
      displayName: userInfo.userName ?? currentUser.displayName,
      photoURL: userInfo.imageUrl ?? currentUser.photoURL,
    }

    await updateProfile(currentUser, updatedUser)
    return formatUser(updatedUser)
  },
}
