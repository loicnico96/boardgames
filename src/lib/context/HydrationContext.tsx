import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"

const HydrationContext = React.createContext(false)

export type HydrationContextProviderProps = {
  children: React.ReactNode
}

/**
 * Provider for useHydrationContext - should wrap the whole application.
 */
export function HydrationContextProvider({
  children,
}: HydrationContextProviderProps) {
  const { isReady } = useRouter()

  const [isHydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [setHydrated])

  return (
    <HydrationContext.Provider value={isHydrated && isReady}>
      {children}
    </HydrationContext.Provider>
  )
}

/**
 * Retrieves the hydration status and re-renders the currrent component after
 * hydration completes on client.
 *
 * @remarks
 *
 * Client-side hydration notably means that:
 *  1) Client-side rendering may run independently from server.
 *  2) URL query is available in SSG pages.
 *
 * @returns Whether the client is hydrated. Always false on server.
 */
export function useHydrationContext(): boolean {
  return useContext(HydrationContext)
}
