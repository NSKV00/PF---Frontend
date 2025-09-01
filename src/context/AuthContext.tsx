import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { apiController } from "../controller/api.controller"

interface User {
  id: number
  nome: string
  email: string
  admin: boolean
  ativo: boolean
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      apiController.defaults.headers.common["Authorization"] = `Bearer ${token}`

      try {
        const res = await apiController.get("/usuario/retrieve")
        setUser(res.data)
      } catch {
        logout()
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [token])

  const login = async (email: string, password: string) => {
    const res = await apiController.post("/login", { email, password })

    if (res.status === 200) {
      const token = res.data.token
      localStorage.setItem("token", token)
      apiController.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setToken(token)
      setUser(res.data.user)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    delete apiController.defaults.headers.common["Authorization"]
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user && !!user.ativo,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuthContext deve ser usado dentro de AuthProvider")
  return context
}
