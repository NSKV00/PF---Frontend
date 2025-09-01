import { Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import type { ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode
}

interface AdminRouteProps {
  children: ReactNode
}

export const ProtectedRoutes = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuthContext()
  const location = useLocation()

  if (loading) return <div>Carregando...</div> // pode trocar por spinner

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAuthenticated, loading } = useAuthContext()
  const location = useLocation()

  if (loading) return <div>Carregando...</div>

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!user?.admin) {
    return <Navigate to="/403" replace /> // página de acesso negado
  }

  return <>{children}</>
}