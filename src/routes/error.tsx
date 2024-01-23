import { VStack } from "@chakra-ui/react"
import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import ErrorText from "../components/ErrorText"

export default function ErrorRoute() {
  const error = useRouteError()
  const isRouteError = isRouteErrorResponse(error)

  return (
    <VStack>
      <ErrorText text="Oops!" />
      <p>Sorry, an unexpected error has occurred.</p>
      {isRouteError && (
        <p>
          <i>{error.statusText || error.status}</i>
        </p>
      )}
    </VStack>
  )
}
