import { Route, Routes} from "react-router-dom"
import { Home } from "../pages/home/Home"
import { Login } from "../pages/login/Login"
import { Cadastro } from "../pages/cadastro/Cadastro"

export function MainRoutes(){
    
    return <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Cadastro" element={<Cadastro/>} />
    </Routes>
}