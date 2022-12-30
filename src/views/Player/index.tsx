import React, { SyntheticEvent, useEffect, useRef, useState } from "react"
import MiniPlayer from "./MiniPlayer"
import NormalPlayer from "./NornalPlayer"
import useStore from "./store"
import Toast from "@/components/toast"
import type { ToastHandler } from "@/components/toast"
import { findIndex, getSongUrl, isEmptyObject, shuffle } from "@/api/utils"
import Playlist from "../Playlist"
const currentSong = {
  al: {
    picUrl:
      "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg",
  },
  name: "木偶人",
  ar: [{ name: "薛之谦" }],
}

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

  const [currentTime, setCurrentTime] = useState(0)
  // 总时长
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration
  const clickPlaying = (e: React.MouseEvent, status: boolean) => {
    e.stopPropagation()
    togglePlayingStatus(status)
  }

  useEffect(() => {
    changeCurrentIndex(0)
  }, [])
  useEffect(() => {
    if (currentIndex === -1 || !playlist[currentIndex]) return

    let current = playlist[currentIndex]
    changeCurrentSong(current)
    audioRef.current!.src = getSongUrl(current.id)
    console.log("current", current)
    setCurrentTime(0)
    setDuration((current.dt / 1000) | 0)
    togglePlayingStatus(true)
  }, [playlist, currentIndex])

  useEffect(() => {
    playing ? audioRef.current?.play() : audioRef.current?.pause()
    console.log("playing", playing)
  }, [playing])

  const updateTime: React.ReactEventHandler<HTMLAudioElement> = (e) => {
    // https://freshman.tech/snippets/typescript/fix-value-not-exist-eventtarget/
    const target = e.target as HTMLAudioElement
    const a = e.target
    setCurrentTime(target.currentTime)
  }
  const onProgressChange = (curPercent: number) => {
    const newTime = curPercent * duration
    setCurrentTime(newTime)
    audioRef.current!.currentTime = newTime
    if (!playing) {
      togglePlayingStatus(true)
    }
  }

  const handleLoop = () => {
    audioRef.current!.currentTime = 0
    togglePlayingStatus(true)
    // 上面 playing 会导致 play 触发,这里还需要嘛?
    audioRef.current?.play()
  }

  const handlePrev = () => {
    if (playlist.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex - 1
    if (index < 0) index = playlist.length - 1
    if (!playing) togglePlayingStatus(true)
    changeCurrentIndex(index)
  }

  const handleNext = () => {
    if (playlist.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex + 1
    if (index < 0) index = 0
    if (!playing) togglePlayingStatus(true)
    changeCurrentIndex(index)
  }
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
