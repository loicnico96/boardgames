import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged as _onAuthStateChanged,
  signInAnonymously as _signInAnonymously,
  signInWithPopup as _signInWithPopup,
  signOut as _signOut,
  Unsubscribe,
  updateProfile as _updateProfile,
  User,
} from "firebase/auth"

import { AuthUser } from "lib/auth/types"

import firebaseApp from "./app"

const firebaseAuth = getAuth(firebaseApp)

export function formatUser(user: User, userName?: string): AuthUser {
  const { displayName, email, isAnonymous, photoURL, uid } = user

  return {
    isAnonymous,
    userId: uid,
    userInfo: {
      email,
      imageUrl: photoURL,
      userName: userName ?? displayName,
    },
  }
}

export function onAuthStateChange(
  onChange: (user: AuthUser | null) => void,
  onError: (error: Error) => void
): Unsubscribe {
  return _onAuthStateChanged(
    firebaseAuth,
    firebaseUser => onChange(firebaseUser && formatUser(firebaseUser)),
    onError
  )
}

export async function signInAnonymously(userName: string): Promise<AuthUser> {
  const { user } = await _signInAnonymously(firebaseAuth)
  await _updateProfile(user, { displayName: userName })
  return formatUser(user, userName)
}

export async function signInWithGoogle(): Promise<AuthUser> {
  const googleAuthProvider = new GoogleAuthProvider()
  const { user } = await _signInWithPopup(firebaseAuth, googleAuthProvider)
  return formatUser(user)
}

export async function signOut(): Promise<void> {
  return _signOut(firebaseAuth)
}

export async function changeUserName(userName: string): Promise<void> {
  const { currentUser } = firebaseAuth
  if (currentUser !== null) {
    await _updateProfile(currentUser, { displayName: userName })
  }
}
