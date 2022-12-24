import * as React from "react"
import { getRankListRequest } from "@/api/request"
import { filterIndex } from "@/api/utils"
const useRankList = () => {
  const [loading, setLoading] = React.useState(false)
  const [officalList, setOfficalList] = React.useState<Song[]>([])
  const [globalList, setGlobalList] = React.useState<Song[]>([])
  React.useEffect(() => {
    setLoading(true)
    getRankListRequest()
      .then((res) => {
        console.log(res)
        // let globalStartIndex = filterIndex(res.list)
        // setOfficalList(res.list.slice(0, globalStartIndex))
        // setGlobalList(res.list.slice(globalStartIndex))
      })
      .catch((err) => {
        console.warn("get rank list error ",err)
      })
      .finally(() => setLoading(false))
  }, [])
  return { loading, officalList, globalList }
}
export default useRankList
