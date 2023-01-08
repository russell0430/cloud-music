import React, { useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import Header from "@/components/header"
import Scroll from "@/components/scroll"
import Loading from "@/components/loading"
import SongList from "@/views/SongList"
import useAlbum from "./hooks/useAlbum"
import TopDesc from "./TopDesc"
import { Container, Menu } from "./style"
import style from "@/assets/global-style"
export const HEADER_HEIGHT = 45
interface AlbumProps {}

const Album: React.FC<AlbumProps> = () => {
  const { id } = useParams()
  if (!id) {
    throw new Error("router error: no specific album choosen")
  }
  const navigate = useNavigate()
  const [showStatus, setShowStatus] = useState(true)
  const handleBack = () => setShowStatus(false)

  const { albumDetail: currentAlbum, loading } = useAlbum(id)

  const [title, setTitle] = useState("歌单")
  const [isMarquee, setIsMarquee] = useState(false)

  const headerEl = useRef<HTMLDivElement>(null)
  const handleScroll = (pos: { x: number; y: number }) => {
    let minScrollY = -HEADER_HEIGHT
    let percent = Math.abs(pos.y / minScrollY)
    let headerDom = headerEl.current
    if (!headerDom) {
      console.warn("error")
      return
    }
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = style["theme-color"]
      headerDom.style.opacity = ` ${Math.min(1, (percent - 1) / 2)}`
      setTitle((prev) => {
        return currentAlbum?.name || prev
      })
      setIsMarquee(true)
    } else {
      headerDom.style.backgroundColor = ""
      headerDom.style.opacity = "1"
      setTitle("歌单")
      setIsMarquee(false)
    }
  }
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
        <Header
          ref={headerEl}
          title={title}
          handleClick={handleBack}
          isMarquee={isMarquee}
        ></Header>
        {currentAlbum ? (
          <Scroll
            bounceTop={false}
            direction="vertical"
            loading={false}
            onScroll={handleScroll}
          >
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
              <SongList
                songs={currentAlbum.tracks}
                showCollect={false}
                showBackground={false}
                collectCount={0}
              />
            </div>
          </Scroll>
        ) : null}
        <Loading loading={loading} />
      </Container>
    </CSSTransition>
  )
}
export default Album
