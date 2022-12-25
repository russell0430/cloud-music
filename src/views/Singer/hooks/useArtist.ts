import * as React from "react"
import { getSingerInfoRequest } from "@/api/request"
const defaultState: Artist = {
  artist: { picUrl: "", name: "" },
  hotSongs: [],
}
const useArtist = (id: string) => {
  const [artist, setArtist] = React.useState<Artist>(defaultState)
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    setLoading(true)
    getSingerInfoRequest(id)
      .then((res) => {
        setArtist(res)
      })
      .catch((err) => {
        console.warn("get artist error!")
      })
      .finally(() => setLoading(false))
  }, [])

  return { loading, artist }
}

export default useArtist
