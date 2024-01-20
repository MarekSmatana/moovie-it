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
import * as favoriteService from "../services/favoriteService"

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
  const { data, isLoading } = useQuery(movieDetailQuery(movieId))
  const [isFavorite, setIsFavorite] = React.useState(false)

  React.useEffect(() => {
    if (data) {
      const favorite = favoriteService.getFavorite(data.imdbID)
      setIsFavorite(!!favorite)
    }
  }, [data])

  const handleFavorite = () => {
    const favorite = favoriteService.setFavorite(data, !isFavorite)
    setIsFavorite(favorite)
  }

  if (isLoading)
    return (
      <Center my={16}>
        <Spinner size="xl" />
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
        src={data?.Poster}
        alt={data?.Title}
        objectFit="cover"
        width={300}
        h={400}
        rounded="sm"
        maxW="none"
      />
      <VStack justify="center">
        <HStack>
          <Box fontWeight="bold" as="h1" fontSize="lg">
            {data?.Title}
          </Box>
          <IconButton
            icon={<StarIcon />}
            aria-label="favorite"
            variant="none"
            color={isFavorite ? "yellow" : "white"}
            onClick={handleFavorite}
          />
        </HStack>
        <Box>{data.Genre.replaceAll(",", " /")}</Box>
        <Box>
          {data.Country} • {data.Year} • {data.Runtime}
        </Box>
        <HStack mt={4}>
          <Box fontWeight="bold">Writer:</Box>
          <Box>{data.Writer}</Box>
        </HStack>
        <HStack>
          <Box fontWeight="bold">Director:</Box>
          <Box>{data.Director}</Box>
        </HStack>
        <HStack>
          <Box fontWeight="bold">Actors:</Box>
          <Box>{data.Actors}</Box>
        </HStack>
      </VStack>
    </Stack>
  )
}
