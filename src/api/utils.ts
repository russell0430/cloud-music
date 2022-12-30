import { RankTypes } from "./config"

export const getCount = (count: number) => {
  if (count < 0) return
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万"
  } else {
    return Math.floor(count / 10000000) / 10 + "亿"
  }
}

export const debounce = <T = undefined>(func: Function, delay: number) => {
  let timer: NodeJS.Timeout
  return (...args: T[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// /rank, 将两类排行榜分开
export const filterIndex = (rankList: { tracks: unknown[] }[]) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1
    }
  }
}

// /rank ,找出排行榜编号
export const filterIdx = (name: string) => {
  for (let key in RankTypes) {
    console.log(RankTypes[key], name)
    if (RankTypes[key] === name) return key
  }
  return null
}

export const getName = (list: { name: string }[]) => {
  return list
    .map((item) => item.name)
    .reduce((prev, curr) => {
      return `${prev}/${curr}`
    })
}

export const _getPosAndScale = () => {
  const targetWidth = 40
  const paddingLeft = 40
  const paddingBottom = 30
  const paddingTop = 80
  const width = window.innerWidth * 0.8
  const scale = targetWidth / width
  // 两个圆心的横坐标距离和纵坐标距离
  const x = -(window.innerWidth / 2 - paddingLeft)
  const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
  return {
    x,
    y,
    scale,
  }
}

export const getSongUrl = (id: number) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export const isEmptyObject = (obj: Object) =>
  !obj || Object.keys(obj).length === 0

export const formatPlayTime = (interval: number) => {
  interval = interval | 0 // |0表示向下取整
  const minute = (interval / 60) | 0
  const second = (interval % 60).toString().padStart(2, "0")
  return `${minute}:${second}`
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 随机算法
export function shuffle<T>(arr: T[]) {
  let new_arr = [...arr]
  for (let i = 0; i < new_arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = new_arr[i]
    new_arr[i] = new_arr[j]
    new_arr[j] = t
  }
  return new_arr
}

// 找到当前的歌曲索引
export const findIndex = <T extends { id: number }>(song: T, list: T[]) => {
  return list.findIndex((item) => {
    return song.id === item.id
  })
}
