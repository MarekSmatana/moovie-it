import { Box, HStack, Image } from "@chakra-ui/react"
import { MovieShort } from "../types"
import { Link } from "react-router-dom"

type MoviesListProps = {
  data: MovieShort[]
}

export default function MoviesList({ data }: MoviesListProps) {
  return (
    <HStack wrap="wrap" justify="center" mt={4}>
      {data.map((item) => (
        <Link key={item.imdbID} to={`/detail/${item.imdbID}`}>
          <Box
            p={1}
            border={1}
            borderColor="transparent"
            borderRadius="md"
            borderStyle="solid"
            overflow="hidden"
            _hover={{
              borderColor: "blue.400",
            }}
          >
            <Image
              src={item.Poster}
              alt={item.Title}
              objectFit="cover"
              width={160}
              h={220}
              rounded="sm"
              maxW="none"
              transition="transform .25s ease-in-out"
              _hover={{
                transform: "scale(1.2)",
              }}
            />
          </Box>
        </Link>
      ))}
    </HStack>
  )
}
