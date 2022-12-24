import styled from "styled-components"
import style from "@/assets/global-style"

interface ContainerProps {
  play: number
}
export const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  bottom: ${({ play }) => (play > 0 ? "60px" : 0)};
  left: 0;
  right: 0;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;

  &.fly-enter,
  &.fly-appear {
    transform: rotateZ (30deg) translate3d (100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: transform 0.3s;
    transform: rotateZ (0deg) translate3d (0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ (0deg) translate3d (0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform 0.3s;
    transform: rotateZ (30deg) translate3d (100%, 0, 0);
  }
`
export const Header = styled.div``
export const ImgWrapper = styled.div``

export const CollectButton = styled.div``

export const BGLayer = styled.div``

export const SongListWrapper = styled.div``
