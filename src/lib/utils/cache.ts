/* eslint-disable @typescript-eslint/no-explicit-any */

import { Debug } from "./debug"
import {
  getErrorResource,
  getLoadedResource,
  LOADING,
  Resource,
} from "./resources"

export type Listener<T> = (resource: Resource<T>) => void
export type Loader<T> = () => Promise<T>

export class AsyncCache {
  private listeners: Partial<Record<string, Set<Listener<any>>>> = {}
  private loaders: Partial<Record<string, Loader<any>>> = {}
  private promises: Partial<Record<string, Promise<Resource<any>>>> = {}
  private resources: Partial<Record<string, Resource<any>>> = {}

  public get<T>(key: string): Resource<T> | undefined
  public get<T>(key: string, loader: Loader<T>): Resource<T>
  public get<T>(key: string, loader?: Loader<T>) {
    const resource = this.resources[key]

    if (loader && !resource) {
      this.load(key, loader).catch(Debug.error)
    }

    return this.resources[key]
  }

  public has(key: string): boolean {
    return !!this.resources[key]
  }

  public async load<T>(
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
      this.set(key, LOADING)
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

  public async reload(key: string): Promise<void> {
    const loader = this.loaders[key]

    if (loader) {
      await this.load(key, loader, true)
    }
  }

  public set<T>(key: string, resource: Resource<T>): void {
    this.resources[key] = resource
    this.listeners[key]?.forEach(listener => listener(resource))
  }

  public subscribe<T>(key: string, listener: Listener<T>): () => void {
    this.listeners[key] ??= new Set<Listener<T>>()
    this.listeners[key]?.add(listener)
    return () => this.unsubscribe(key, listener)
  }

  public unsubscribe<T>(key: string, listener: Listener<T>): void {
    this.listeners[key]?.delete(listener)
  }
}

export default new AsyncCache()
