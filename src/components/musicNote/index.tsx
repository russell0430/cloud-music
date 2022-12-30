import React, { useEffect, useImperativeHandle, useRef } from "react"

import { Container } from "./style"
export interface MusicNoteHandler {
  startAnimation({ x, y }: { x: number; y: number }): void
}
interface AnimationNode extends HTMLBaseElement {
  running?: boolean
}

interface MusicNoteProps {}

const MusicNote: React.ForwardRefRenderFunction<MusicNoteProps> = ({}, ref) => {
  const iconsRef = useRef<HTMLDivElement>(null)
  const ICON_NUMBER = 3

  const createNode = (txt: string) => {
    const template = `<div class="icon-wrapper">${txt}</div>`
    let tempNode = document.createElement("div")

    tempNode.innerHTML = template
    return tempNode.firstChild as Node
  }

  useEffect(() => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      let node = createNode(`<div class="iconfont">&#xe642;</div>`)
      iconsRef.current?.appendChild(node)
    }

    let domArray = [].slice.call(iconsRef.current?.children) as AnimationNode[]
    domArray.forEach((item) => {
      item.running = false
      item.addEventListener("transitionend", () => {
        item.style ['display'] = 'none';
        item.style ['transform'] = `translate3d(0, 0, 0)`;
        item.running = false;

        let icon = item.querySelector('div');
        icon!.style['transform'] = `translate3d(0, 0, 0)`;
      })
    })
  }, [])

  const startAnimation = ({ x, y }: { x: number; y: number }) => {
    console.log("start")
    for (let i = 0; i < ICON_NUMBER; i++) {
      let domArray = [].slice.call(
        iconsRef.current?.children
      ) as AnimationNode[]
      let item = domArray[i]
      if (item.running === false) {
        console.log("running")
        item.style.left = `${x}px`
        item.style.top = `${y}px`
        item.style.display = "inline-block"
        setTimeout(() => {
          item.running = true
          item.style["transform"] = `translate3d(0,750px,0)`
          let icon = item.querySelector("div")
          icon!.style["transform"] = `translate3d(-40px,0,0)`
        })
        break
      }
    }
  }
  useImperativeHandle(ref, () => ({
    startAnimation,
  }))
  return <Container ref={iconsRef}></Container>
}

export default React.forwardRef(MusicNote)
