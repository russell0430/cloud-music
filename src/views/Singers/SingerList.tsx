import React from "react"
import { useNavigate } from "react-router-dom"
import { List, ListItem } from "./style"

interface PropsType {
  singerList: Singer[]
}

const SingerList: React.FC<PropsType> = ({ singerList }) => {
  const navigate = useNavigate()
  return (
    <List>
      {singerList.map((item, index) => {
        return (
          <ListItem
            key={`${item.accountId}${index}`}
            onClick={() => navigate(`/singers/${item.id}`)}
          >
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
