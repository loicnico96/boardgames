import { ObjectUnion } from "@boardgames/utils"

export type MetropolysAction = ObjectUnion<
  "code",
  {
    bid: {
      district: number
      height: number
    }
    pass: {
      // Nothing
    }
  }
>
