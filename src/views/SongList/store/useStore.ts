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
  const setCurrenIndex = useSetRecoilState(useCurrentIndex)
  const setPlaylist = useSetRecoilState(usePlaylist)
  const setSequencePlaylist = useSetRecoilState(useSequencePlaylist)

  return {
    changePlaylist: setPlaylist,
    changeSequencePlaylist: setSequencePlaylist,
    changeCurrentIndex: setCurrenIndex,
  }
}
export default useStore
