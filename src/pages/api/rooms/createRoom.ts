import { authenticate } from "lib/api/auth"
import { handle } from "lib/api/rest"
import { ApiTrigger, HttpMethod } from "lib/api/types"
import { validate } from "lib/api/validation"
import { validateObject, validateString } from "lib/utils/validation"

async function createRoom(game: string, userId: string) {
  return { game, success: true, userId }
}

export default handle({
  [HttpMethod.POST]: authenticate(
    validate<ApiTrigger.ROOM_CREATE>(
      validateObject({ game: validateString() }),
      ({ game }, userId) => createRoom(game, userId)
    )
  ),
})
