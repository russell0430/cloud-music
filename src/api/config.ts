import axios from "axios"

export const baseURL = "http://localhost:3000"

const axiosInstance = axios.create({
  baseURL,
})

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.warn(err, "network error")
  }
)

export { axiosInstance }
