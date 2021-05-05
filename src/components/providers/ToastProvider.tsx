import React from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export type ToastProviderProps = {
  children: React.ReactNode
}

const ToastProvider = ({ children }: ToastProviderProps) => (
  <>
    <ToastContainer
      closeOnClick
      draggable
      newestOnTop
      pauseOnFocusLoss
      pauseOnHover
      position="bottom-left"
    />
    {children}
  </>
)

export default ToastProvider
