import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import Header from "@/components/header"
import Scroll from "@/components/scroll"
import Loading from "@/components/loading"
import useAlbum from "./hooks/useAlbum"
import TopDesc from "./TopDesc"
import { Container, Menu } from "./style"
import SongList from "./SongList"

//mock 数据
// const currentAlbum = {
//   creator: {
//     avatarUrl:
//       "http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg",
//     nickname: "浪里推舟",
//   },
//   coverImgUrl:
//     "http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg",
//   subscribedCount: 2010711,
//   name: "听完就睡，耳机是天黑以后柔软的梦境",
//   tracks: [
//     {
//       name: "我真的受伤了",
//       ar: [{ name: "张学友" }, { name: "周华健" }],
//       al: {
//         name: "学友 热",
//       },
//     },
//     {
//       name: "我真的受伤了",
//       ar: [{ name: "张学友" }, { name: "周华健" }],
//       al: {
//         name: "学友 热",
//       },
//     },
//     {
//       name: "我真的受伤了",
//       ar: [{ name: "张学友" }, { name: "周华健" }],
//       al: {
//         name: "学友 热",
//       },
//     },
//     {
//       name: "我真的受伤了",
//       ar: [{ name: "张学友" }, { name: "周华健" }],
//       al: {
//         name: "学友 热",
//       },
//     },
//     {
//       name: "我真的受伤了",
//       ar: [{ name: "张学友" }, { name: "周华健" }],
//       al: {
//         name: "学友 热",
//       },
//     },
//     {
//       name: "我真的受伤了",
//       ar: [{ name: "张学友" }, { name: "周华健" }],
//       al: {
//         name: "学友 热",
//       },
//     },
//     {
//       name: "我真的受伤了",
//       ar: [{ name: "张学友" }, { name: "周华健" }],
//       al: {
//         name: "学友 热",
//       },
//     },
//     {
//       name: "我真的受伤了",
//       ar: [{ name: "张学友" }, { name: "周华健" }],
//       al: {
//         name: "学友 热",
//       },
//     },
//     {
//       name: "我真的受伤了",
//       ar: [{ name: "张学友" }, { name: "周华健" }],
//       al: {
//         name: "学友 热",
//       },
//     },
//     {
//       name: "我真的受伤了",
//       ar: [{ name: "张学友" }, { name: "周华健" }],
//       al: {
//         name: "学友 热",
//       },
//     },
//   ],
// }
interface AlbumProps {}

const Album: React.FC<AlbumProps> = () => {
  const { id } = useParams()
  if (!id) {
    throw new Error("router error no specific album choosen")
  }
  const navigate = useNavigate()
  const [showStatus, setShowStatus] = useState(true)
  const handleBack = () => setShowStatus(false)

  const { albumDetail: currentAlbum, loading } = useAlbum(id)
  console.log(currentAlbum)
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      appear
      classNames="fly"
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <Container>
        <Header title="返回" handleClick={handleBack}></Header>
        {currentAlbum ? (
          <Scroll bounceTop={false} direction="vertical" loading={false}>
            <div>
              <TopDesc currentAlbum={currentAlbum} />
              <Menu>
                <div>
                  <i className="iconfont">&#xe6ad;</i>
                  评论
                </div>
                <div>
                  <i className="iconfont">&#xe86f;</i>
                  点赞
                </div>
                <div>
                  <i className="iconfont">&#xe62d;</i>
                  收藏
                </div>
                <div>
                  <i className="iconfont">&#xe606;</i>
                  更多
                </div>
              </Menu>
          <SongList currentAlbum={currentAlbum}/>
              
            </div>
          </Scroll>
        ) : null}
        <Loading loading={loading} />
      </Container>
    </CSSTransition>
  )
}
export default Album
