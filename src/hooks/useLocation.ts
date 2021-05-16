import { useRouter } from "next/router"

export function useLocation(): string {
  const { asPath, isReady, pathname } = useRouter()
  return isReady ? asPath : pathname
}
