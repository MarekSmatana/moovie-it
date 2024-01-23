export type MovieShort = {
  Poster: string
  Title: string
  Year: string
  imdbID: string
}

export type MovieLong = MovieShort & {
  Genre: string
  Country: string
  Year: string
  Runtime: string
  Writer: string
  Director: string
  Actors: string
}

type ErrorResponse = {
  Error: string
  Response: "False"
}

export type MovieSearchResponse =
  | ErrorResponse
  | {
      Response: "True"
      totalResults: number
      Search: MovieShort[]
    }

export type MovieDetailResponse = ErrorResponse | MovieLong
