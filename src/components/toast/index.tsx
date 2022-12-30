import React, { useImperativeHandle, useState } from "react"
import { CSSTransition } from "react-transition-group"
import { ToastWrapper } from "./style"
export interface ToastHandler {
  show(): void
}
interface ToastProps {
  text: string
}
const Toast: React.ForwardRefRenderFunction<ToastHandler, ToastProps> = (
  { text },
  ref
) => {
  const [show, setShow] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  useImperativeHandle(ref, () => ({
    show() {
      if (timer) {
        clearTimeout(timer)
      }
      setShow(true)
      setTimer(
        setTimeout(() => {
          setShow(false)
        }, 3000)
      )
    },
  }))

  return (
    <CSSTransition in={show} timeout={300} classNames="drop" unmountOnExit>
      <ToastWrapper>
        <div className="text">{text}</div>
      </ToastWrapper>
    </CSSTransition>
  )
}

export default React.forwardRef(Toast)
