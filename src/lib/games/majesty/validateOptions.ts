import { object } from "lib/utils/validation"

import { MajestyOptions } from "./model/MajestyOptions"

export function validateOptions(options: unknown): MajestyOptions {
  const typedOptions = object({})(options)
  return typedOptions
}
