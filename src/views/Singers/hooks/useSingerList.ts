import * as React from "react"
import { getHotSingerListRequest, getSingerListRequest } from "@/api/request"
import type { Category, Alpha } from "@/api/config"
interface Options {
  alpha: Alpha["key"]
  category: Category["key"]
}


const useSingerList = ({
  alpha: initialAlpha,
  category: initialCategory,
}: Options) => {
  // 使用基础类型可以防止 object 类型地址变化引起更新
  const [options, setOptions] = React.useState({
    alpha: initialAlpha,
    category: initialCategory,
  })
  const [count, setCount] = React.useState(0)
  const [singerList, setSingerList] = React.useState<Singer[]>([])

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    // 改变搜索参数时,列表更新.
    // 新列表开始从0计数
    setCount(0)
  }, [options.category, options.alpha])

  React.useEffect(() => {
    setLoading(true)
    getSingerListRequest({ ...options, count })
      .then((res) => {
        setSingerList((prev) => {
          return count === 0 ? res.artists : [...prev, ...res.artists]
        })
      })
      .catch((err) => {
        console.warn("update singer list error", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [count, options])

  const changeCategoryOrAlpha = (options: {
    alpha?: string
    category?: { type: number; area: number }
  }) => {
    setOptions((prev) => ({ ...prev, ...options }))
  }

  const refreshMoreSingerList = () => {
    console.log("refresh")
    setCount((prev) => prev + 1)
  }
  return { loading, singerList, refreshMoreSingerList, changeCategoryOrAlpha }
}

export default useSingerList
