import { axiosInstance } from "./config"

interface BaseResponse{
  code:number
}
interface BannerResponse {
  banners: BannerType[]
}

export const getBannerRequest = () => {
  return axiosInstance.get<string, BannerResponse&BaseResponse>("/banner")
}

interface RecommendRespone {
  result: RecommendType[]
  hasTaste:boolean
  category:number
}
export const getRecommendListRequest = () => {
  return axiosInstance.get<string, RecommendRespone&BaseResponse>("/personalized")
}
