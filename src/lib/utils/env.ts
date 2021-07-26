export const isBrowser = typeof window !== "undefined"
export const isServer = typeof window === "undefined"

export const isDev = process.env.NODE_ENV !== "production"
export const isProd = process.env.NODE_ENV === "production"
