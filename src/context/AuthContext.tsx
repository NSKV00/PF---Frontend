// import { useState, type ReactNode } from "react";
// import { createContext } from "vm";
// import { any, email, string } from "zod";
// import { apiController } from "../controller/api.controller";

// export const AuthContext = createContext()


// export const AuthProvider = ({ children }: { children: ReactNode })=>{
//     const [user, setUser] = useState(null)

//     const loadingStoredata = async ()=>{
//         const storageUser = localStorage.getItem("user")
//         const storagetoken = localStorage.getItem("token")

//         if (storageUser && storagetoken){
//             setUser(storageUser)
//         }
//     }
    
//     const signIn = async (email: string, password: string)=>{
//         const res = await apiController.post("/login", {email,password})
        
//         if (res.data.error){
//             alert(res.data.error)
//         }else {
//             setUser(res.data)
//             apiController.defaults.headers.common[
//                 "Authorization"
//             ] = `Bearer ${res.data.token}`
//             localStorage.setItem("user", res.data.user)
//             localStorage.setItem("token", res.data.token)
//         }
//     }

//     return(
//         <AuthContext.Provider value={{
//             user,
//             signed: !!user,
//             signIn
//         }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

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
        // apiController.get("/me").then((res) => setUser(res.data)).catch(() => logout())
        }
    }, [token])

    const login = async (email: string, password: string) => {
        const res = await apiController.post("/login", { email, password })

        if (res.status === 200) {
        const token = res.data.token
        localStorage.setItem("token", token)
        // res.data.user.isadmin
        // setUser(user)
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