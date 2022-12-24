import React from "react"

interface HeaderProps {
  title: string
  handleClick?: () => void
}
const Header: React.FC<React.PropsWithChildren<HeaderProps>> = ({
  title,
  handleClick,
}) => {
  return <div>Header</div>
}

export default Header
