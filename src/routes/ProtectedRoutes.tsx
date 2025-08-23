import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import type { JSX } from "react/jsx-runtime"

interface ProtectedRouteProps {
  children: JSX.Element
}

export const ProtectedRoutes = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}