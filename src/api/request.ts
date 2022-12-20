import { axiosInstance } from "./config"

import type {
  BannerResponse,
  RankListResponse,
  RecommendRespone,
  SearchOptions,
  SingerListResponse,
} from "./types"

export const getBannerRequest = () => {
  return axiosInstance.get<string, BannerResponse>("/banner")
}

export const getRecommendListRequest = () => {
  return axiosInstance.get<string, RecommendRespone>("/personalized")
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
  return axiosInstance.get<string, RankListResponse>("/toplist/detail")
}
