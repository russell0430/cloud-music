import React from "react"
import { List, ListItem } from "./style"

interface PropsType {
  singerList: {
    picUrl: string
    name: string
    accountId: number
  }[]
}

const SingerList: React.FC<PropsType> = ({ singerList }) => {
  return (
    <List>
      {singerList.map((item, index) => {
        return (
          <ListItem key={`${item.accountId}${index}`}>
            <div className="img-wrapper">
              <img
                src={`${item.picUrl}?param=300*300`}
                width="100%"
                height="100%"
                alt="singer"
              />
            </div>
            <span className="name">{item.name}</span>
          </ListItem>
        )
      })}
    </List>
  )
}

export default SingerList
