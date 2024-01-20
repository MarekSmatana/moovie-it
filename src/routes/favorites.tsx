import { Box } from "@chakra-ui/react"
import MoviesList from "../components/MoviesList"
import { getFavorites } from "../services/favoriteService"

export default function FavoritesRoute() {
  const favorites = getFavorites()

  return favorites.length === 0 ? (
    <Box
      as="h1"
      fontWeight="semibold"
      fontSize="lg"
      textColor="gray.400"
      mt={16}
    >
      No favorite movies.
    </Box>
  ) : (
    <MoviesList data={favorites} />
  )
}
