import firebase from "./app"

export type DocumentData = firebase.firestore.DocumentData

export type CollectionReference<
  T extends DocumentData
> = firebase.firestore.CollectionReference<T>
export type DocumentReference<
  T extends DocumentData
> = firebase.firestore.DocumentReference<T>
export type DocumentSnapshot<
  T extends DocumentData
> = firebase.firestore.DocumentSnapshot<T>
export type Query<T extends DocumentData> = firebase.firestore.Query<T>

export default firebase.firestore()
