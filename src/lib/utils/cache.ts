import {
  getErrorResource,
  getLoadedResource,
  getLoadingResource,
  Resource,
} from "./resources"

export type Listener<T> = (resource: Resource<T>) => void
export type Loader<T> = () => Promise<T>

export class AsyncCache {
  private readonly listeners: Partial<Record<string, Set<Listener<any>>>> = {}
  private loaders: Partial<Record<string, Loader<any>>> = {}
  private promises: Partial<Record<string, Promise<Resource<any>>>> = {}
  private resources: Partial<Record<string, Resource<any>>> = {}

  get<T>(key: string): Resource<T> | undefined
  get<T>(key: string, loader: Loader<T>): Resource<T>
  get<T>(key: string, loader?: Loader<T>) {
    const resource = this.resources[key]

    if (loader && !resource) {
      this.load(key, loader)
    }

    return this.resources[key]
  }

  has(key: string): boolean {
    return !!this.resources[key]
  }

  async load<T>(
    key: string,
    loader: Loader<T>,
    force: boolean = false
  ): Promise<Resource<T>> {
    let promise = this.promises[key]

    if (promise) {
      return promise
    }

    let resource = this.resources[key]

    if (!resource) {
      this.set(key, getLoadingResource())
    }

    if (!resource || force) {
      this.loaders[key] = loader

      promise = loader().then(getLoadedResource, getErrorResource)

      this.promises[key] = promise

      resource = await promise

      this.promises[key] = undefined

      this.set(key, resource)
    }

    return resource
  }

  async reload(key: string): Promise<void> {
    const loader = this.loaders[key]

    if (loader) {
      await this.load(key, loader, true)
    }
  }

  set<T>(key: string, resource: Resource<T>): void {
    this.resources[key] = resource
    this.listeners[key]?.forEach(listener => listener(resource))
  }

  subscribe<T>(key: string, listener: Listener<T>): () => void {
    this.listeners[key] ??= new Set<Listener<T>>()
    this.listeners[key]?.add(listener)
    return () => this.unsubscribe(key, listener)
  }

  unsubscribe<T>(key: string, listener: Listener<T>): void {
    this.listeners[key]?.delete(listener)
  }
}

export default new AsyncCache()
