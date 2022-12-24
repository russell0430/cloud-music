import { GlobalStyle } from "./style"
import { IconStyle } from "./assets/iconfont/iconfont"
import { BrowserRouter } from "react-router-dom"
import Routes from "./routes"
import { RecoilRoot } from "recoil"
function App() {
  return (
    <div
      className="App"
      // style={{ maxWidth: "720px", margin: "auto" }}
    >
      <BrowserRouter>
        <GlobalStyle />
        <IconStyle />
        <RecoilRoot>
          <Routes />
        </RecoilRoot>
      </BrowserRouter>
    </div>
  )
}

export default App
