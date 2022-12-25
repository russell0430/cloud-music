import styled from "styled-components"
import style from "@/assets/global-style"

interface ContainerProps {
  play: number
}
export const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${(props) => (props.play > 0 ? "60px" : 0)};
  width: 100%;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;

  &.fly-enter,
  &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: transform 0.3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform 0.3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`
export const Header = styled.div``

interface ImgWrapperProps {
  bgUrl: string
}
export const ImgWrapper = styled.div<ImgWrapperProps>`
  position: relative;
  width: 100%;
  height: 0px;
  padding-top: 75%;
  transform-origin: top;
  background: url(${(props) => props.bgUrl});
  background-size: cover;
  z-index: 50;

  .filter {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(7, 17, 27, 0.3);
  }
`

export const CollectButton = styled.div`
  z-index: 100;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  margin-top: -55px;
  z-index: 50;
  background-color: ${style["theme-color"]};
  color: ${style["font-color-light"]};
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  font-size: 0;
  .iconfont {
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
    vertical-align: 1px;
  }
  .text {
    display: inline-block;
    font-size: 14px;
    letter-spacing: 5px;
  }
`

export const BgLayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  z-index: 50;
`

export const SongListWrapper = styled.div`
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  > div {
    position: absolute;
    left: 0;
    width: 100%;
    overflow: visible;
  }
`
