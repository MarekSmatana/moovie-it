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
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

const movieDetailQuery = (movieId?: string) => ({
  queryKey: movieId,
  queryFn: async () => {
    if (!movieId || !movieId.trim()) return undefined

    console.log("hee?", movieId)
    const searchResult = await fetch(
      "https://omdbapi.com/?apikey=dba850f1&plot=full&i=" + movieId
    )
    console.log("searchResult", searchResult)

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
  console.log("movieId", movieId)
  console.log("data", data)

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
            onClick={() => {
              console.log(data.imdbID)
            }}
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
