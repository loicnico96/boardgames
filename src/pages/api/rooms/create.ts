import { authenticate } from "lib/api/auth"
import { handle } from "lib/api/rest"
import { ApiTrigger, handleTrigger } from "lib/api/triggers"
import { createRoom } from "lib/api/triggers/createRoom"
import { HttpMethod } from "lib/api/types"
import { validateObject, validateString } from "lib/utils/validation"

export default handle({
  [HttpMethod.POST]: async (request, logger) => {
    const userId = await authenticate(request, logger)
    return handleTrigger<ApiTrigger.CREATE_ROOM>(
      validateObject({ game: validateString() }),
      ({ game }) => createRoom(game, userId)
    )(request)
  },
})
