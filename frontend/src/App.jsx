import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Home';
import Adopciones from './pages/Adopciones';
import Profile from './pages/Profile';
import Logout from './pages/auth/Logout';
import PrivateRoutes from './utils/PrivateRoutes';
import Create from "./pages/Create";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/singup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<PrivateRoutes />} >
          <Route path="/home" element={<Home />} />
          <Route path="/adopciones" element={<Adopciones />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/crear" element={<Create />} />
        </Route>
      </Routes>
    </>
  )
}

export default App