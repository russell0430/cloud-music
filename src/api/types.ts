interface BaseResponse {
  code: number
}

// /recommend
export interface BannerResponse extends BaseResponse {
  banners: Banner[]
}

// /recommend
export interface RecommendRespone extends BaseResponse {
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
