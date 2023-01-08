import { SuggestlistResponse } from "@/api/types"
import { getName } from "@/api/utils"
import Scroll from "@/components/scroll"
import SearchBox from "@/components/searchBox"
import React, { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import useSearch from "./hooks/useSearch"
import {
  Container,
  ShortcutWrapper,
  Hotkey,
  List,
  ListItem,
  SongItem,
} from "./style"

const Search: React.FC = () => {
  const [show, setShow] = useState(false)

  const [query, setQuery] = useState("")
  const searchBack = useCallback(() => {
    setShow(false)
  }, [])
  const handleQuery = (q: string) => {
    setQuery(q)
  }
  const { getHotKeywords, hotlist, getSuggestlist, suggestlist, songlist } =
    useSearch()
  const navigate = useNavigate()

  useEffect(() => {
    setShow(true)
    getHotKeywords()
  }, [])
  useEffect(() => {
    console.log("search", query)
    if (query !== "") {
      console.log("SS")
      getSuggestlist(query)
    }
  }, [query])
  const renderHotkey = () => {
    let list = hotlist || []
    return (
      <ul>
        {list.map((item) => {
          return (
            <li
              className="item"
              key={item.first}
              onClick={() => setQuery(item.first)}
            >
              <span>{item.first}</span>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderSingers = () => {
    let singers = suggestlist?.artists
    if (!singers || !singers.length) return null
    return (
      <List>
        <h1 className="title">相关歌手</h1>
        {singers.map((item, index) => {
          return (
            <ListItem
              key={`${item.id}`}
              onClick={() => navigate(`/singers/${item.id}`)}
            >
              <div className="img-wrapper">
                <img src={item.picUrl} alt="" />
              </div>
              <span className="name">歌手 :{item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }
  const renderAlbum = () => {
    let albums = suggestlist?.playlists
    if (!albums || !albums.length) return null
    return (
      <List>
        <h1 className="title">相关歌单</h1>
        {albums.map((item, index) => {
          return (
            <ListItem
              key={item.id}
              onClick={() => navigate(`/album/${item.id}`)}
            >
              <div className="img-wrapper">
                <img src={item.coverImgUrl} alt="" height="100%" width="100%" />
              </div>
              <span className="name">歌单: {item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }
  const selectItem = (
    e: React.MouseEvent,
    item: SuggestlistResponse["result"]["songs"][0]
  ) => {
    
  }
  const renderSongs = () => {
    let songs = suggestlist?.songs
    if (!songs || !songs.length) return null
    return (
      <SongItem style={{ paddingLeft: "20px" }}>
        {songs.map((item) => {
          // console.log(item.artists)
          return (
            <li key={item.id}>
              <div className="info" onClick={(e) => selectItem(e, item)}>
                <span>{item.name}</span>
                <span>
                  {item.artists && getName(item?.artists)} - {item.album?.name}
                </span>
              </div>
            </li>
          )
        })}
      </SongItem>
    )
  }
  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear
      classNames="fly"
      ummountOnExit
      onExit={() => {
        navigate(-1)
      }}
    >
      <Container>
        <div className="search-box-wrapper">
          <SearchBox
            back={searchBack}
            newQuery={query}
            handleQuery={handleQuery}
          ></SearchBox>
        </div>
        <ShortcutWrapper show={query === ""}>
          <Scroll direction="vertical">
            <div>
              <Hotkey>
                <h1 className="title">热门搜索</h1>
                {renderHotkey()}
              </Hotkey>
            </div>
          </Scroll>
        </ShortcutWrapper>
        <ShortcutWrapper show={query !== ""}>
          <Scroll direction="vertical">
            <div>
              {renderSingers()}
              {renderAlbum() || null}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
      </Container>
    </CSSTransition>
  )
}

export default Search
