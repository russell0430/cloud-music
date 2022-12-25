import {
  forwardRef,
  useState,
  useEffect,
  useRef,
  PropsWithChildren,
  useImperativeHandle,
  ForwardRefRenderFunction,
  useMemo,
} from "react"
import Loading from "@/components/loading"
import LoadingV2 from "@/components/loading@2"
import { debounce } from "@/api/utils"
import BScroll from "better-scroll"
import { ScrollContainer, PullUpLoading, PullDownLoading } from "./style"

type CallbackFunction = () => void

interface PropsType {
  pullUp?: CallbackFunction
  pullDown?: CallbackFunction
  onScroll?: (pos: { x: number; y: number }) => void
  direction: "horizontal" | "vertical"
  click?: boolean
  refresh?: boolean
  bounceTop?: boolean
  bounceBottom?: boolean

  className?: string

  pullUpLoading?: boolean
  pullDownLoading?: boolean

  loading?: boolean
}

export interface ScrollHandler {
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
    direction = "horizontal",
    click = true,
    refresh = true,
    bounceTop = true,
    bounceBottom = true,
    children,
    className,
    pullUpLoading,
    pullDownLoading,

    loading = false,
  },
  ref
) => {
  const [bScroll, setBScroll] = useState<any>()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scroll = new BScroll(scrollContainerRef.current, {
        scrollX: direction === "horizontal",
        scrollY: direction === "vertical",
        probeType: 3,
        click,
        bounce: {
          top: bounceTop,
          bottom: bounceBottom,
        },
        mouseWheel: true,
        disableMouse: false,
        disableTouch: false,
      })
      setBScroll(scroll)
    } else {
      console.log("no current")
    }
  }, [])

  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on("scroll", (scroll: { x: number; y: number }) => {
      onScroll(scroll)
    })
    return () => bScroll.off("scroll")
  }, [onScroll, bScroll])

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getBScroll() {
      return bScroll
    },
  }))

  // 加载后出发resize事件
  // 防止首次加载图片占位时不能滚动
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
    }, 0)
  }, [loading])

  // pull up and pull down
  const PullUpdisplayStyle: React.CSSProperties = pullUpLoading
    ? { display: "" }
    : { display: "none" }
  const PullDowndisplayStyle: React.CSSProperties = pullDownLoading
    ? { display: "" }
    : { display: "none" }

  const pullUpDebounce = useMemo(() => {
    return pullUp ? debounce(pullUp, 300) : null
  }, [pullUp])

  const pullDownDebounce = useMemo(() => {
    return pullDown ? debounce(pullDown, 300) : null
  }, [pullDown])

  useEffect(() => {
    if (!bScroll || !pullUpDebounce) return
    bScroll.on("scrollEnd", () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    })
    return () => bScroll.off("scrollEnd")
  }, [pullUpDebounce, bScroll])

  useEffect(() => {
    if (!bScroll || !pullDownDebounce) return
    bScroll.on("touchEnd", (pos: { x: number; y: number }) => {
      if (pos.y > 50) {
        pullDownDebounce()
      }
    })
    return () => bScroll.off("touchEnd")
  }, [pullDownDebounce, bScroll])

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {children}
      <PullUpLoading style={PullUpdisplayStyle}>
        <Loading loading />
      </PullUpLoading>
      <PullDownLoading style={PullDowndisplayStyle}>
        <LoadingV2 />
      </PullDownLoading>
    </ScrollContainer>
  )
}

export default forwardRef(Scroll)
