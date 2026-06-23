import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import ProtectedRoute from './components/ProtectedRoute'
import useAuthStore from './store/authStore'
import Dashboard from './pages/dashboard/Dashboard'
import WorkspacePage from './pages/workspace/WorkspacePage'
import ProjectPage from './pages/project/ProjectPage'

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workspace/:workspaceId" element={<WorkspacePage />} />
            <Route path="/workspace/:workspaceId/project/:projectId" element={<ProjectPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App