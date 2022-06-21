export type ReplaceParam = number | string
export type ReplaceParams = Record<string, ReplaceParam>

export function replace<T extends ReplaceParams>(
  entry: string,
  params: T
): string {
  return entry.replace(/{{([^}]*)}}/g, (match, key: keyof T) => {
    if (params[key] === undefined) {
      return match
    } else {
      return String(params[key])
    }
  })
}
