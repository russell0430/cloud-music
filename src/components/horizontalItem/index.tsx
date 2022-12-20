import React, { useEffect, useRef } from "react"
import Scroll from "@/components/scroll"
import { List, ListItem } from "./style"
interface PropsType {
  list?: { key: any; name: string }[]
  oldVal?: any
  title?: string
  handleClick?(key: any): void
}
const Horizon: React.FC<PropsType> = ({
  list = [],
  oldVal = "",
  title = "",
  handleClick = (para: string) => {},
}) => {
  const divRef = useRef<HTMLDivElement | null>(null)

  // 计算横向宽度刷新Bscroll
  // !TODO
  // 也可以在List中加入 width:fit-content
  useEffect(() => {
    let dom = divRef.current
    let tagElems = dom?.querySelectorAll("span")
    let totalWidth = Array.from(tagElems || []).reduce(
      (tot, ele) => tot + ele.offsetWidth,
      0
    )
    dom!.style.width = `${totalWidth}px`
  }, [])

  return (
    <Scroll direction="horizontal">
      <div ref={divRef}>
        <List>
          <span>{title}</span>
          {list.map((item) => {
            return (
              <ListItem
                key={`${item.key}{${item.name}}`}
                className={`${oldVal === item.key ? "selected" : ""}`}
                onClick={() => handleClick(item.key)}
              >
                {item.name}
              </ListItem>
            )
          })}
        </List>
      </div>
    </Scroll>
  )
}

export default Horizon
