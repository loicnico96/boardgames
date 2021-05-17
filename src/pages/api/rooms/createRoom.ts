import { handle } from "lib/api/rest"
import { HttpMethod } from "lib/api/types"

export default handle({
  [HttpMethod.POST]: async req => ({ success: req.body }),
})
