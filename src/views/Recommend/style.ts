import styled from "styled-components"
import style from "@/assets/global-style"

export const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;

  .before {
    position: absolute;
    width: 100%;
    height: 100px;
    background: ${style["theme-color"]};
  }
`
