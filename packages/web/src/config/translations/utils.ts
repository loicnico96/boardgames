export type ReplaceParam = number | string
export type ReplaceParams = Record<string, ReplaceParam>
export type Replace<T extends ReplaceParams> = (params: T) => string

export function replace<T extends ReplaceParams>(entry: string): Replace<T> {
  return (params: T) =>
    entry.replace(/{{(.*)}}/g, (match, key: keyof T) => {
      if (params[key]) {
        return String(params[key])
      }

      if (process.env.NODE_ENV === "development") {
        console.error(`Could not replace parameter '${key}'`, params)
      }

      return match
    })
}
