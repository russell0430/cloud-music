import Scroll from "@/components/scroll"
import type { ScrollHandler } from "@/components/scroll"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useParams, useNavigate, Outlet } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import SongList from "@/views/SongList"
import {
  BgLayer,
  CollectButton,
  Container,
  Header,
  ImgWrapper,
  SongListWrapper,
} from "./style"
import { HEADER_HEIGHT } from "@/api/config"
import useArtist from "./hooks/useArtist"

const Singer: React.FC = () => {
  const { id } = useParams()
  if (!id) {
    throw new Error("router error! No specific singer choosen")
  }
  const { loading, artist } = useArtist(id)
  const navigate = useNavigate()

  const [showStatus, setShowStatus] = useState(true)

  const collectButton = useRef<HTMLDivElement>(null)
  const imageWrapper = useRef<HTMLDivElement>(null)
  const songScrollWrapper = useRef<HTMLDivElement>(null)
  const songScroll = useRef<ScrollHandler>(null)
  const header = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)
  const initialHeight = useRef(0)
  const OFFSET = 5

  // TODO : 需要仔细思考这个
  const refresh = useCallback(() => {
    let h = imageWrapper.current?.offsetHeight || 0
    songScrollWrapper.current!.style.top = `${h - OFFSET}px`
    initialHeight.current = h
    // 把遮罩先放在下面，以裹住歌曲列表
    layer.current!.style.top = `${h - OFFSET}px`
    songScroll.current?.refresh()
  }, [])
  useEffect(() => {
    window.addEventListener("resize", refresh)
    return () => {
      window.removeEventListener("resize", refresh)
    }
  }, [refresh])

  const setShowStatusFalse = useCallback(() => setShowStatus(false), [])
  const handleScroll = useCallback((pos: { x: number; y: number }) => {
    let height = initialHeight.current
    const newY = pos.y
    const imageDOM = imageWrapper.current
    const buttonDOM = collectButton.current
    const headerDOM = header.current
    const layerDOM = layer.current

    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT

    const percent = Math.abs(newY / height)

    if (newY > 0) {
      imageDOM!.style["transform"] = `scale(${1 + percent});`
      buttonDOM!.style["transform"] = `translateed(0,${newY});`
      layerDOM!.style.top = `${height - OFFSET + newY};`
    } else if (newY >= minScrollY) {
      layerDOM!.style.top = `${height - OFFSET - Math.abs(newY)}px;`
      layerDOM!.style.zIndex = "1"
      imageDOM!.style.paddingTop = "75%"
      layerDOM!.style.height = "0"
      imageDOM!.style.zIndex = "-1"

      buttonDOM!.style["transform"] = `translate3d(0,${newY}px,0);`
      buttonDOM!.style["opacity"] = `${1 - percent * 2}`
    } else if (newY < minScrollY) {
      layerDOM!.style.top = `${HEADER_HEIGHT - OFFSET}px`
      layerDOM!.style.zIndex = "1"
      // 防止溢出的歌单内容遮住 Header
      headerDOM!.style.zIndex = "100"
      // 此时图片高度与 Header 一致
      imageDOM!.style.height = "0"
      imageDOM!.style.paddingTop = "0"
      imageDOM!.style.zIndex = "99"
    }
  }, [])
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      appear
      classNames="fly"
      unmountOnExit
      onExit={() => navigate(-1)}
    >
      <Container play={0}>
        <Header ref={header}></Header>
        <ImgWrapper bgUrl={artist.artist.picUrl} ref={imageWrapper}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layer} />
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll
            loading={false}
            onScroll={handleScroll}
            direction="vertical"
            ref={songScroll}
          >
            <SongList
              collectCount={0}
              songs={artist.hotSongs}
              showCollect
              showBackground
            ></SongList>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  )
}

export default Singer
