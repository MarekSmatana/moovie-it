import { MovieShort } from "../types"

const FAVORITE_KEY = "favoriteRecords"

export function setFavorite(record: MovieShort, isFavorite: boolean) {
  if (!window.localStorage) return false

  let favorites = getFavorites()
  if (!isFavorite)
    favorites = favorites.filter((r) => r.imdbID !== record.imdbID)
  if (isFavorite) {
    favorites.push(record)
  }

  window.localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites))
  return isFavorite
}

export function getFavorite(id: string) {
  const favorites = getFavorites()
  return favorites.find((f) => f.imdbID === id)
}

export function getFavorites() {
  if (!window.localStorage) return []

  const parsedFavorites = JSON.parse(
    window.localStorage.getItem(FAVORITE_KEY) ?? "[]"
  )
  return parsedFavorites as MovieShort[]
}