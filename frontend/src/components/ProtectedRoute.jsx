import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../store/authStore'

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return <Outlet />
}

export default ProtectedRoute