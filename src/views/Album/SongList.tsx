import { getCount, getName } from "@/api/utils"
import React from "react"
import { SongListContainer, SongItemContainer } from "./style"

interface SongListProps {
  currentAlbum: Album
}
const SongList: React.FC<SongListProps> = ({ currentAlbum }) => {
  return (
    <SongListContainer showBackground>
      <div className="first-line">
        <div className="play-all">
          <i className="iconfont">&#xe6e3;</i>
          <span>
            播放全部
            <span className="sum">(共 {currentAlbum.tracks.length} 首)</span>
          </span>
        </div>
        <div className="add-list">
          <i className="iconfont">&#xe62d;</i>
          <span> 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
        </div>
      </div>
      <SongItemContainer>
        {currentAlbum.tracks.map((item, index) => {
          return (
            <li key={index}>
              <span className="index">{index + 1}</span>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  {getName(item.ar)} - {item.al.name}
                </span>
              </div>
            </li>
          )
        })}
      </SongItemContainer>
    </SongListContainer>
  )
}

export default SongList
