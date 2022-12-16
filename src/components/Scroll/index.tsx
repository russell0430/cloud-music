import {
  forwardRef,
  useState,
  useEffect,
  useRef,
  PropsWithChildren,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from "react"
import BScroll from "better-scroll"
import { ScrollContainer } from "./style"

type CallbackFunction = () => void

interface PropsType {
  pullUp?: CallbackFunction
  pullDown?: CallbackFunction
  onScroll?: CallbackFunction

  direction?: "horizental" | "vertical"
  click?: boolean
  refresh?: boolean
  bounceTop?: boolean
  bounceBottom?: boolean

  className?: string
}

interface ScrollHandler {
  refresh(): void
  getBScroll(): any
}

// component
const Scroll: ForwardRefRenderFunction<
  ScrollHandler,
  PropsWithChildren<PropsType>
> = (
  {
    pullUp,
    pullDown,
    onScroll,
    direction = "horizental",
    click = true,
    refresh = true,
    bounceTop = true,
    bounceBottom = true,
    children,
    className,
  },
  ref
) => {
  const [bScroll, setBScroll] = useState<any>()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (scrollContainerRef.current) {
      const sroll = new BScroll(scrollContainerRef.current, {
        scrollX: direction === "horizental",
        scrollY: direction === "vertical",
        probeType: 3,
        click,
        bounce: {
          top: bounceTop,
          bottom: bounceBottom,
        },
        mouseWheel: true,
      })

      return () => {
        setBScroll(null)
      }
    } else {
      console.log("no current")
    }
  }, [])

  useEffect(() => {
    if (bScroll || !onScroll) return
    bScroll.on("scroll", (scroll) => {
      onScroll(scroll)
    })
    return () => bScroll.off("scroll")
  }, [onScroll, bScroll])

  useEffect(() => {
    if (!bScroll || !pullUp) return
    bScroll.on("scrollEnd", () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp()
      }
    })
    return () => bScroll.off("scrollEnd")
  }, [pullUp, bScroll])

  useEffect(() => {
    if (!bScroll || !pullDown) return
    bScroll.on("touchEnd", (pos) => {
      if (pos.y > 50) {
        pullDown()
      }
    })
    return () => bScroll.off("touchEnd")
  }, [pullDown, bScroll])

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.srcollTo(0, 0)
      }
    },
    getBScroll() {
      return bScroll
    },
  }))

  return <ScrollContainer ref={scrollContainerRef}>{children}</ScrollContainer>
}

export default forwardRef(Scroll)
