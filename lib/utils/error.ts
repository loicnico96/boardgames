import { toast } from "react-toastify"

export type ErrorHandler = (error: Error) => void

export function handleGenericError(error: Error): void {
  console.error(error)
  toast.error(error.message)
}
