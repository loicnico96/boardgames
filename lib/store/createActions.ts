import { GetState, SetState } from "zustand"

import { Actions, Store } from "./types"

export function createActions(
  set: SetState<Store>,
  get: GetState<Store>
): Actions {
  return {
    // @TODO
  }
}
