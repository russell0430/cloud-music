import React, { useState } from "react"
import { useParams, useNavigate, Outlet } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import { Container } from "./style"

const artist = {
  picUrl:
    "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
  name: "薛之谦",
  hotSongs: [
    {
      name: "我好像在哪见过你",
      ar: [{ name: "薛之谦" }],
      al: {
        name: "薛之谦专辑",
      },
    },
    {
      name: "我好像在哪见过你",
      ar: [{ name: "薛之谦" }],
      al: {
        name: "薛之谦专辑",
      },
    },
    // 省略 20 条
  ],
}

const Singer: React.FC = () => {
  const { id } = useParams()
  if (!id) {
    throw new Error("router error! No specific singer choosen")
  }
  const navigate = useNavigate()

  console.log("hello")
  const [showStatus, setShowStatus] = useState(true)
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      unmountOnExit
      onExit={() => navigate(-1)}
    >
      <Container play={0}></Container>
    </CSSTransition>
  )
}

export default Singer
