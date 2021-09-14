import { render } from "@testing-library/react"

import "@testing-library/jest-dom"
import HomePage from "pages"

describe("HomePage", () => {
  it("renders home page", () => {
    expect(render(<HomePage />)).not.toBeNull()
  })
})
