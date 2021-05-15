import { getAuth } from "firebase/auth"

import firebaseApp from "./app"

export default getAuth(firebaseApp)
