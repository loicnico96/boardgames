import { renderWithTheme, screen, userEvent } from "test-utils"

import { Button } from "./Button"

describe("Button", () => {
  it("renders a button", async () => {
    const onClick = jest.fn()
    renderWithTheme(<Button onClick={onClick}>Label</Button>)
    const button = await screen.findByRole("button", { name: "Label" })
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })
})
