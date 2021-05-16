import { useRouter } from "next/router"

export function useParams<T extends Record<string, string>>(): T {
  const { query } = useRouter()
  return query as T
}
