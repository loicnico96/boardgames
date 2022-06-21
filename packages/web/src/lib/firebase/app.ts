import { FirebaseOptions, getApp, initializeApp } from "firebase/app"
export type { FirebaseApp } from "firebase/app"

import firebaseConfig from "config/firebase.json"

function getFirebaseApp(appName: string, options: FirebaseOptions) {
  try {
    return getApp(appName)
  } catch (error) {
    return initializeApp(options, appName)
  }
}

export default getFirebaseApp(firebaseConfig.projectId, firebaseConfig)
