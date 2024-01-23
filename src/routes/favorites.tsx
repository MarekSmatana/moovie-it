import MoviesList from "../components/MoviesList"
import { useFavoriteContext } from "../storage/FavoriteContext"
import ErrorText from "../components/ErrorText"

export default function FavoritesRoute() {
  const { favorites, setFavorite } = useFavoriteContext()

  return favorites.length === 0 ? (
    <ErrorText text="No favorite movies." />
  ) : (
    <MoviesList
      data={favorites}
      onMovieRemove={(movie) => {
        setFavorite(movie, false)
      }}
    />
  )
}
