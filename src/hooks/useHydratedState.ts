import { useRouter } from "next/router"
import { useEffect, useState } from "react"

/**
 * Retrieves the hydration status and re-renders the component after hydrating.
 *
 * @remarks
 *
 * Client-side hydration notably means that:
 *  - Client-side rendering may run independently from server.
 *  - URL query is available in SSG pages.
 *
 * @returns Whether the client has been hydrated. Always false on server.
 */
export function useHydratedState(): boolean {
  const { isReady } = useRouter()
  const [isHydrated, setHydrated] = useState(!isReady)
  useEffect(() => {
    setHydrated(true)
  }, [])
  return isHydrated && isReady
}
