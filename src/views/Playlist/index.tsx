import React, { useRef, useState, useCallback, TouchEventHandler } from "react"
import { CSSTransition } from "react-transition-group"
import {
  ListContent,
  ListHeader,
  PlaylistWrapper,
  ScrollWrapper,
} from "./style"
import { playMode } from "@/api/config"
import Scroll from "@/components/scroll"
import Confirm, { ConfirmHandler } from "@/components/confirm"
import useStore from "./store/useStore"
import { getName } from "@/api/utils"
const Playlist: React.FC = () => {
  const {
    showPlaylist,
    toggleShowPlaylist,
    currentSong,
    mode,
    playlist,
    changeCurrentIndex,
    currentIndex,
    deleteSong,
  } = useStore()

  const playlistRef = useRef<HTMLDivElement>(null)
  const listWrapperRef = useRef<HTMLDivElement>(null)
  const [isShow, setIsShow] = useState(false)

  const onEnterCB = useCallback(() => {
    setIsShow(true)
    listWrapperRef.current!.style["transform"] = "translate3d(0,100%,0)"
  }, [])
  const onEnteringCB = useCallback(() => {
    listWrapperRef.current!.style["transition"] = "all 0.3s"
    listWrapperRef.current!.style["transform"] = "translate3d(0,0,0)"
  }, [])
  const onExitingCB = useCallback(() => {
    listWrapperRef.current!.style["transition"] = "all 0.3s"
    listWrapperRef.current!.style["transform"] = "translate3d(0,100%,0)"
  }, [])
  const onExitedCB = useCallback(() => {
    setIsShow(false)
    listWrapperRef.current!.style["transform"] = "translate3d(0,100%,0)"
  }, [])

  const getCurrentIcon = (item: SongDetail) => {
    const current = currentSong.id === item.id
    const classNames = `current iconfont ${current ? "icon-play" : ""}`
    const content = current ? "&#xe6e3;" : ""
    return (
      <i
        className={classNames}
        dangerouslySetInnerHTML={{ __html: content }}
      ></i>
    )
  }

  const changeMode = (e: React.MouseEvent) => {
    let newNode = (mode + 1) % 3
  }

  const getPlayMode = () => {
    let content, text
    if (mode === playMode.sequence) {
      content = "&#xe625;"
      text = "顺序播放"
    } else if (mode === playMode.single) {
      content = "&#xe653;"
      text = "单曲循环"
    } else {
      content = "&#xe61b;"
      text = "随机播放"
    }
    return (
      <div>
        <i
          className="iconfont"
          onClick={(e) => changeMode(e)}
          dangerouslySetInnerHTML={{ __html: content }}
        ></i>
        <span className="text" onClick={(e) => changeMode(e)}>
          {text}
        </span>
      </div>
    )
  }
  const handleChangeCurrentIndex = (index: number) => {
    if (currentIndex === index) return
    changeCurrentIndex(index)
  }
  const handleDeleteSong = (e: React.MouseEvent, song: SongDetail) => {
    e.stopPropagation()
    deleteSong(song)
  }

  const confirmRef = useRef<ConfirmHandler>(null)
  const handleShowClear = () => {
    confirmRef.current?.show()
  }
  const handleConfirmClear=()=>{}

  const [canTouch, setCanTouch] = useState(true)
  const [startY, setStartY] = useState(0)
  const [initialized, setInitialized] = useState(false)
  const [distance, setDistance] = useState(0)
  const listContentRef = useRef(null)

  const handleScroll = (pos: { x: number; y: number }) => {
    let state = pos.y === 0
    console.log("handleScroll")
    setCanTouch(state)
  }
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    if (!canTouch || initialized) return
    console.log("handleTouchStart")
    listWrapperRef.current!.style["transition"] = ""
    setStartY(e.nativeEvent.touches[0].pageY)
    setInitialized(true)
  }
  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (!canTouch || !initialized) return
    console.log("handleTouchMove")
    let distance = e.nativeEvent.touches[0].pageY - startY
    if (distance < 0) return
    setDistance(distance)
  }
  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    setInitialized(false)
    console.log("handleTouchEnd")
    if (distance >= 150) {
      toggleShowPlaylist(false)
    } else {
      listWrapperRef.current!.style["transition"] = "all 0.3s"
      listWrapperRef.current!.style["transform"] = "translate3d(0,0,0)"
    }
    setDistance(0)
  }
  return (
    <CSSTransition
      in={showPlaylist}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <PlaylistWrapper
        ref={playlistRef}
        style={{ display: isShow ? "block" : "none" }}
        onClick={() => toggleShowPlaylist(false)}
      >
        <div
          className="list-wrapper"
          ref={listWrapperRef}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ListHeader>
            {getPlayMode()}
            <h1 className="title">
              <span className="iconfont clear" onClick={handleShowClear}>
                &#xe63d;
              </span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll
              direction="vertical"
              ref={listContentRef}
              bounceTop={false}
              onScroll={handleScroll}
            >
              <ListContent>
                {playlist.map((item, index) => {
                  return (
                    <li
                      className="item"
                      key={item.id}
                      onClick={() => handleChangeCurrentIndex(index)}
                    >
                      {getCurrentIcon(item)}
                      <span className="text">
                        {item.name} - {getName(item.ar)}
                      </span>
                      <span className="like">
                        <i className="iconfont">&#xe601;</i>
                      </span>
                      <span
                        className="delete"
                        onClick={(e) => handleDeleteSong(e, item)}
                      >
                        <i className="iconfont">&#xe63d;</i>
                      </span>
                    </li>
                  )
                })}
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
        <Confirm
          ref={confirmRef}
          text={"是否删除"}
          cancelBtnText={"取消"}
          confirmBtnText={"确定"}
          handleConfirm={handleConfirmClear}
        />
      </PlaylistWrapper>
    </CSSTransition>
  )
}

export default Playlist
