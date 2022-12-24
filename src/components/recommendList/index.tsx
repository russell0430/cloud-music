import React from "react"
import { ListWrapper, ListItem, List } from "./style"
import { getCount } from "@/api/utils"
import { useNavigate } from "react-router-dom"
import music from "./music.png"

interface PropsType {
  recommendList: Recommend[]
}
// const ImgPlaceholder = (
//   <img width="100%" height="100%" src={require("./music.png")} alt="music" />
// )
const RecommendList: React.FC<PropsType> = ({ recommendList }) => {
  const navigate = useNavigate()
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {recommendList.map((item, index) => {
          return (
            <ListItem
              key={item.id + index}
              onClick={() => navigate(`/recommend/${item.id}`)}
            >
              <div className="img_wrapper">
                <div className="decorate"></div>
                <img
                  src={`${item.picUrl}?params=300*300`}
                  alt="music"
                  height="100%"
                  width="100%"
                />

                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          )
        })}
      </List>
    </ListWrapper>
  )
}

export default RecommendList
