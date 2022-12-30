const FULL_SCREEN = "full screen"
const PLAYING = "playing"
const SEQUENCEP_PLAYLIST = "sequence playlist"
const MODE = "mode"
const CURRENT_SONG = "current song"
const default_current_song = {
  ftype: 0,
  djId: 0,
  a: null,
  cd: "01",
  copyright: 0,
  al: {
    id: 0,
    name: "",
    picUrl: "",
    pic_str: "109951164627180052",
    pic: 109951164627180050,
  },
  name: "",
  mst: 9,
  dt: 234947,
  ar: [
    {
      id: -1,
      name: "",
      tns: [],
      alias: [],
    },
  ],
  id: -1,
}
const CURRENT_INDEX = "curent index"
const SHOW_PLAYLIST = "show playlist"
const PLAYLIST = "playlist"
export {
  FULL_SCREEN,
  PLAYING,
  SEQUENCEP_PLAYLIST,
  MODE,
  CURRENT_INDEX,
  CURRENT_SONG,
  default_current_song,
  SHOW_PLAYLIST,
  PLAYLIST,
}
