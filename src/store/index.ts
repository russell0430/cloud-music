import { atom } from "recoil"
import {
  FULL_SCREEN,
  PLAYING,
  SEQUENCEP_PLAYLIST,
  MODE,
  CURRENT_INDEX,
  CURRENT_SONG,
  SHOW_PLAYLIST,
  PLAYLIST,
  default_current_song,
} from "./constans"
import { playMode } from "@/api/config"

const useFullScreen = atom({
  default: false,
  key: FULL_SCREEN,
})

const usePlaying = atom({
  default: false,
  key: PLAYING,
})
const useSequencePlaylist = atom<SongDetail[]>({
  default: [],
  key: SEQUENCEP_PLAYLIST,
})

const useMode = atom<playMode>({
  default: playMode.sequence,
  key: MODE,
})

const useCurrentIndex = atom({
  default: -1,
  key: CURRENT_INDEX,
})

const useShowPlaylist = atom({
  default: false,
  key: SHOW_PLAYLIST,
})

const useCurrentSong = atom<SongDetail>({
  default: default_current_song,
  key: CURRENT_SONG,
})

const usePlaylist = atom<SongDetail[]>({
  default: [],
  key: PLAYLIST,
})
export {
  useFullScreen,
  useMode,
  usePlaying,
  useSequencePlaylist,
  useShowPlaylist,
  useCurrentIndex,
  useCurrentSong,
  usePlaylist,
}
