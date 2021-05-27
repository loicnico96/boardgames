export const isDev = process.env.NODE_ENV === "development"

export const Debug = {
  log(message: string, ...params: unknown[]): void {
    if (isDev) {
      console.log(message, ...params)
    }
  },

  warn(message: string, ...params: unknown[]): void {
    if (isDev) {
      console.warn(message, ...params)
    }
  },

  error(error: Error): void {
    if (isDev) {
      console.error(error)
    }
  },
}
