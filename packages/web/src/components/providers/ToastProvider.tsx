import { ReactNode } from "react"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

export type ToastProviderProps = {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      <ToastContainer
        closeOnClick
        draggable
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        position="bottom-left"
        theme="colored"
      />
      {children}
    </>
  )
}
