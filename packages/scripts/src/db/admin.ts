import * as dotenv from "dotenv"
import * as admin from "firebase-admin"

dotenv.config()

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  })
}

export const auth = admin.auth()

export const firestore = admin.firestore()
