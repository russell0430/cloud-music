import React from "react"
import Slider from "@/components/slider"
import RecommendList from "@/components/recommendList"
import Scroll from "@/components/scroll"
import Loading from "@/components/loading"
import useRecommendView from "./hooks/useRecommend"
import { Content } from "./style"
import { Outlet } from "react-router-dom"


const Recommend: React.FC = () => {
  const { bannerList, recommendList, loading } = useRecommendView()
  return (
    <Content>
      <div className="before"></div>
      <Scroll className="list" direction="vertical" loading={loading}>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      <Loading loading={loading} />
      <Outlet />
    </Content>
  )
}

export default Recommend
