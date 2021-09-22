import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"

export type PageProps = {
  params: ParsedUrlQuery
}

export function SSR(): GetServerSideProps<PageProps> {
  return async function getServerSideProps({ params = {} }) {
    return {
      props: {
        params,
      },
    }
  }
}
