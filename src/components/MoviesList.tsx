import { Box, HStack, IconButton, Image } from "@chakra-ui/react"
import { MovieShort } from "../types"
import { Link } from "react-router-dom"
import { CloseIcon } from "@chakra-ui/icons"

type MoviesListProps = {
  data: MovieShort[]
  onMovieRemove?: (movie: MovieShort) => void
}

export default function MoviesList({ data, onMovieRemove }: MoviesListProps) {
  return (
    <HStack wrap="wrap" justify="center" mt={4}>
      {data.map((item) => (
        <Link key={item.imdbID} to={`/detail/${item.imdbID}`}>
          <Box
            position="relative"
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
            {onMovieRemove && (
              <IconButton
                variant="ghost"
                icon={<CloseIcon />}
                aria-label="remove"
                position="absolute"
                top={0}
                right={0}
                _hover={{
                  color: "red.500",
                }}
                onClick={(e) => {
                  e.preventDefault()
                  onMovieRemove(item)
                }}
              />
            )}
          </Box>
        </Link>
      ))}
    </HStack>
  )
}
