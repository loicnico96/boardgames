import { authenticate } from "lib/api/auth"
import { handle } from "lib/api/rest"
import { HttpMethod } from "lib/api/types"

export default handle({
  [HttpMethod.POST]: authenticate(async req => ({ success: req.body })),
})
