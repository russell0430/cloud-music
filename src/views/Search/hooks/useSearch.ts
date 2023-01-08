import * as React from "react"
import {
  getHotKeywordsRequest,
  getResultSonglistRequest,
  getSuggestlistRequest,
} from "@/api/request"
import { SuggestlistResponse, ResultSonglistResponse } from "@/api/types"
const useSearch = () => {
  const [hotlist, setHotlist] = React.useState<Hotkey[]>([])
  const [suggestlist, setSuggestlist] =
    React.useState<SuggestlistResponse["result"]>()
  const [songlist, setSonglist] =
    React.useState<ResultSonglistResponse["result"]["songs"]>()
  const [enterLoading, setEnterLoading] = React.useState(false)
  const getHotKeywords = () => {
    getHotKeywordsRequest().then((res) => {
      console.log(res)
      let list = res.result.hots
      setHotlist(list)
    })
  }
  const getSuggestlist = (query: string) => {
    getSuggestlistRequest(query).then((res) => {
      console.log(res)
      if (!res) return
      let data = res.result || []
      setSuggestlist(data)
    })
    getResultSonglistRequest(query).then((res) => {
      console.log(res)
      if (!res) return
      let data = res.result.songs || []
      setSonglist(data)
      setEnterLoading(false)
    })
  }

  return {
    hotlist,
    suggestlist,
    songlist,
    enterLoading,
    getHotKeywords,
    getSuggestlist,
  }
}

export default useSearch
