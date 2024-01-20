import * as service from "./favoriteService"

const FAVORITE = {
  Poster: "poster",
  Title: "title",
  Year: "1970",
  imdbID: "testId",
}

describe("Favorite service", () => {
  beforeAll(() => {
    window.localStorage.removeItem(service.FAVORITE_KEY)
  })

  it("should add to favorites", () => {
    const favorites = service.getFavorites()
    expect(favorites).toHaveLength(0)

    service.setFavorite(FAVORITE, true)
    const newFavorite = service.getFavorites()
    expect(newFavorite).toEqual([FAVORITE])
  })

  it("should get all favorites", () => {
    const favorite = service.getFavorite(FAVORITE.imdbID)
    expect(favorite).toEqual(FAVORITE)
  })

  it("should remove favorite", () => {
    service.setFavorite(FAVORITE, false)
    const favorites = service.getFavorites()
    expect(favorites).toEqual([])
  })
})
