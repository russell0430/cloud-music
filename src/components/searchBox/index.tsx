import { debounce } from "@/api/utils"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SearchBoxWrapper } from "./style"
interface SearchBoxProps {
  newQuery: string
  handleQuery: (query: string) => void
  back(): void
}
const SearchBox: React.FC<SearchBoxProps> = ({
  newQuery,
  handleQuery,
  back,
}) => {
  const queryRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")

  const displayStyle = { display: query ? "block" : "none" }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }

  let handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500)
  }, [handleQuery])
  useEffect(() => {
    handleQueryDebounce(query)
  }, [query])
  useEffect(() => {
    if (newQuery !== query) {
      setQuery(newQuery)
    }
  }, [newQuery])
  const clearQuery = () => {
    setQuery("")
    queryRef.current?.focus()
  }
  useEffect(() => {
    // 进场光标
    queryRef.current?.focus()
  }, [])
  const navigate = useNavigate()
  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => navigate(-1)}>
        &#xe655;
      </i>
      <input
        type="text"
        ref={queryRef}
        value={query}
        onChange={handleChange}
        className="box"
        placeholder="搜索歌曲、歌手、专辑"
      />
      <i className="iconfont-delete" onClick={clearQuery} style={displayStyle}>
        &#xe600;
      </i>
    </SearchBoxWrapper>
  )
}

export default SearchBox
