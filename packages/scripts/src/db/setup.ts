import { GameType } from "@boardgames/web/src/lib/games/types"

import { Test } from "../games/roborally/boards/Test"

import { firestore } from "./admin"

async function setup() {
  console.log("Setting up DB...")

  console.log("> Setting up Roborally boards...")
  const testRef = `games/${GameType.ROBORALLY}/boards/test`
  await firestore.doc(testRef).set(Test)
  console.log("> Ok")

  console.log("Done")
}

setup().catch(error => {
  console.error(error)
  throw error
})
