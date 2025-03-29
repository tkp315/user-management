import { Routes,Route } from "react-router-dom"
import UserList from "./pages/user-list/UserList"
import Home from "./pages/home/Home"
import ProtectedRoute from "./pages/components/ProtectedRoute"



function App() {
  return (
    <>
    <Routes>
      <Route element={<Home/>} path="/"/>
      <Route element={<ProtectedRoute/>}>
      <Route element={<UserList/>} path="/user-list"/>
      </Route>
    </Routes>
    </>
  )
}

export default App
