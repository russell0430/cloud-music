import React, {
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useRef,
  useState,
} from "react"
import { ProgressBarWrapper } from "./style"
interface Touch {
  initiated: boolean
  startX: number
  left: number
}

interface ProgressBarProps {
  percent?: number
  percentChange?: (percent: number) => void
}
const ProgressBar: React.FC<ProgressBarProps> = ({
  percent = 0,
  percentChange = (percent: number) => {},
}) => {
  const progressBar = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const progressBtn = useRef<HTMLDivElement>(null)

  const progressBtnWidth = 4
  const [touch, setTouch] = useState<Touch>({
    initiated: false,
    startX: 0,
    left: 0,
  })

  const _offset = (offsetWidth: number) => {
    progress.current!.style.width = `${offsetWidth}px`
    progressBtn.current!.style.transform = `translate3d(${offsetWidth}px,0,0)`
  }

  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current!.clientWidth - progressBtnWidth
      const offsetWidth = percent * barWidth
      _offset(offsetWidth)
    }
  }, [percent])
  
  const _changePercent = () => {
    const barWidth = progressBar.current!.clientWidth - progressBtnWidth
    const curPercent = progress.current!.clientWidth / barWidth
    percentChange(curPercent)
  }

  const progressTouchstart: TouchEventHandler<HTMLDivElement> = (e) => {
    const startTouch: Touch = {
      initiated: true,
      startX: e.touches[0].pageX,
      left: progress.current?.clientWidth || 0,
    }
    setTouch(startTouch)
  }

  const progressTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (!touch.initiated) return
    const deltaX = e.touches[0].pageX - touch.startX
    const barWidth = progressBar.current!.clientWidth - progressBtnWidth
    const offsetWidth = Math.min(Math.max(4, touch.left + deltaX), barWidth)
    _offset(offsetWidth)
  }
  const progressTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    const endTouch: Touch = JSON.parse(JSON.stringify(touch))
    endTouch.initiated = false
    setTouch(endTouch)
    _changePercent()
  }
  const progressClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = progressBar.current?.getBoundingClientRect()
    const offsetWidth = e.pageX - rect!.left
    _offset(offsetWidth)
    _changePercent()
  }

  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={progressTouchstart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  )
}

export default ProgressBar
