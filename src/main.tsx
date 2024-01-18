import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Root from "./routes/_layout"
import Search, { loader } from "./routes/search"
import Detail from "./routes/detail"
import Favorite from "./routes/favorites"
import Error from "./routes/error"
import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Search />,
        loader: loader(queryClient),
      },
      {
        path: "detail/:movieId",
        element: <Detail />,
      },
      {
        path: "favorites",
        element: <Favorite />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
)
