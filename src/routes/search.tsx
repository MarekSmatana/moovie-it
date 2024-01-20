import { SearchIcon } from "@chakra-ui/icons"
import {
  Center,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react"
import { QueryClient, useQuery } from "react-query"
import {
  Form,
  LoaderFunctionArgs,
  useLoaderData,
  useSubmit,
} from "react-router-dom"
import { MovieSearchResponse } from "../types"
import MoviesList from "../components/MoviesList"
import Pagination from "../components/Pagination"

const MOVIES_PER_PAGE = 10

const moviesSearchQuery = (page: number, query?: string) => ({
  queryKey: query + page.toString(),
  queryFn: async () => {
    if (!query || !query.trim()) return undefined
    const searchResult = await fetch(
      `https://omdbapi.com/?apikey=dba850f1&type=movie&page=${page}&s=${query}`
    )

    if (!searchResult) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      })
    }

    return (await searchResult.json()) as MovieSearchResponse
  },
})

type SearchLoaderData = {
  q?: string
  p: number
}
export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const q = url.searchParams.get("q")?.trim()
    const p = Number(url.searchParams.get("p") ?? 1)

    if (
      q &&
      !queryClient.getQueriesData(moviesSearchQuery(p, q).queryKey ?? "")
    ) {
      await queryClient.fetchQuery(moviesSearchQuery(p, q))
    }

    return { q, p }
  }

export default function SearchRoute() {
  const { q, p } = useLoaderData() as SearchLoaderData
  const { data, isError, isLoading } = useQuery(moviesSearchQuery(p, q))
  const submit = useSubmit()

  const error =
    data?.Response === "False" ? data.Error : "Unexpected error happened."
  const showData = !!data && data.Response === "True" && data.Search.length > 0
  const showError = isError || data?.Response === "False"

  return (
    <Container centerContent maxW="container.lg">
      <Form>
        <InputGroup w={["2xs", "sm", "xl"]}>
          <InputLeftElement>
            <SearchIcon color="gray" />
          </InputLeftElement>
          <Input
            name="q"
            placeholder="Search movie.."
            variant="filled"
            autoFocus
          />
          {isLoading && (
            <InputRightElement>
              <Spinner />
            </InputRightElement>
          )}
        </InputGroup>
      </Form>
      {showError && <Center py={16}>{error}</Center>}
      {showData && (
        <>
          <Pagination
            currentPage={p}
            itemsCount={data.totalResults}
            itemsPerPage={MOVIES_PER_PAGE}
            onPageChange={(page) => {
              const params = new URLSearchParams({
                q: q ?? "",
                p: page.toString(),
              })
              submit(params)
            }}
          />
          <MoviesList data={data.Search} />
        </>
      )}
    </Container>
  )
}
