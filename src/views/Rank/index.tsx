import React from "react"
import Scroll from "@/components/scroll"
import Loading from "@/components/loading"
import RankList from "./rankList"
import useRankList from "./hooks/useRankList"
import { Container, EnterLoading } from "./style"

const Rank: React.FC = () => {
  const { loading, officalList, globalList } = useRankList()
  let displayStyle: React.CSSProperties = loading
    ? { display: "none" }
    : { display: "" }
  return (
    <Container>
      <Scroll loading={loading}>
        <div>
          <h1 className="offical" style={displayStyle}>
            官方榜
          </h1>
          <RankList list={officalList}></RankList>
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          <RankList list={globalList} global></RankList>
          {loading ? (
            <EnterLoading>
              <Loading loading={true}></Loading>
            </EnterLoading>
          ) : null}
        </div>
      </Scroll>
    </Container>
  )
}

export default Rank
