import React from "react"
import { LoadingContainer } from "./style"
const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span> loading...</span>
    </LoadingContainer>
  )
}

export default Loading
