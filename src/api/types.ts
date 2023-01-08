interface BaseResponse {
  code: number
}

// /recommend
export interface BannerResponse extends BaseResponse {
  banners: Banner[]
}

// /recommend
export interface RecommendResponse extends BaseResponse {
  result: Recommend[]
  hasTaste: boolean
  category: number
}

// /singers
export interface SingerListResponse extends BaseResponse {
  artists: Singer[]
}

export interface SearchOptions {
  category: { type: number; area: number }
  alpha: string
  count: number
}

// /rank
export interface RankListResponse extends BaseResponse {
  list: Song[]
}

export interface AlbumResponse extends BaseResponse {
  playlist: Album
}

export interface ArtistResponse extends BaseResponse, Artist {}

export interface LyricResponse extends BaseResponse {
  lyc: Lyric
}

// /search
export interface HotkeyResponse extends BaseResponse {
  result: {
    hots: Hotkey[]
  }
}

interface artist {
  id: number
  name: string
  picUrl: string
}
interface album {
  artists: artist
  id: number
  name: string
}

export interface SuggestlistResponse extends BaseResponse {
  result: {
    albums: album[]
    artists: artist[]
    order: string[]
    playlists: {
      id: number
      name: string
      description: string
      coverImgUrl: string
      artists?: artist[]
      album?: album
    }[]
    songs: { album: album; artists: artist[]; id: number; name: string }[]
  }
}

export interface ResultSonglistResponse extends BaseResponse {
  result: {
    songs: {
      name: string
      id: number
      dt: number
    }[]
  }
}

export interface SongDetailResponse extends BaseResponse {
  
}
