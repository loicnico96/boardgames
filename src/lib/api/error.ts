import { HttpStatus } from "./types"

export class ApiError extends Error {
  public readonly statusCode: HttpStatus
  public readonly statusName: string

  constructor(statusCode: HttpStatus, message: string) {
    super(message)
    this.name = `ApiError (${statusCode})`
    this.statusCode = statusCode
    this.statusName = HttpStatus[statusCode]
  }
}
