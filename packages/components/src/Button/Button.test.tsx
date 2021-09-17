import { render, screen, userEvent, wait, waitFor } from "../test-utils"

import { Button } from "./Button"

describe("Button", () => {
  it("is disabled while asynchronous onClick is resolving", async () => {
    const onClick = jest.fn().mockImplementation(() => wait(300))

    render(
      <Button onClick={onClick} primary="black" secondary="white">
        Click
      </Button>
    )

    const button = screen.getByRole("button", { name: "Click" })

    expect(button).toBeInTheDocument()

    expect(button.getAttribute("disabled")).toBeNull()

    userEvent.click(button)

    await waitFor(() => {
      expect(button.getAttribute("disabled")).toBe("")
    })

    userEvent.click(button)

    await waitFor(() => {
      expect(button.getAttribute("disabled")).toBeNull()
    })

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("is disabled", async () => {
    const onClick = jest.fn()

    render(
      <Button disabled onClick={onClick} primary="black" secondary="white">
        Click
      </Button>
    )

    const button = screen.getByRole("button", { name: "Click" })

    expect(button).toBeInTheDocument()

    expect(button.getAttribute("disabled")).toBe("")

    userEvent.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })
})
