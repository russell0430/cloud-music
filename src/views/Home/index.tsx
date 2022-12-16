import React, { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { Top, Tab, TabItem } from "./style"

const activeClassName = ({
  isActive,
}: {
  isActive: boolean
}): string | undefined => (isActive ? "selected" : undefined)

const Home: React.FC = () => {
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
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
    </div>
  )
}

export default Home
