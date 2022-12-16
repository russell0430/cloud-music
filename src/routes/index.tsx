import React from "react"
import { useRoutes } from "react-router-dom"

import Home from "@/views/Home"
import Recommend from "@/views/Recommend"
import Singers from "@/views/Singers"
import Rank from "@/views/Rank"
type RouteType = {
  path: string
  element: React.ReactElement
  name?: string
  children?: RouteType[]
  exact?: Boolean
}
const routes: RouteType[] = [
  {
    path: "/",
    exact: true,
    element: <Home />,
    children: [
      {
        path: "/recommend",
        element: <Recommend />,
      },
      {
        path: "/singers",
        element: <Singers />,
      },
      {
        path: "/rank",
        element: <Rank />,
      },
    ],
  },
]
const Routes: React.FC = () => {
  return useRoutes(routes)
}
export default Routes
