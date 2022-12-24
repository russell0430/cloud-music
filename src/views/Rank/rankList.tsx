import React from "react"
import { List, SongList as SongListContainer, ListItem } from "./style"
import { filterIdx } from "@/api/utils"

const SongList: React.FC<{ list: Song[] }> = ({ list }) => {
  return list.length ? (
    <SongListContainer>
      {list.map((item, index) => {
        return (
          <li key={index}>
            {index + 1}. {item.first} - {item.second}
          </li>
        )
      })}
    </SongListContainer>
  ) : null
}

interface PropsType {
  list: Song[]
  global?: boolean
}

const enterDetail = (name: string) => {
  const idx = filterIdx(name)
  console.log(name)
  if (idx === null) {
    console.warn("暂无数据")
    return
  }
}
const RankList: React.FC<PropsType> = ({ list, global = false }) => {
  return (
    <List globalRank={global}>
      {list.map((item, index) => {
        console.log(item)
        return (
          <ListItem
            key={`${item.coverImgId}${index}`}
            tracks={item.tracks}
            onClick={() => enterDetail(item.name)}
          >
            <div className="img-wrapper">
              <img src={item.coverImgUrl} alt={item.name} />
              <div className="decorate"></div>
              <span className="update-frequency">{item.updateFrequency}</span>
            </div>
            {}
          </ListItem>
        )
      })}
    </List>
  )
}

export default RankList
