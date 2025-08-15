import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { apiController } from "../../controller/api.controller"
import Lstyle from "../login/style.module.css"
import style from "./style.module.css"
import { Input } from "../../components/input/Input"

export const Cadastro=()=>{
    const navigates = useNavigate()
    const [nome,setNome] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [telefone, setTelefone] = useState("")

    const FCadratro = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const body = {
            nome:nome,
            email:email,
            password:password,
            telefone:telefone
        }
        const res = await apiController.post("/usuario",body)
        if (res.status===201){
            toast.success("Cadastro realizado")
            setTimeout(()=>{
                navigates("/login")
            },2000);
        }
    }
    return <>
        <main className={Lstyle.main}>
        <form className={Lstyle.form} onSubmit={(event)=>FCadratro(event)}>
            <fieldset>
                <label htmlFor="name">Nome</label>
                <input  id="name" type="text" placeholder="Digite seu nome"
                 onChange={(e)=>setNome(e.target.value)}
                />
                
            </fieldset>
            {/* <Input onchenge={(e)=>setEmail(e.target.value)} /> */}
            <fieldset>
                <label htmlFor="email">E-mail</label>
                <input  id="email" type="text" placeholder="Digite seu e-mail"
                 onChange={(e)=>setEmail(e.target.value)}
                />
            </fieldset>
            <fieldset>
                <label htmlFor="password">Senha</label>
                <input id="password" type="password" placeholder="Digite sua senha"
                 onChange={(e)=>setPassword(e.target.value)}
                />
            </fieldset>
            <fieldset>
                <label htmlFor="telefone">Telefone</label>
                <input id="telefone" type="text" placeholder="Digite seu telefone"
                 onChange={(e)=>setTelefone(e.target.value)}
                />
            </fieldset>

            <button type="submit">Cadastrar-se</button>
            <Link className={style.login} to={"/login"}>Login</Link>
        </form>
    </main>
    </>
}