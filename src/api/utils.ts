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
    console.log(RankTypes[key],name)
    if (RankTypes[key] === name) return key;
  }
  return null;
};
