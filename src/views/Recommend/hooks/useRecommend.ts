import * as React from "react"
import { getBannerRequest, getRecommendListRequest } from "@/api/request"

interface Options {
  recommend?: boolean
  banner?: boolean
}
const useRecommendView = (options?: Options) => {
  const { recommend = true, banner = true } = options || {}
  const [bannerList, setBannerList] = React.useState<BannerType[]>([])
  const [recommendList, setRecommendList] = React.useState<RecommendType[]>([])

  React.useEffect(() => {
    if (banner)
      getBannerRequest()
        .then((data) => {        
          setBannerList(data.banners)
        })
        .catch((err) => console.warn("轮播图数据传输错误", err))
  }, [])

  React.useEffect(() => {
    if (recommend)
      getRecommendListRequest()
        .then((data) => {
          console.log(data) 
          setRecommendList(data.result)
        })
        .catch(() => console.warn("推荐歌单数据传输错误"))
  }, [])
  return { bannerList, recommendList }
}

export default useRecommendView
