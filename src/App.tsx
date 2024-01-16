import Login from "./Form/Login"
import Signup from "./Form/Signup"
import Home from "./Home/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Search from "./Search/Search"
import Feed from "./Feed/Feed"
import Profile from "./Profile/Profile"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route path="/activityFeed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
