import * as React from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  useCurrentIndex,
  usePlaylist,
  useCurrentSong,
  usePlaying,
} from "@/store"
import { getSongUrl } from "@/api/utils"
const usePlayStatus = () => {
  // 是否播放
  const [playing, setPlaying] = useRecoilState(usePlaying)
  // 当前 歌曲在列表中的位置
  const [currentIndex, setCurrentIndex] = useRecoilState(useCurrentIndex)

  // 当前播放歌曲
  const setCurrentSong = useSetRecoilState(useCurrentSong)
  // 当前播放列表
  const playlist = useRecoilValue(usePlaylist)
  // 当前时长
  const [currentTime, setCurrentTime] = React.useState(0)
  // 总时长
  const [duration, setDuration] = React.useState(0)

  const audioRef = React.useRef<HTMLAudioElement>(null)
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration
  // 初始化列表 index
  React.useEffect(() => {
    setCurrentIndex(0)
  }, [])

  React.useEffect(() => {
    if (currentIndex === -1 || !playlist[currentIndex]) return
    let current = playlist[currentIndex]
    setCurrentSong(current)
    audioRef.current!.src = getSongUrl(current.id)
    setCurrentTime(0)
    setDuration(current.dt / 1000 || 0)

    // 这里是否应该开始播放音乐?
    // setPlaying(true)
  }, [playlist, currentIndex])

  React.useEffect(() => {
    playing ? audioRef.current?.play() : audioRef.current?.pause()
  }, [playing])
  const updateTime: React.ReactEventHandler<HTMLAudioElement> =
    React.useCallback((e) => {
      // https://freshman.tech/snippets/typescript/fix-value-not-exist-eventtarget/
      const target = e.target as HTMLAudioElement
      const a = e.target
      setCurrentTime(target.currentTime)
    }, [])

  const onProgressChange = React.useCallback(
    (curPercent: number) => {
      const newTime = curPercent * duration
      setCurrentTime(newTime)
      audioRef.current!.currentTime = newTime
      if (!playing) {
        setPlaying(true)
      }
    },
    [duration]
  )

  const handleLoop = () => {
    audioRef.current!.currentTime = 0
    setPlaying(true)
  }

  const handlePrev = () => {
    if (playlist.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex - 1
    if (index < 0) index = playlist.length - 1
    if (!playing) setPlaying(true)
    setCurrentIndex(index)
  }

  const handleNext = () => {
    if (playlist.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex + 1
    if (index < 0) index = 0
    if (!playing) setPlaying(true)
    setCurrentIndex(index)
  }

  return {
    percent,
    duration,
    currentTime,
    handleNext,
    handlePrev,
    handleLoop,
    onProgressChange,
    updateTime,
    audioRef,
  }
}

export default usePlayStatus
