import React, { ForwardRefRenderFunction } from "react"
import { SongListContainer, SongItem } from "./style"
import { getCount, getName } from "@/api/utils"
import useStore from "./store/useStore"
interface SongListProps {
  collectCount: number
  showCollect: boolean
  showBackground: boolean
  songs: SongDetail[]
  musicAnimation?: (pos: { x: number; y: number }) => void
}

const SongList: ForwardRefRenderFunction<HTMLDivElement, SongListProps> = (
  { collectCount, showCollect, showBackground, songs, musicAnimation },
  ref
) => {
  const totalCount = songs.length
  const { changePlaylist, changeSequencePlaylist, changeCurrentIndex } =
    useStore()

  const selectItem = (e: React.MouseEvent, index: number) => {
    changePlaylist(songs)
    changeSequencePlaylist(songs)
    changeCurrentIndex(index)
    if (musicAnimation)
      musicAnimation({ x: e.nativeEvent.clientX, y: e.nativeEvent.clientY })
    console.log(index)
  }
  const songList = (list: SongDetail[]) => {
    console.log(list)
    return list.map((item, index) => {
      return (
        <li key={`${item.id}${index}`} onClick={(e) => selectItem(e, index)}>
          <span className="index">{index + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {getName(item.ar)} - {item.al.name}
            </span>
          </div>
        </li>
      )
    })
  }

  const collect = (count: number) => {
    return (
      <div className="add-list">
        <i className="iconfont">&#xe62d;</i>
        <span>收藏({getCount(count)})</span>
      </div>
    )
  }
  return (
    <SongListContainer ref={ref} showBackground={showBackground}>
      <div className="first-line">
        <div
          className="play-all"
          onClick={(e) => {
            selectItem(e, 0)
          }}
        >
          <i className="iconfont">&#xe6e3;</i>
          <span>
            播放全部 <span className="sum">(共 {totalCount} 首)</span>
          </span>
        </div>
        {showCollect ? collect(collectCount) : null}
      </div>
      <SongItem>{songList(songs)}</SongItem>
    </SongListContainer>
  )
}
export default React.forwardRef(SongList)
