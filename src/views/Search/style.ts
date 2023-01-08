import styled from "styled-components"
import style from "@/assets/global-style"

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;

  &.fly-enter,
  &.fly-appear {
    transform: translate3d(100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: all 0.3s;
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: all 0.3s;
    transform: translate3d(100%, 0, 0);
  }
`
interface ShortcutProps {
  show: boolean
}
export const ShortcutWrapper = styled.div<ShortcutProps>`
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
  ${({ show }) => (show ? "" : "display:none;")}
`
export const Hotkey = styled.div`
  margin: 0 20px 20px 20px;
  .title {
    padding-top: 35px;
    margin-bottom: 20px;
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc-v2"]};
  }
  .item {
    display: inline-block;
    padding: 5px 10px;
  }
`

export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin: 10px 0 10px 10px;
    color: ${style["font-color-desc"]};
    font-size: ${style["font-size-s"]};
  }
`
export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  padding: 5px 0;
  align-items: center;
  border-bottom: 1px solid ${style["border-color"]};
  .img-wrapper {
    margin-right: 20px;
    img {
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name {
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc"]};
    font-weight: 500;
  }
`

export const SongItem = styled.div`
  > li {
    display: flex;
    height: 60px;
    align-items: center;
    .index {
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: 5px 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid ${style["border-color"]};
      > span:first-child {
        color: ${style["font-color-desc"]};
      }
      > span:last-child {
        color: #bba8a8;
        font-size: ${style["font-size-s"]};
      }
    }
  }
`
