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

  const [loading, setLoading] = React.useState<boolean>(false)
  const [bannerLoading, setBannerLoading] = React.useState<boolean>(false)
  const [recommendLoading, setRecommendLoading] = React.useState<boolean>(false)
  React.useEffect(() => {
    if (banner) {
      setBannerLoading(true)
      getBannerRequest()
        .then((data) => {
          setBannerList(data.banners)
          setBannerLoading(false)
        })
        .catch((err) => console.warn("轮播图数据传输错误", err))
    }
  }, [])

  React.useEffect(() => {
    if (recommend) {
      setRecommendLoading(true)
      getRecommendListRequest()
        .then((data) => {
          setRecommendList(data.result)
          setRecommendLoading(false)
        })
        .catch(() => console.warn("推荐歌单数据传输错误"))
    }
  }, [])

  React.useEffect(() => {
    setLoading((recommend && recommendLoading) || (banner && bannerLoading))
  }, [bannerLoading, recommendLoading])
  return { bannerList, recommendList, loading }
}

export default useRecommendView
