import * as FirebaseAuth from "firebase/auth"

import { AuthUser } from "lib/auth/types"

import firebaseApp from "./app"

const { GoogleAuthProvider } = FirebaseAuth

const isBrowser = typeof window !== "undefined"

const PERSISTENCE_LOCAL = FirebaseAuth.browserLocalPersistence
const PERSISTENCE_SESSION = FirebaseAuth.browserSessionPersistence

function getAuth(): FirebaseAuth.Auth {
  if (isBrowser) {
    return FirebaseAuth.initializeAuth(firebaseApp, {
      popupRedirectResolver: FirebaseAuth.browserPopupRedirectResolver,
      persistence: [PERSISTENCE_LOCAL, PERSISTENCE_SESSION],
    })
  }

  return FirebaseAuth.getAuth(firebaseApp)
}

const firebaseAuth = getAuth()

export function formatUser(firebaseUser: FirebaseAuth.User): AuthUser {
  const { displayName, email, isAnonymous, photoURL, uid } = firebaseUser

  return {
    isAnonymous,
    userId: uid,
    userInfo: {
      email,
      imageUrl: photoURL,
      userName: displayName,
    },
  }
}

export function getCurrentUser(): FirebaseAuth.User | null {
  return firebaseAuth.currentUser
}

export function onAuthStateChanged(
  onChange: (user: AuthUser | null) => void,
  onError: (error: Error) => void
): FirebaseAuth.Unsubscribe {
  return FirebaseAuth.onAuthStateChanged(
    firebaseAuth,
    firebaseUser => {
      if (firebaseUser) {
        onChange(formatUser(firebaseUser))
      } else {
        onChange(null)
      }
    },
    onError
  )
}

export async function setPersistence(persist: boolean): Promise<void> {
  await FirebaseAuth.setPersistence(
    firebaseAuth,
    persist ? PERSISTENCE_LOCAL : PERSISTENCE_SESSION
  )
}

export async function setUserName(userName: string): Promise<AuthUser> {
  const user = getCurrentUser()
  if (!user) {
    throw Error("Cannot set username while unauthenticated")
  }

  await FirebaseAuth.updateProfile(user, { displayName: userName })

  return formatUser(user)
}

export async function signInAnonymously(persist: boolean): Promise<AuthUser> {
  await setPersistence(persist)
  const { user } = await FirebaseAuth.signInAnonymously(firebaseAuth)
  return formatUser(user)
}

export async function signInWithGoogle(persist: boolean): Promise<AuthUser> {
  const provider = new GoogleAuthProvider()
  await setPersistence(persist)
  const { user } = await FirebaseAuth.signInWithPopup(firebaseAuth, provider)
  return formatUser(user)
}

export async function signOut(): Promise<void> {
  await FirebaseAuth.signOut(firebaseAuth)
}
