import { isRouteErrorResponse, useRouteError } from "react-router-dom"

export default function ErrorRoute() {
  const error = useRouteError()
  const isRouteError = isRouteErrorResponse(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {isRouteError && (
        <p>
          <i>{error.statusText || error.status}</i>
        </p>
      )}
    </div>
  )
}
