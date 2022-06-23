import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"

import { Console } from "./logger"

export function SSR(): GetServerSideProps
export function SSR<T extends Record<string, unknown>>(
  handler: (params: ParsedUrlQuery) => T
): GetServerSideProps<T>
export function SSR<T extends Record<string, unknown>>(
  handler?: (params: ParsedUrlQuery) => T
): GetServerSideProps<T> {
  return async ({ params = {} }) => {
    try {
      return { props: handler ? handler(params) : ({} as T) }
    } catch (error) {
      Console.error(error)
      return { notFound: true }
    }
  }
}
