import { State } from "./types"

export function getInitialState(): State {
  return {
    auth: {
      user: null,
    },
  }
}
