import { ReplaceParams } from "./types"

export function replace(entry: string, params: ReplaceParams): string {
  return entry.replace(/{{([^}]*)}}/g, (match, key) => {
    if (params[key] === undefined) {
      return match
    } else {
      return String(params[key])
    }
  })
}
