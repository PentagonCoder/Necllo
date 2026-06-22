import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import ProtectedRoute from './components/ProtectedRoute'
import useAuthStore from './store/authStore'
// import dashboard from './pages/dashboard/Dashboard'

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth)
  checkAuth() // Call checkAuth on app load
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Protected routes go inside here */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<div className="p-10">Dashboard coming soon</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App