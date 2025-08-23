import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { apiController } from "../controller/api.controller"

interface AuthContextType {
    user: any | null
    token: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"))

    useEffect(() => {
        if (token) {
        apiController.defaults.headers.common["Authorization"] = `Bearer ${token}`
        // opcional: buscar dados do usuário logado
        // apiController.get("/me").then((res) => setUser(res.data)).catch(() => logout())
        }
    }, [token])

    const login = async (email: string, password: string) => {
        const res = await apiController.post("/login", { email, password })

        if (res.status === 200) {
        const token = res.data.token
        localStorage.setItem("token", token)
        setToken(token)
        setUser(res.data.user ?? null)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setUser(null)
        delete apiController.defaults.headers.common["Authorization"]
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
        {children}
        </AuthContext.Provider>
    )
    }

    export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuthContext deve ser usado dentro de AuthProvider")
    return context
}
