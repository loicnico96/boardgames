import firebase from "./app"

export type User = firebase.User

export type UserCredential = firebase.auth.UserCredential

export const Auth = firebase.auth()

export const { GoogleAuthProvider } = firebase.auth
