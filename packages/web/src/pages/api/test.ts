import { handle } from "lib/api/server"
import { getUserId, getUserInfo } from "lib/api/server/auth"
import { HttpMethod } from "lib/api/types"

export default handle({
  [HttpMethod.POST]: async request => {
    const userId = await getUserId(request)
    const userInfo = await getUserInfo(userId)
    return userInfo
  },
})
