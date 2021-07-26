import { GetServerSideProps, GetServerSidePropsResult, Redirect } from "next"
import { ParsedUrlQuery } from "querystring"

export type PageProps = {
  params: ParsedUrlQuery
}

export function SSR(
  handler?: (
    params: ParsedUrlQuery,
    redirect: (redirect: Redirect) => void
  ) => Promise<void>
): GetServerSideProps<PageProps> {
  return async ({ params = {} }) => {
    let props: GetServerSidePropsResult<PageProps> = { props: { params } }

    if (handler) {
      try {
        await handler(params, redirect => {
          props = { redirect }
        })
      } catch (error) {
        console.error(error)
        return { notFound: true }
      }
    }

    return props
  }
}
