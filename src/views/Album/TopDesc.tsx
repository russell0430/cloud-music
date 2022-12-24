import React from "react"
import { TopDescContainer } from "./style"
interface TopDescProps {
  currentAlbum: Album
}
const TopDesc: React.FC<TopDescProps> = ({ currentAlbum }) => {
  return (
    <TopDescContainer background={currentAlbum.coverImgUrl}>
      <div className="background">
        <div className="filter"></div>
      </div>
      <div className="img-wrapper">
        <div className="decorate"></div>
        <img src={currentAlbum.coverImgUrl} alt="" />
        <div className="play-count">
          <i className="iconfont play">&#xe885;</i>
          <span className="count"></span>
        </div>
      </div>
      <div className="desc-wrapper">
        <div className="title">{currentAlbum.name}</div>
        <div className="person">
          <div className="avatar">
            <img src={currentAlbum.creator.avatarUrl} alt="" />
          </div>
          <div className="name">{currentAlbum.creator.nickname}</div>
        </div>
      </div>
    </TopDescContainer>
  )
}

export default TopDesc
