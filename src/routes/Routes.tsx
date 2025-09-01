import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/home/Home"
import { Agendamento } from "../pages/agendamento/Agendamento"
import { Servicos } from "../pages/servicos/Servicos"
import { Clientes } from "../pages/clientes/Clientes"
import { Login } from "../pages/login/Login"
import { Cadastro } from "../pages/cadastro/Cadastro"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { MeusAgendamentos } from "../pages/Magendamentos/MeusAgendamentos"
import { Agendamentos } from "@/pages/agendamentos/agendamentos"

export function MainRoutes() {

     return <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/agendamento" element={<ProtectedRoutes><Agendamento/></ProtectedRoutes>} />
        <Route path="/meusAgendamentos" element={<ProtectedRoutes><MeusAgendamentos/></ProtectedRoutes>} />
        <Route path="/servicos" element={<ProtectedRoutes><Servicos/></ProtectedRoutes>} />
        <Route path="/clientes" element={<ProtectedRoutes><Clientes/></ProtectedRoutes>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/agendamentos" element={<Agendamentos/>} />
    </Routes>
}