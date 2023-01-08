import React, { useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import Player from "../Player"
import { Top, Tab, TabItem } from "./style"

const activeClassName = ({
  isActive,
}: {
  isActive: boolean
}): string | undefined => (isActive ? "selected" : undefined)

const Home: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search" onClick={() => navigate(`/search`)}>
          &#xe62b;
        </span>
      </Top>
      <Tab>
        <NavLink to="/recommend" className={activeClassName}>
          <TabItem>Recommend</TabItem>
        </NavLink>
        <NavLink to="/singers" className={activeClassName}>
          <TabItem>Singers</TabItem>
        </NavLink>
        <NavLink to="/rank" className={activeClassName}>
          <TabItem>Rank</TabItem>
        </NavLink>
      </Tab>
      <Outlet />
      <Player />
    </div>
  )
}

export default Home
