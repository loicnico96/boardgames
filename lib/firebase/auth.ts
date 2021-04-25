import firebase from "./app"

const auth = firebase.auth()

export type Auth = firebase.auth.Auth

export type User = firebase.User

export type UserCredential = firebase.auth.UserCredential

export const { GoogleAuthProvider } = firebase.auth

export default auth
