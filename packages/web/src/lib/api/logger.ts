import { Logger, LogLevel } from "lib/utils/logger"

import { HttpMethod } from "./types"

export class ApiLogger extends Logger {
  public constructor(method: HttpMethod, api: string, level?: LogLevel) {
    super(`${method} ${api}`, level)
  }
}
