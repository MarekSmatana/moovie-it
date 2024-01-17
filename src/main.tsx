import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Root from "./routes/_layout"
import Search from "./routes/search"
import Detail from "./routes/detail"
import Favorite from "./routes/favorites"
import Error from "./routes/error"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Search />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
)
