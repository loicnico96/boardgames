import { getTime, getTimeDiff, wait } from "./performance"

describe("wait", () => {
  it("waits for the given number of milliseconds", async () => {
    const duration = 3000
    const time = getTime()
    await wait(duration)
    const diff = getTimeDiff(time)
    expect(diff).toBeGreaterThan(duration * 0.9)
    expect(diff).toBeLessThan(duration * 1.1)
  })
})
