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
import { Form, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { MovieSearchResponse } from "../types"
import MoviesList from "../components/MoviesList"

const moviesSearchQuery = (query?: string) => ({
  queryKey: query,
  queryFn: async () => {
    if (!query || !query.trim()) return undefined
    const searchResult = await fetch(
      "https://omdbapi.com/?apikey=dba850f1&type=movie&page=2&s=" + query
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
  query?: string
}
export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const query = url.searchParams.get("query")?.trim()

    if (
      query &&
      !queryClient.getQueriesData(moviesSearchQuery(query).queryKey ?? "")
    ) {
      await queryClient.fetchQuery(moviesSearchQuery(query))
    }

    return { query }
  }

export default function SearchRoute() {
  const { query } = useLoaderData() as SearchLoaderData
  const { data, isError, isLoading } = useQuery(moviesSearchQuery(query))

  const showError = isError || data?.Response === "False"
  const isData = !!data && data.Response === "True"
  const error =
    data?.Response === "False" ? data.Error : "Unexpected error happened."

  return (
    <Container centerContent maxW="container.lg">
      <Form>
        <InputGroup w={["2xs", "sm", "xl"]}>
          <InputLeftElement>
            <SearchIcon color="gray" />
          </InputLeftElement>
          <Input name="query" placeholder="Search movie.." />
          {isLoading && (
            <InputRightElement>
              <Spinner />
            </InputRightElement>
          )}
        </InputGroup>
      </Form>
      {showError && <Center py={16}>{error}</Center>}
      {isData && data.Search.length > 0 && <MoviesList data={data.Search} />}
    </Container>
  )
}
