import { getFirestore } from "firebase/firestore"

import firebaseApp from "./app"

export default getFirestore(firebaseApp)
