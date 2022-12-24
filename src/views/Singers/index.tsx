import React, { useState } from "react"
import Horizon from "@/components/horizontalItem"
import Scroll from "@/components/scroll"
import { NavContainer, ListContainer } from "./style"
import SingerList from "./SingerList"
import useSingerList from "./hooks/useSingerList"
import { categories, alphas } from "@/api/config"
import { Outlet } from "react-router-dom"

const Singers: React.FC = () => {
  const [category, setCategory] = useState(categories[0].key)
  const [alpha, setAlpha] = useState(alphas[0].key)
  const { loading, singerList, refreshMoreSingerList, changeCategoryOrAlpha } =
    useSingerList({ category, alpha })

  const updateCategory = (key: {type:number,area:number}) => {
    setCategory(key)
    changeCategoryOrAlpha({ category: key })
  }

  const updateAlpha = (key: string) => {
    setAlpha(key)
    changeCategoryOrAlpha({ alpha: key })
  }
  return (
    <div>
      <NavContainer>
        <Horizon
          list={categories}
          title="分类 (默认热门):"
          handleClick={updateCategory}
          oldVal={category}
        ></Horizon>
        <Horizon
          list={alphas}
          title="歌手 (默认首字母)"
          handleClick={updateAlpha}
          oldVal={alpha}
        ></Horizon>
      </NavContainer>
      <ListContainer>
        <Scroll direction="vertical" loading={loading}>
          <SingerList singerList={singerList} />
        </Scroll>
      </ListContainer>
      <Outlet />
    </div>
  )
}
export default Singers
