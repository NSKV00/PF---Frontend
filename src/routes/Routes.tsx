import { Route, Routes} from "react-router-dom"
import { Home } from "../pages/home/Home"
import { Agendamento } from "../pages/agendamento/Agendamento"
import { Servicos } from "../pages/servicos/Servicos"
import { Clientes } from "../pages/clientes/Clientes"
import { Login } from "../pages/login/Login"
import { Cadastro } from "../pages/cadastro/Cadastro"

export function MainRoutes(){
    
    return <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/agendamento" element={<Agendamento/>} />
        <Route path="/servicos" element={<Servicos/>} />
        <Route path="/clientes" element={<Clientes/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
    </Routes>
}