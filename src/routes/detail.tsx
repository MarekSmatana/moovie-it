import { StarIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  HStack,
  IconButton,
  Image,
  Spinner,
  Stack,
  VStack,
} from "@chakra-ui/react"
import React from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { useFavoriteContext } from "../storage/FavoriteContext"
import { MovieDetailResponse } from "../types"

const movieDetailQuery = (movieId?: string) => ({
  queryKey: movieId,
  queryFn: async () => {
    if (!movieId || !movieId.trim()) return undefined

    const searchResult = await fetch(
      "https://omdbapi.com/?apikey=dba850f1&plot=full&i=" + movieId
    )

    if (!searchResult) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      })
    }

    return await searchResult.json()
  },
})

type DetailRouteParams = {
  movieId: string
}
export default function DetailRoute() {
  const { movieId } = useParams<DetailRouteParams>()
  const { data, isLoading } = useQuery<MovieDetailResponse>(
    movieDetailQuery(movieId)
  )
  const { favorites, setFavorite } = useFavoriteContext()
  const isFavorite = React.useMemo(() => {
    if (!data || "Error" in data) return false
    return favorites.find((f) => f.imdbID === data.imdbID)
  }, [favorites, data])

  if (isLoading)
    return (
      <Center my={16}>
        <Spinner size="xl" />
      </Center>
    )

  if (!data || "Error" in data)
    return (
      <Center my={16}>
        <Box as="h2">{data?.Error ?? "Unexpected error occurred."}</Box>
      </Center>
    )

  return (
    <Stack
      direction={["column", "column", "row"]}
      spacing={16}
      justify="center"
      alignItems="center"
    >
      <Image
        src={data.Poster}
        alt={data.Title}
        objectFit="cover"
        width={300}
        h={400}
        rounded="sm"
        maxW="none"
      />
      <VStack justify="center">
        <HStack>
          <Box fontWeight="bold" as="h1" fontSize="lg">
            {data.Title}
          </Box>
          <IconButton
            icon={<StarIcon />}
            aria-label="favorite"
            variant="none"
            color={isFavorite ? "yellow" : "white"}
            onClick={() => {
              setFavorite(data, !isFavorite)
            }}
          />
        </HStack>
        <Box>{data.Genre.replace(/,/g, " /")}</Box>
        <Box>
          {data.Country} • {data.Year} • {data.Runtime}
        </Box>
        <HStack mt={4} alignSelf="start" alignItems="start">
          <Box fontWeight="bold">Writer:</Box>
          <Box>{data.Writer}</Box>
        </HStack>
        <HStack alignSelf="start" alignItems="start">
          <Box fontWeight="bold">Director:</Box>
          <Box>{data.Director}</Box>
        </HStack>
        <HStack alignSelf="start" alignItems="start">
          <Box fontWeight="bold">Actors:</Box>
          <Box>{data.Actors}</Box>
        </HStack>
      </VStack>
    </Stack>
  )
}
