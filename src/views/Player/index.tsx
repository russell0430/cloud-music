import React, { SyntheticEvent, useEffect, useRef, useState } from "react"
import MiniPlayer from "./MiniPlayer"
import NormalPlayer from "./NornalPlayer"
import useStore from "./store"
import Toast from "@/components/toast"
import type { ToastHandler } from "@/components/toast"
import { findIndex, getSongUrl, isEmptyObject, shuffle } from "@/api/utils"
import Playlist from "../Playlist"
import usePlayStatus from "./hooks/usePlayStatus"
import useLyric from "./hooks/useLyric"

interface PlayerProps {}
const Player: React.FC<PlayerProps> = () => {
  const {
    fullScreen,
    toggleFullScreen,
    playing,
    currentIndex,
    currentSong,
    mode,
    playlist,
    sequencePlaylist,
    changeSequencePlaylist,
    togglePlayingStatus,
    changePlayMode,
    changeCurrentIndex,
    changeCurrentSong,
    toggleShowPlaylist,
  } = useStore()

  const clickPlaying = (e: React.MouseEvent, status: boolean) => {
    e.stopPropagation()
    togglePlayingStatus(status)
    lyricParser.current?.togglePlay(currentTime * 1000, status)
  }

  const {
    percent,
    duration,
    currentTime,
    handleLoop,
    handleNext,
    handlePrev,
    onProgressChange: onChange,
    updateTime,
    audioRef,
  } = usePlayStatus()

  const { loading, lyricParser, currentLineNum } = useLyric(currentSong.id)

  
  const toastRef = useRef<ToastHandler>(null)
  const changeMode = () => {
    let newMode = (mode + 1) % 3
    switch (newMode) {
      case 0: {
        changeSequencePlaylist(sequencePlaylist)
        let index = findIndex(currentSong, sequencePlaylist)
        changeCurrentIndex(index)
        break
      }
      case 1: {
        changeSequencePlaylist(sequencePlaylist)
        break
      }
      case 2: {
        let newList = shuffle(sequencePlaylist)
        let index = findIndex(currentSong, newList)
        changeSequencePlaylist(newList)
      }
    }
    changePlayMode(newMode)
    toastRef.current?.show()
  }

  const onProgressChange = (curPercent: number) => {
    const newTime = curPercent * duration
    onChange(curPercent)
    lyricParser.current?.seek(newTime * 1000)
    console.log("progress change", newTime)
  }
  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <>
          <MiniPlayer
            percent={percent}
            duration={duration}
            song={currentSong}
            fullScreen={fullScreen}
            playing={playing}
            toggleFullScreen={toggleFullScreen}
            clickPlaying={clickPlaying}
            toggleShowPlaylist={toggleShowPlaylist}
          ></MiniPlayer>
          <NormalPlayer
            currentLineNum={currentLineNum}
            currentLyric={lyricParser.current?.getLyrics() || []}
            mode={mode}
            changeMode={changeMode}
            percent={percent}
            duration={duration}
            currentTime={currentTime}
            playing={playing}
            clickPlaying={clickPlaying}
            song={currentSong}
            fullScreen={fullScreen}
            toggleFullScreen={toggleFullScreen}
            onProgressChange={onProgressChange}
            handleNext={handleNext}
            handlePrev={handlePrev}
            toggleShowPlaylist={toggleShowPlaylist}
          ></NormalPlayer>
        </>
      )}
      <audio ref={audioRef} onTimeUpdate={updateTime} autoPlay />
      <Playlist />
      <Toast text={"modeText"} ref={toastRef}></Toast>
    </div>
  )
}

export default Player
