import React from "react"
import Slider from "@/components/slider"
import RecommendList from "@/components/recommendList"
import Scroll from "@/components/Scroll"
import useRecommendView from "./hooks/useRecommend"
import { Content } from "./style"
// mock data
const bannerList: BannerType[] = [1, 2, 3, 4].map((item) => {
  return {
    imageUrl:
      "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg",
  }
})
const recommendList: RecommendType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
  (i) => {
    return {
      id: 1,
      picUrl:
        "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
      playCount: 17171122,
      name: "朴树、许巍、李健、郑钧、老狼、赵雷",
    }
  }
)

const Recommend: React.FC = () => {
  const { bannerList, recommendList } = useRecommendView()
  return (
    <Content>
      <div className="before"></div>
      <Scroll className="list" direction="vertical">
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
    </Content>
  )
}

export default Recommend
