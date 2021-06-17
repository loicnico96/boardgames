import { array, int, object, string } from "lib/utils/validation"

import { RoborallyOptions } from "./model/RoborallyOptions"

export function validateOptions(options: unknown): RoborallyOptions {
  const typedOptions = object({
    checkpoints: int({ min: 1 }),
    boardIds: array(string(), {
      minLength: 1,
      maxLength: 4,
    }),
  })(options)

  return typedOptions
}
