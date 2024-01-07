import Login from "./Form/Login"
import Signup from "./Form/Signup"
import Home from "./Home/Home"
import { Route, Routes } from "react-router-dom"
import Search from "./Search/Search"
import Feed from "./Feed/Feed"

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/activityFeed" element={<Feed />} />
      </Routes>
    </>
  )
}

export default App
