import styled from "styled-components"
import style from "@/assets/global-style"

export const Container = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;

  .offical,
  .global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc"]};
  }
  .info {
    padding: 20px;
    border-radius: 10px;
    background-color: aquamarine;
    margin:40px;
    display: block;
    color: red;
    text-align: center;
  }
`

export const List = styled.ul<{ globalRank: boolean }>`
  margin-top: 10px;
  padding: 0 5px;
  display: ${({ globalRank }) => (globalRank ? "flex" : "")};
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  background: ${style["background-color"]};
  &::after {
    content: "";
    display: block;
    width: 32vw;
  }
`
export const ListItem = styled.li<{ tracks: string[] }>`
  display: ${({ tracks }) => (tracks.length ? "flex" : "")};
  padding: 3px 0;
  border-bottom: 1px solid ${style["border-color"]};
  .img-wrapper {
    width: ${({ tracks }) => (tracks.length ? "27vw" : "32vw")};
    height: ${({ tracks }) => (tracks.length ? "27vw" : "32vw")};

    border-radius: 3px;
    position: relative;

    .decorate {
      position: absolute;
      bottom: 0;
      height: 35px;
      width: 100%;
      border-radius: 3px;
      background: linear-gradient
        (hsla (0, 0%, 100%, 0), hsla (0, 0%, 43%, 0.4));
    }

    img {
      height: 100%;
      width: 100%;
      border-radius: 3px;
    }

    .udpate-frequency {
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${style["font-size-ss"]};
      color: ${style["font-color-light"]};
    }
  }
`

export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  > li {
    font-size: ${style["font-size-s"]};
    color: gray;
  }
`

export const EnterLoading = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  margin: auto;
`
