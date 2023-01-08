import * as React from "react"
import { getAlbumDetailRequest } from "@/api/request"
const useAlbum = (id: string) => {
  const [loading, setLoading] = React.useState(false)
  const [albumDetail, setAlbumDetail] = React.useState<Album>()
  React.useEffect(() => {
    setLoading(true)
    getAlbumDetailRequest(id)
      .then((res) => {
        setAlbumDetail(res.playlist)
      })
      .catch((err) => {
        console.warn("get album detail error")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return { loading, albumDetail }
}

export default useAlbum
