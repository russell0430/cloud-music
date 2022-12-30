import React from "react"
interface ConfirmProps {
  text: string
  cancelBtnText: string
  confirmBtnText: string
  handleConfirm: () => void
}
export interface ConfirmHandler {
  show(): void
}
const Confirm: React.ForwardRefRenderFunction<ConfirmHandler, ConfirmProps> = (
  {},
  ref
) => {
  return <div>Confirm</div>
}

export default React.forwardRef(Confirm)
