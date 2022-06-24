/* eslint-disable import/namespace */
/* https://github.com/import-js/eslint-plugin-import/issues/1810 */
import * as admin from "firebase-admin"

import firebaseConfig from "config/firebase.json"

import { DocumentData } from "./firestore"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: firebaseConfig.projectId,
    }),
    databaseURL: firebaseConfig.databaseURL,
  })
}

export const auth = admin.auth()

export const firestore = admin.firestore()

export const { FieldValue } = admin.firestore

export type ColRef<T extends DocumentData> =
  admin.firestore.CollectionReference<T>

export type DocRef<T extends DocumentData> =
  admin.firestore.DocumentReference<T>
