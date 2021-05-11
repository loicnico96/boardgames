export type AuthUserInfo = {
  email: string | null
  imageUrl: string | null
  userName: string
}

export type AuthUser = {
  isAnonymous: boolean
  userId: string
  userInfo: AuthUserInfo
}

export type AuthState = {
  user: AuthUser | null
}