export type AuthUserInfo = {
  email: string | null
  imageUrl: string | null
  userName: string | null
}

export type AuthUser = {
  isAnonymous: boolean
  userId: string
  userInfo: AuthUserInfo
}

export type AuthState = {
  loading: boolean
  user: AuthUser | null
}
