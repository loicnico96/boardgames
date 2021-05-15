import { getApp, initializeApp } from "firebase/app"

import firebaseConfig from "config/firebase"

function getOrInitializeApp() {
  try {
    return getApp()
  } catch (error) {
    return initializeApp(firebaseConfig)
  }
}

export default getOrInitializeApp()
