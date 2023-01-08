import * as React from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { playMode } from "@/api/config"
const ModeNum = 3
const useMode = () => {
  const [mode, setMode] = React.useState<playMode>(playMode.sequence)
  const changeMode = () => {
    let newMode = (mode + 1) % ModeNum
    setMode(newMode)
  }
  React.useEffect(() => {
    switch (mode) {
      case playMode.single: {
        //
      }
      case playMode.sequence: {
      }
      case playMode.random: {
      }
    }
  }, [mode])

  return {
    mode,
    changeMode,
  }
}
