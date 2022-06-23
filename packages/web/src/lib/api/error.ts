import { HttpStatus } from "./types"

export class ApiError extends Error {
  public readonly statusCode: HttpStatus
  public readonly statusName: string

  public constructor(statusCode: HttpStatus, message: string) {
    super(message)
    this.name = `ApiError (${statusCode})`
    this.statusCode = statusCode
    this.statusName = HttpStatus[statusCode]
  }
}

export class NotFoundError extends ApiError {
  public constructor() {
    super(HttpStatus.NOT_FOUND, "Not found")
  }
}
