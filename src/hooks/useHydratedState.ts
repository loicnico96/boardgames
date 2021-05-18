import { useRouter } from "next/router"

export function useHydratedState(): boolean {
  const { isReady } = useRouter()
  return isReady
}
