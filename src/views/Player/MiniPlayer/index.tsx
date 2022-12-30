import { getName } from "@/api/utils"
import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import ProgressCircle from "@/components/progressCircle"
import { MiniPlayerContainer } from "./style"
interface MiniPlayerProps {
  song: SongDetail
  playing: boolean
  percent: number
  duration: number
  clickPlaying: (e: React.MouseEvent, val: boolean) => void
  fullScreen: boolean
  toggleFullScreen: (value: boolean) => void
  toggleShowPlaylist: (val: boolean) => void
}
const MiniPlayer: React.FC<MiniPlayerProps> = ({
  song,
  playing,
  percent,
  clickPlaying,
  duration,
  fullScreen,
  toggleFullScreen,
  toggleShowPlaylist,
}) => {
  const miniPlayerRef = useRef<HTMLDivElement>(null)
  const handleTogglePlaylist = (e: React.MouseEvent) => {
    toggleShowPlaylist(true)
    e.stopPropagation()
  }
  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      appear
      onEnter={() => {
        miniPlayerRef.current!.style.display = "flex"
      }}
      onExited={() => {
        miniPlayerRef.current!.style.display = "none"
      }}
    >
      <MiniPlayerContainer
        ref={miniPlayerRef}
        onClick={() => {
          toggleFullScreen(true)
        }}
      >
        <div className="icon">
          <div className="imgWrapper">
            <img
              src={song.al.picUrl}
              alt=""
              className={`play ${playing ? "" : "pause"}`}
            />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            {playing ? (
              <i
                className="iconfont icon-mini icon-pause"
                onClick={(e) => clickPlaying(e, false)}
              >
                &#xe650;
              </i>
            ) : (
              <i
                className="iconfont icon-mini icon-play"
                onClick={(e) => clickPlaying(e, true)}
              >
                &#xe61e;
              </i>
            )}
          </ProgressCircle>
        </div>

        <div className="control" onClick={handleTogglePlaylist}>
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

export default MiniPlayer
