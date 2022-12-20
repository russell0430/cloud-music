import React from "react"

import style from "@/assets/global-style"
import { LoadingWrapper } from "./style"
interface PropsType {
  loading: boolean
}
const Loading: React.FC<PropsType> = ({ loading }) => {
  if (!loading) return null
  return (
    <LoadingWrapper>
      <div></div>
      <div></div>
    </LoadingWrapper>
  )
}

export default Loading
