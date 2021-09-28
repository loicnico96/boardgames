import { FirebaseOptions, getApp, initializeApp } from "firebase/app"

import firebaseConfig from "config/firebase"

function getFirebaseApp(appName: string, options: FirebaseOptions) {
  try {
    return getApp(appName)
  } catch (error) {
    return initializeApp(options, appName)
  }
}

export default getFirebaseApp("boardgames", firebaseConfig)
