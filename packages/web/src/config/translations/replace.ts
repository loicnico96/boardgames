export type ReplaceParam = number | string
export type ReplaceParams = Record<string, ReplaceParam>
export type Replace<T extends ReplaceParams> = (params: T) => string

export function replace<T extends ReplaceParams>(
  entry: string,
  params: T
): string {
  return entry.replace(/{{([^}]*)}}/g, (match, key: keyof T) => {
    if (params[key] === undefined) {
      return match
    }

    return String(params[key])
  })
}
