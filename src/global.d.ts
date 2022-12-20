// /recommend 下面的推荐
declare interface Recommend {
  id: number
  picUrl: string
  playCount: number
  name: string
}

// /recommend 上面的轮播图
declare interface Banner {
  imageUrl: string
}

// /singer 内的歌手
declare interface Singer {
  picUrl: string
  name: string
  accountId: number
}

// /rank 内的歌曲
declare interface Song {
  tracks: string[]
  first: string
  second: string
  coverImgId: number
  name: string
  updateFrequency: string
  coverImgUrl:string
}
