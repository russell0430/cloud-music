import axios from "axios"
import { type } from "os"

export const baseURL = "http://localhost:3000"

const axiosInstance = axios.create({
  baseURL,
})

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.warn(err, "network error")
  }
)

type Category = {
  name: string
  key: {
    type: number
    area: number
  }
}

// 歌手种类
const categories: Category[] = [
  {
    name: "华语男",
    key: {
      type: 1,
      area: 7,
    },
  },
  {
    name: "华语女",
    key: {
      type: 2,
      area: 7,
    },
  },
  {
    name: "华语组合",
    key: {
      type: 3,
      area: 7,
    },
  },
  {
    name: "欧美男",
    key: {
      type: 1,
      area: 96,
    },
  },
  {
    name: "欧美女",
    key: {
      type: 2,
      area: 96,
    },
  },
  {
    name: "欧美组合",
    key: {
      type: 3,
      area: 96,
    },
  },
  {
    name: "日本男",
    key: {
      type: 1,
      area: 8,
    },
  },
  {
    name: "日本女",
    key: {
      type: 2,
      area: 8,
    },
  },
  {
    name: "日本组合",
    key: {
      type: 3,
      area: 8,
    },
  },
  {
    name: "韩国男",
    key: {
      type: 1,
      area: 16,
    },
  },
  {
    name: "韩国女",
    key: {
      type: 2,
      area: 16,
    },
  },
  {
    name: "韩国组合",
    key: {
      type: 3,
      area: 16,
    },
  },
  {
    name: "其他男歌手",
    key: {
      type: 1,
      area: 0,
    },
  },
  {
    name: "其他女歌手",
    key: {
      type: 2,
      area: 0,
    },
  },
  {
    name: "其他组合",
    key: {
      type: 3,
      area: 0,
    },
  },
]
// 首字母
type Alpha = { key: string; name: string }
const alphas: Alpha[] = [
  {
    key: "A",
    name: "A",
  },
  {
    key: "B",
    name: "B",
  },
  {
    key: "C",
    name: "C",
  },
  {
    key: "D",
    name: "D",
  },
  {
    key: "E",
    name: "E",
  },
  {
    key: "F",
    name: "F",
  },
  {
    key: "G",
    name: "G",
  },
  {
    key: "H",
    name: "H",
  },
  {
    key: "I",
    name: "I",
  },
  {
    key: "J",
    name: "J",
  },
  {
    key: "K",
    name: "K",
  },
  {
    key: "L",
    name: "L",
  },
  {
    key: "M",
    name: "M",
  },
  {
    key: "N",
    name: "N",
  },
  {
    key: "O",
    name: "O",
  },
  {
    key: "P",
    name: "P",
  },
  {
    key: "Q",
    name: "Q",
  },
  {
    key: "R",
    name: "R",
  },
  {
    key: "S",
    name: "S",
  },
  {
    key: "T",
    name: "T",
  },
  {
    key: "U",
    name: "U",
  },
  {
    key: "V",
    name: "V",
  },
  {
    key: "W",
    name: "W",
  },
  {
    key: "X",
    name: "X",
  },
  {
    key: "Y",
    name: "Y",
  },
  {
    key: "Z",
    name: "Z",
  },
]

//排行榜编号
const RankTypes = {
  "0": "云音乐新歌榜",
  "1": "云音乐热歌榜",
  "2": "网易原创歌曲榜",
  "3": "云音乐飙升榜",
  "4": "云音乐国电榜",
  "5": "UK排行榜周榜",
  "6": "美国Billboard周榜",
  "7": "KTV唛榜",
  "8": "iTunes榜",
  "9": "Hit FM Top榜",
  "10": "日本Oricon周榜",
  "11": "韩国Melon排行榜周榜",
  "12": "韩国Mnet排行榜周榜",
  "13": "韩国Melon原声周榜",
  "14": "中国TOP排行榜（港台榜）",
  "15": "中国TOP排行榜（内地榜）",
  "16": "香港电台中文歌曲龙虎榜",
  "17": "华语金曲榜",
  "18": "中国嘻哈榜",
  "19": "法国 NRJ Vos Hits 周榜",
  "20": "台湾Hito排行榜",
  "21": "Beatport全球电子舞曲榜",
  "22": "云音乐ACG音乐榜",
  "23": "江小白YOLO云音乐说唱榜",
}

export { axiosInstance, categories, alphas, RankTypes }
export type { Category, Alpha }

export const HEADER_HEIGHT = 80

export enum playMode {
  sequence,
  single,
  random,
}
