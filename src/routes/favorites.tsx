import { Box } from "@chakra-ui/react"
import MoviesList from "../components/MoviesList"
import * as favoriteService from "../services/favoriteService"
import React from "react"
import { MovieShort } from "../types"

export default function FavoritesRoute() {
  const [favorites, setFavorites] = React.useState(
    favoriteService.getFavorites()
  )

  const handleRemoveFavorite = (movie: MovieShort) => {
    setFavorites((prev) => prev.filter((f) => f.imdbID !== movie.imdbID))
    favoriteService.setFavorite(movie, false)
  }

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
    <MoviesList data={favorites} onMovieRemove={handleRemoveFavorite} />
  )
}
