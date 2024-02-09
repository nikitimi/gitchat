import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
//pages
import LoginPage from "~/pages/LoginPage"
import RegisterPage from "~/pages/RegisterPage"
import PostPage from "~/pages/PostPage"
//layouts
import HomePage from "~/pages/HomePage"
//hooks
import useAuthContext from "~/hooks/useAuthContext"

function App() {
  const { user } = useAuthContext()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<PostPage />} />
          <Route path="settings" element={<span>Settings</span>} />
          <Route path="profile" element={<span>Profile</span>} />
        </Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <RegisterPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
