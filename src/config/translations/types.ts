export type TranslationConfig = {
  home: {
    pageTitle: string
  }
  login: {
    pageTitle: string
    rememberMe: string
    setUserName: string
    signIn: string
    signInAnonymously: string
    signInWithGoogle: string
    signOut: string
  }
  roomList: {
    noRooms: string
    pageLoading: string
    pageTitle: string
  }
  roomPage: {
    pageLoading: string
    pageTitle: string
  }
}

export type ReplaceParams = Record<string, unknown>

export type Replace<T extends string> = (params: Record<T, unknown>) => string

export function replace<T extends string>(entry: string): Replace<T> {
  return (params: Record<T, unknown>) =>
    entry.replace(/{{([a-zA-Z0-9_]+)}}/g, (match, key: T) => {
      if (params[key]) {
        return String(params[key])
      }

      if (process.env.NODE_ENV !== "production") {
        console.error(`Could not replace parameters ${key}`, params)
      }

      return match
    })
}
