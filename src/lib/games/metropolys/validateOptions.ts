import { object } from "lib/utils/validation"

import { MetropolysOptions } from "./model/MetropolysOptions"

export function validateOptions(options: unknown): MetropolysOptions {
  const typedOptions = object({})(options)
  return typedOptions
}
