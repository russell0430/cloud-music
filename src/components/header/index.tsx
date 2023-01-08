import React from "react"
import { HeaderContainer } from "./style"
interface HeaderProps {
  title: string
  isMarquee: boolean
  handleClick?: () => void
}
const Header: React.ForwardRefRenderFunction<
  HTMLDivElement,
  React.PropsWithChildren<HeaderProps>
> = ({ title, handleClick, isMarquee }, ref) => {
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back">&#xe655;</i>
      {isMarquee ? (
        <div className="marquee">
          <h1>{title}</h1>
        </div>
      ) : (
        <h1>{title}</h1>
      )}
    </HeaderContainer>
  )
}

export default React.forwardRef(Header)
