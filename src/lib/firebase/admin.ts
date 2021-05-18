import * as admin from "firebase-admin"

import credentials from "config/credentials/firebase-admin"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: credentials.databaseUrl,
  })
}

export const auth = admin.auth()

export const firestore = admin.firestore()
