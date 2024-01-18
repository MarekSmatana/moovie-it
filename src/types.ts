export type MovieSearchResponse =
  | {
      Error: string
      Response: "False"
    }
  | {
      Response: "True"
      totalResults: number
      Search: MovieShort[]
    }

export type MovieShort = {
  Poster: string
  Title: string
  Year: string
  imdbID: string
}
