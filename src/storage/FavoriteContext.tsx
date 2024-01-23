import React from "react"
import { MovieShort } from "../types"
import * as favoriteService from "../services/favoriteService"

type FavoriteContextProps = {
  favorites: MovieShort[]
  setFavorite: (movie: MovieShort, isFavorite: boolean) => void
}

const FavoriteContext = React.createContext<FavoriteContextProps>({
  favorites: [],
  setFavorite: () => null,
})

export function useFavoriteContext(): FavoriteContextProps {
  return React.useContext(FavoriteContext)
}

export const FavoriteContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [favorites, setFavorites] = React.useState(
    favoriteService.getFavorites()
  )

  const handleSetFavorite = (movie: MovieShort, isFavorite: boolean) => {
    setFavorites((prev) =>
      isFavorite
        ? [...prev, movie]
        : prev.filter((f) => f.imdbID !== movie.imdbID)
    )
    favoriteService.setFavorite(movie, isFavorite)
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        setFavorite: handleSetFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}
