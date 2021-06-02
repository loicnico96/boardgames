import { AsyncCache, Listener, Loader } from "./cache"
import { getLoadedResource } from "./resources"

function wait(duration = 0): Promise<void> {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise(resolve => setTimeout(resolve, duration))
}

function raise(error: Error): never {
  throw error
}

function mockLoader<T>(value: T, duration = 0): Loader<T> {
  return jest.fn(() => wait(duration).then(() => value))
}

function mockLoaderFailing<T>(error: Error, duration = 0): Loader<T> {
  return jest.fn(() => wait(duration).then(() => raise(error)))
}

function mockListener<T>(): Listener<T> {
  return jest.fn()
}

describe("AsyncCache", () => {
  let cache: AsyncCache

  beforeEach(() => {
    cache = new AsyncCache()
  })

  describe("get", () => {
    it("returns undefined if not cached and no loader was provided", () => {
      expect(cache.get("key")).toBe(undefined)
    })

    it("starts loading if not cached and loader was provided", async () => {
      const loader = mockLoader("value")
      expect(cache.get("key", loader).loading).toBe(true)
      expect(loader).toHaveBeenCalled()
      expect(cache.get("key")?.loading).toBe(true)
      expect(cache.get("key")?.data).toBe(null)
      expect(cache.get("key")?.error).toBe(null)
      await wait()
      expect(cache.get("key")?.loading).toBe(false)
      expect(cache.get("key")?.data).toBe("value")
      expect(cache.get("key")?.error).toBe(null)
      expect(cache.get("other")).toBe(undefined)
    })

    it("returns cached value if present", async () => {
      const loader = mockLoader("value")
      expect(cache.get("key", loader).loading).toBe(true)
      expect(loader).toHaveBeenCalled()
      await wait()
      const otherLoader = mockLoader("other")
      expect(cache.get("key", otherLoader).loading).toBe(false)
      expect(cache.get("key", otherLoader).data).toBe("value")
      expect(cache.get("key", otherLoader).error).toBe(null)
      expect(otherLoader).not.toHaveBeenCalled()
    })

    it("returns error resource if loading failed", async () => {
      const error = Error("Not found")
      const loader = mockLoaderFailing(error)
      expect(cache.get("key", loader).loading).toBe(true)
      await wait()
      expect(cache.get("key", loader).loading).toBe(false)
      expect(cache.get("key", loader).data).toBe(null)
      expect(cache.get("key", loader).error).toBe(error)
    })
  })

  describe("has", () => {
    it("returns whether value present", async () => {
      const loader = mockLoader("value")
      expect(cache.has("key")).toBe(false)
      expect(cache.get("key", loader).loading).toBe(true)
      expect(cache.has("key")).toBe(true)
      await wait()
      expect(cache.has("key")).toBe(true)
      expect(cache.has("other")).toBe(false)
    })
  })

  describe("load", () => {
    it("returns the value once loaded", async () => {
      const loader = mockLoader("value")
      const promise = cache.load("key", loader)
      expect(loader).toHaveBeenCalled()
      expect(cache.has("key")).toBe(true)
      expect(cache.get("key")?.loading).toBe(true)
      expect(cache.get("key")?.data).toBe(null)
      const resource = await promise
      expect(resource.loading).toBe(false)
      expect(resource.data).toBe("value")
      expect(cache.has("key")).toBe(true)
      expect(cache.get("key")).toBe(resource)
    })

    it("returns the ongoing promise if already loading", async () => {
      const loader = mockLoader("value")
      const promise = cache.load("key", loader)
      expect(loader).toHaveBeenCalled()
      const otherLoader = mockLoader("other")
      const otherPromise = cache.load("key", otherLoader)
      expect(otherLoader).not.toHaveBeenCalled()
      const resource = await promise
      expect(resource.loading).toBe(false)
      expect(resource.data).toBe("value")
      const otherResource = await otherPromise
      expect(otherResource.loading).toBe(false)
      expect(otherResource.data).toBe("value")
    })

    it("reloads the value if forced", async () => {
      const loader = mockLoader("value")
      const resource = await cache.load("key", loader)
      expect(loader).toHaveBeenCalled()
      expect(resource.loading).toBe(false)
      expect(resource.data).toBe("value")
      expect(cache.get("key")).toBe(resource)
      const otherLoader = mockLoader("other")
      const otherResource = await cache.load("key", otherLoader, true)
      expect(otherLoader).toHaveBeenCalled()
      expect(otherResource.loading).toBe(false)
      expect(otherResource.data).toBe("other")
      expect(cache.get("key")).toBe(otherResource)
    })
  })

  describe("reload", () => {
    it("reloads the value", async () => {
      const loader = mockLoader(Math.random())
      const resource = await cache.load("key", loader)
      expect(loader).toHaveBeenCalledTimes(1)
      await cache.reload("key")
      expect(loader).toHaveBeenCalledTimes(2)
      expect(cache.get("key")).not.toBe(resource)
    })

    it("does nothing if no loader was provided", async () => {
      expect(cache.get("key")).toBe(undefined)
      await cache.reload("key")
      expect(cache.get("key")).toBe(undefined)
    })
  })

  describe("set", () => {
    it("immediately sets the resource", () => {
      const resource = getLoadedResource("value")
      expect(cache.get("key")).toBe(undefined)
      cache.set("key", resource)
      expect(cache.get("key")).toBe(resource)
    })
  })

  describe("subscribe", () => {
    it("receives notifications when loading", async () => {
      const listener = mockListener()
      const loader = mockLoader("value")
      cache.subscribe("key", listener)
      const resourceA = cache.get("key", loader)
      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith(resourceA)
      await wait()
      const resourceB = cache.get("key")
      expect(listener).toHaveBeenCalledTimes(2)
      expect(listener).toHaveBeenCalledWith(resourceB)
    })

    it("receives notifications when failing", async () => {
      const listener = mockListener()
      const loader = mockLoaderFailing(Error("Not found"))
      cache.subscribe("key", listener)
      const resourceA = cache.get("key", loader)
      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith(resourceA)
      await wait()
      const resourceB = cache.get("key")
      expect(listener).toHaveBeenCalledTimes(2)
      expect(listener).toHaveBeenCalledWith(resourceB)
    })

    it("receives notifications when calling set", () => {
      const listener = mockListener()
      const resource = getLoadedResource("value")
      cache.subscribe("key", listener)
      cache.set("key", resource)
      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith(resource)
    })

    it("only subscribes once with the same function", () => {
      const listener = mockListener()
      const resource = getLoadedResource("value")
      cache.subscribe("key", listener)
      cache.subscribe("key", listener)
      cache.set("key", resource)
      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith(resource)
    })

    it("subscribes with multiple functions", () => {
      const listenerA = mockListener()
      const listenerB = mockListener()
      const resource = getLoadedResource("value")
      cache.subscribe("key", listenerA)
      cache.subscribe("key", listenerB)
      cache.set("key", resource)
      expect(listenerA).toHaveBeenCalledTimes(1)
      expect(listenerA).toHaveBeenCalledWith(resource)
      expect(listenerB).toHaveBeenCalledTimes(1)
      expect(listenerB).toHaveBeenCalledWith(resource)
    })

    it("does not receive notifications when other values are changed", () => {
      const listener = mockListener()
      cache.subscribe("key", listener)
      cache.set("other", getLoadedResource("value"))
      expect(listener).not.toHaveBeenCalled()
    })

    it("returns an unsubscribe function", () => {
      const listener = mockListener()
      const unsubscribe = cache.subscribe("key", listener)
      const resourceA = getLoadedResource("value")
      cache.set("key", resourceA)
      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith(resourceA)
      unsubscribe()
      const resourceB = getLoadedResource("other")
      cache.set("key", resourceB)
      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener).not.toHaveBeenCalledWith(resourceB)
    })
  })

  describe("unsubscribe", () => {
    it("does not receive further notifications", async () => {
      const listenerA = mockListener()
      const listenerB = mockListener()
      cache.subscribe("key", listenerA)
      cache.subscribe("key", listenerB)
      const loader = mockLoader("value")
      const resourceA = cache.get("key", loader)
      expect(listenerA).toHaveBeenCalledTimes(1)
      expect(listenerB).toHaveBeenCalledTimes(1)
      expect(listenerA).toHaveBeenCalledWith(resourceA)
      expect(listenerB).toHaveBeenCalledWith(resourceA)
      cache.unsubscribe("key", listenerB)
      await wait()
      const resourceB = cache.get("key")
      expect(listenerA).toHaveBeenCalledTimes(2)
      expect(listenerB).toHaveBeenCalledTimes(1)
      expect(listenerA).toHaveBeenCalledWith(resourceB)
      expect(listenerB).not.toHaveBeenCalledWith(resourceB)
    })
  })
})
