import { formatPlayTime, getName, _getPosAndScale } from "@/api/utils"
import { CSSTransition } from "react-transition-group"
import ProgressBar from "@/components/progressBar"
import React, { useEffect, useRef } from "react"
import animations from "create-keyframe-animation"
import { playMode } from "@/api/config"
import {
  Bottom,
  CDWrapper,
  Middle,
  NormalPlayerContainer,
  Operators,
  ProgressWrapper,
  Top,
} from "./style"

interface NormalPalyerProps {
  percent: number
  duration: number
  currentTime: number
  playing: boolean
  song: SongDetail
  fullScreen: boolean
  mode: playMode
  changeMode: () => void
  handlePrev: () => void
  handleNext: () => void
  toggleFullScreen: (value: boolean) => void
  onProgressChange: (percent: number) => void
  clickPlaying: (e: React.MouseEvent, val: boolean) => void
  toggleShowPlaylist: (val: boolean) => void
}
const NormalPlayer: React.FC<NormalPalyerProps> = ({
  playing,
  percent,
  duration,
  currentTime,
  song,
  fullScreen,
  mode,
  handlePrev,
  handleNext,
  toggleFullScreen,
  onProgressChange,
  clickPlaying,
  changeMode,
  toggleShowPlaylist,
}) => {
  const normalPlayerRef = useRef<HTMLDivElement>(null)
  const cdWrapperRef = useRef<HTMLDivElement>(null)

  const enter = () => {
    normalPlayerRef.current!.style.display = "block"
    const { x, y, scale } = _getPosAndScale()
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      60: {
        transform: "transform3d(0,0,0) scale(1.1)",
      },
      100: {
        transform: "transform3d(0,0,0) scale(1)",
      },
    }
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear",
      },
    })
    animations.runAnimation(cdWrapperRef.current!, "move")
  }
  const afterEnter = () => {
    const cdWrapperDom = cdWrapperRef.current
    animations.unregisterAnimation("move")
    cdWrapperDom!.style.animation = ""
  }

  const leave = () => {
    if (!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = "all 0.4s"
    const { x, y, scale } = _getPosAndScale()
    cdWrapperDom.style[
      "transform"
    ] = `translate3d(${x}px,${y}px,0) scale(${scale})`
  }

  const afterLeave = () => {
    if (!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = ""
    cdWrapperDom.style["transform"] = ""
    normalPlayerRef.current!.style.display = "none"
  }

  const handleTogglePlaylist = (e: React.MouseEvent) => {
    console.log("show playlist")
    toggleShowPlaylist(true)
    e.stopPropagation()
  }
  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      appear
      onEnter={enter}
      afterEnter={afterEnter}
      mountOnEnter
      onExit={leave}
      onExited={afterLeave}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img src={`${song.al.picUrl}?params=300*300`} alt="歌曲" />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="sub-title">{getName(song.ar)}</h1>
        </Top>
        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img
                src={`${song.al.picUrl}?param=400*400`}
                alt=""
                className={`image play ${playing ? "" : "pause"}`}
              />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
          <ProgressWrapper>
            <span className="time time-l">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar percentChange={onProgressChange} percent={percent} />
            </div>
            <div className="time time-r">{formatPlayTime(duration)}</div>
          </ProgressWrapper>
          <Operators>
            <div className="icon i-left" onClick={changeMode}>
              <i
                className="iconfont"
                dangerouslySetInnerHTML={{ __html: getPlayMode(mode) }}
              ></i>
            </div>
            <div className="icon i-left" onClick={handlePrev}>
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div
              className="icon i-center"
              onClick={(e) => clickPlaying(e, !playing)}
            >
              {playing ? (
                <i className="iconfont">&#xe723;</i>
              ) : (
                <i className="iconfont">&#xe731;</i>
              )}
            </div>
            <div className="icon i-right" onClick={handleNext}>
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right" onClick={handleTogglePlaylist}>
              <i className="iconfont">&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  )
}
const getPlayMode = (mode: playMode) => {
  let content
  if (mode === playMode.sequence) {
    content = "&#xe625;"
  } else if (mode === playMode.single) {
    content = "&#xe653;"
  } else {
    content = "&#xe61b;"
  }
  return content
}

export default NormalPlayer
