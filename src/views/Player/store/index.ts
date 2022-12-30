import { useRecoilState, useSetRecoilState } from "recoil"
import {
  useCurrentIndex,
  useCurrentSong,
  useFullScreen,
  useMode,
  usePlaying,
  usePlaylist,
  useSequencePlaylist,
  useShowPlaylist,
} from "@/store/index"
import * as React from "react"
const useStore = () => {
  const [fullScreen, setFullScreen] = useRecoilState(useFullScreen)
  const [playing, setPlaying] = useRecoilState(usePlaying)
  const [currentSong, setCurrentSong] = useRecoilState(useCurrentSong)
  const [mode, setMode] = useRecoilState(useMode)
  const [currentIndex, setCurrenIndex] = useRecoilState(useCurrentIndex)
  const [playlist, setPlaylist] = useRecoilState(usePlaylist)
  const [shwoPlaylist, setShowPlaylist] = useRecoilState(useShowPlaylist)
  const [sequencePlaylist, setSequencePlaylist] =
    useRecoilState(useSequencePlaylist)
  const toggleShowPlaylist = useSetRecoilState(useShowPlaylist)

  return {
    fullScreen,
    playing,
    currentSong,
    mode,
    currentIndex,
    playlist,
    shwoPlaylist,
    sequencePlaylist,
    changeCurrentSong: setCurrentSong,
    toggleFullScreen: setFullScreen,
    togglePlayingStatus: setPlaying,
    changeSequencePlaylist: setSequencePlaylist,
    togglePlaylist: setPlaylist,
    changePlayMode: setMode,
    changeCurrentIndex: setCurrenIndex,
    changeShowPlaylist: setShowPlaylist,
    toggleShowPlaylist,
  }
}
export default useStore
