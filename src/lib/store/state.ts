import { AuthState } from "lib/auth/types"

export type State = {
  auth: AuthState
}

export function getInitialState(): State {
  return {
    auth: {
      loading: true,
      user: null,
    },
  }
}
