import { useAuthContext } from "lib/auth/context"

export function useCurrentUserId(): string | null {
  const { user } = useAuthContext()
  return user?.userId ?? null
}
