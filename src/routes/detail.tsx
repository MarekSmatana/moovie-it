import { useParams } from "react-router-dom"

type DetailRouteParams = {
  movieId: string
}
export default function DetailRoute() {
  const { movieId } = useParams<DetailRouteParams>()

  return <div>Detail Route for: {movieId}</div>
}
