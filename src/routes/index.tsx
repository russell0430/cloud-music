import React from "react"
import { useRoutes } from "react-router-dom"

import Home from "@/views/Home"
import Recommend from "@/views/Recommend"
import Singers from "@/views/Singers"
import Rank from "@/views/Rank"
import Album from "@/views/Album"
import Singer from "@/views/Singer"
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
        children:[
          {
            path: ":id",
            element: <Album />,
          },
        ]
      },
      {
        path: "/singers",
        element: <Singers />,
        children:[{
          path:"/singers/:id",
          element: <Singer />
        }
        ]
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
