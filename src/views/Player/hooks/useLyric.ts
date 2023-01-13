import * as React from "react"
import { getLyricRequest } from "@/api/request"
const useLyric = (id: number) => {
  const lyricParser = React.useRef<Lyric>()
  const [loading, setLoading] = React.useState(false)
  const [currentLineNum, setCurrentLineNum] = React.useState(0)
  const currentLyric = React.useRef("")
  const handleLyric = ({ lineNum, txt }: { lineNum: number; txt: string }) => {
    setCurrentLineNum(lineNum)
    currentLyric.current = txt
  }
  React.useEffect(() => {
    if (id === -1) return
    setLoading(true)
    getLyricRequest(id)
      .then((res) => {
        try {
          lyricParser.current?.destroy()
          lyricParser.current = new Lyric(res.lrc.lyric, handleLyric)
          setCurrentLineNum(0)
          lyricParser.current.seek(0)
        } catch (err) {}
      })
      .catch((err) => {
        console.warn("get lyric error")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  return { loading, currentLyric, currentLineNum, lyricParser }
}

export default useLyric

// lyric parser
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g
interface LyricRecord {
  txt: string
  time: number
}

class Lyric {
  private curLineIndex = 0
  private startStamp = 0
  private linesRes: LyricRecord[] = []
  private state: boolean = false
  private timer?: NodeJS.Timer
  constructor(
    private lrc: string,
    private callback?: (arg: { txt: string; lineNum: number }) => void
  ) {
    this._initLines()
  }

  _initLines() {
    const lines = this.lrc.split("\n")
    this.linesRes = lines
      .map((line) => {
        let res = timeExp.exec(line)
        if (!res) return undefined
        const txt = line.replace(timeExp, "").trim()
        if (txt) {
          if (res[3].length === 3) {
            res[3] = res[3].slice(0, 2)
          }
          return {
            time:
              parseInt(res[1]) * 60 * 1000 +
              parseInt(res[2]) * 1000 +
              (parseInt(res[3]) || 0),
            txt,
          }
        }
      })
      .filter(Boolean) as LyricRecord[]
  }
  public play(offset: number = 0, isSeek: boolean = false) {
    if (this.linesRes.length) {
      this.state = true
      this.curLineIndex = this._findcurLineIndex(offset)
      this._callHandler(this.curLineIndex - 1)
      this.startStamp = +new Date() - offset
      if (this.curLineIndex < this.linesRes.length) {
        clearTimeout(this.timer)
        this.timer = undefined
        this._playRest(isSeek)
        console.log("get")
      }
    }
  }
  _findcurLineIndex(time: number) {
    for (let i = 0; i < this.linesRes.length; i++) {
      if (time <= this.linesRes[i].time) {
        return i
      }
    }
    return this.linesRes.length - 1
  }
  _callHandler(index: number) {
    if (index < 0) return
    this.callback?.({
      txt: this.linesRes[index].txt,
      lineNum: index,
    })
  }
  _playRest(isSeek: boolean = false) {
    let line = this.linesRes[this.curLineIndex]
    let delay
    if (isSeek) {
      delay = line.time - (+new Date() - this.startStamp)
      console.log(delay, "isSeek")
    } else {
      let preTime = this.linesRes[this.curLineIndex - 1].time || 0
      delay = line.time - preTime
    }
    this.timer = setTimeout(() => {
      this._callHandler(this.curLineIndex++)
      console.log(this.curLineIndex, "here")
      if (this.curLineIndex < this.linesRes.length && this.state) {
        this._playRest()
      }
    }, delay)
  }
  public togglePlay(offset: number, isPlaying: boolean) {
    if (!isPlaying) {
      this.stop()
    } else {
      this.play(offset, true)
    }
    this.state = isPlaying
  }
  public stop() {
    this.state = false
    clearTimeout(this.timer)
    this.timer = undefined
  }
  public seek(offset: number) {
    this.play(offset, true)
  }
  public getLyrics() {
    return this.linesRes
  }
  public destroy() {
    clearTimeout(this.timer)
    this.timer = undefined
  }
}
