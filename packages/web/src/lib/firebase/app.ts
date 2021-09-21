import { FirebaseOptions, getApp, initializeApp } from "firebase/app"

function getFirebaseApp(appName: string, options: FirebaseOptions) {
  try {
    return getApp(appName)
  } catch (error) {
    return initializeApp(options, appName)
  }
}

export default getFirebaseApp("boardgames", {
  apiKey: "AIzaSyDpoSD_ZDHy_rc13zyq5RRrq9JidSMeI5c",
  authDomain: "boardgames-59b5a.firebaseapp.com",
  projectId: "boardgames-59b5a",
  storageBucket: "boardgames-59b5a.appspot.com",
  messagingSenderId: "805536031080",
  appId: "1:805536031080:web:3a7c4c7e513038f5a876dd",
  measurementId: "G-R6SKQDH95Y",
})
