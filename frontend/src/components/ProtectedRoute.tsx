// src/components/ProtectedRoute.jsx
import { useAuthStore } from '@/store/authStore'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ children }) {
  const { isAuthenticated  } = useAuthStore()
  console.log('auth', isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}