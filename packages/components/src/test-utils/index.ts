import "@testing-library/jest-dom"

export { render, screen, waitFor } from "@testing-library/react"
export { renderHook } from "@testing-library/react-hooks"
export { default as userEvent } from "@testing-library/user-event"

export { renderWithTheme } from "./renderWithTheme"

export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
