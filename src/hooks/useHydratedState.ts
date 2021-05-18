import { useRouter } from "next/router"

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
  return isReady
}
