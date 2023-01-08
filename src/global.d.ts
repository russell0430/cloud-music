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
  id: string
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
  coverImgUrl: string
}

// /recommend/:id album
declare interface Album {
  creator: {
    avatarUrl: string
    nickname: string
  }
  coverImgUrl: string
  subscribedCount: number
  name: string
  tracks: {
    name: string
    id:number
    dt:number
    ar: {
      name: string
    }[]
    al: {
      name: string
    }
  }[]
}

// player
declare interface SongDetail {
  id: number
  dt: number
  name: string
  ar: {
    name: string
  }[]
  al: {
    name?: string
    picUrl?: string
  }
}

// /singers/:id  特定歌手
declare interface Artist {
  artist: { picUrl: string; name: string }
  hotSongs: SongDetail[]
}

declare interface Lyric {
  lrc: { lyric: string }
}

declare interface Hotkey {
  first: string
  second: number
}
