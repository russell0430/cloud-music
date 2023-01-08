import axios from "axios"
import { axiosInstance } from "./config"

import {
  BannerResponse,
  RankListResponse,
  RecommendResponse,
  SearchOptions,
  SingerListResponse,
  AlbumResponse,
  HotkeyResponse,
  SuggestlistResponse,
  ResultSonglistResponse,
  SongDetailResponse,
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

export const getSingerInfoRequest = (id: string) => {
  return axiosInstance.get<string, Artist>(`/artists?id=${id}`)
}

export const getLyricRequest = (id: number) => {
  return axiosInstance.get<string, Lyric>(`/lyric?id=${id}`)
}

export const getHotKeywordsRequest = () => {
  return axiosInstance.get<string, HotkeyResponse>("/search/hot")
}

export const getSuggestlistRequest = (query: string) => {
  return axiosInstance.get<string, SuggestlistResponse>(
    `/search/suggest?keywords=${query}`
  )
}

export const getResultSonglistRequest = (query: string) => {
  return axiosInstance.get<string, ResultSonglistResponse>(
    `/search?keywords=${query}`
  )
}

export const getSongDetailRequest=(id:number)=>{
  return axiosInstance.get<string,SongDetailResponse>(`/song/detail/ids=${id}`)
}