import { useRecoilState, useSetRecoilState } from "recoil"
import { default_current_song } from "@/store/constans"
import {
  useShowPlaylist,
  useCurrentIndex,
  useCurrentSong,
  useMode,
  useSequencePlaylist,
  usePlaylist,
  usePlaying,
} from "@/store/index"
import { findIndex } from "@/api/utils"
const useStore = () => {
  const [showPlaylist, setShowPlaylist] = useRecoilState(useShowPlaylist)
  const [currentIndex, setCurrentIndex] = useRecoilState(useCurrentIndex)
  const [currentSong, setCurrentSong] = useRecoilState(useCurrentSong)
  const [mode, setMode] = useRecoilState(useMode)
  const [playlist, setPlaylist] = useRecoilState(usePlaylist)
  const [sequencePlaylist, setSequencePlaylist] =
    useRecoilState(useSequencePlaylist)
  const setPlayStatus = useSetRecoilState(usePlaying)
  const deleteSong = (song: SongDetail) => {
    const fpIndex = findIndex(song, playlist)
    setPlaylist(playlist.filter((item) => item.id !== song.id))
    if (fpIndex < currentIndex) setCurrentIndex(currentIndex - 1)
    const fsIndex = findIndex(song, sequencePlaylist)
    setSequencePlaylist(playlist.filter((item) => item.id !== song.id))
  }

  const clearPlaylist = () => {
    setPlaylist([])
    setSequencePlaylist([])
    setCurrentIndex(-1)
    setShowPlaylist(false)
    setCurrentSong(default_current_song)
    setPlayStatus(false)
  }
  return {
    showPlaylist,
    toggleShowPlaylist: setShowPlaylist,
    mode,
    changeMode: setMode,
    currentIndex,
    changeCurrentIndex: setCurrentIndex,
    playlist,
    changePlaylist: setPlaylist,
    currentSong,
    changeCurrentSong: setCurrentSong,
    deleteSong,
  }
}

export default useStore
