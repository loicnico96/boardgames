import { useRouter } from "next/router"

/**
 * Retrieves the current URL location.
 *
 * @remarks
 *
 * In SSG pages, query parameters are not known until hydration.
 *
 * @returns The URL location, with query parameters if available.
 */
export function useLocation(): string {
  const { asPath, isReady, pathname } = useRouter()
  return isReady ? asPath : pathname
}
