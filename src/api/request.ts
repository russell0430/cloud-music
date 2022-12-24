import { axiosInstance } from "./config"

import type {
  BannerResponse,
  RankListResponse,
  RecommendResponse,
  SearchOptions,
  SingerListResponse,
  AlbumResponse,
} from "./types"

export const getBannerRequest = () => {
  return axiosInstance.get<string, BannerResponse>("/banner")
}

export const getRecommendListRequest = () => {
  return axiosInstance.get<string, RecommendResponse>("/personalized")
}

export const getHotSingerListRequest = (count: number) => {
  return axiosInstance.get<string, SingerListResponse>(
    `/top/artists?offset=${count}`
  )
}

export const getSingerListRequest = ({
  category,
  alpha,
  count,
}: SearchOptions) => {
  const { type, area } = category
  return axiosInstance.get<string, SingerListResponse>(
    `/artist/list?area=${area}&type=${type}&initial=${alpha.toLowerCase()}&offset=${count}`
  )
}

export const getRankListRequest = () => {
  return axiosInstance.get<string, RankListResponse>(
    "/top/playlist/highquality?limit=20&order=hot"
  )
}

export const getAlbumDetailRequest = (id: string) => {
  return axiosInstance.get<string, AlbumResponse>(`/playlist/detail?id=${id}`)
}
