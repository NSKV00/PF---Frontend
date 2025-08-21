import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { apiController } from "../../controller/api.controller"
import Lstyle from "../login/style.module.css"
import style from "./style.module.css"
import Logo from "../../assets/Logo.png"

export const Cadastro=()=>{
    const navigate = useNavigate()
    const [nome,setNome] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [telefone, setTelefone] = useState("")

    const CCadastro = async() => {
        const data = {
            nome, email, password, telefone
        }
        const res = await apiController.post("/usuario", data)

        if (res.status===201){
            toast.success("Cadastro efetuado com sucesso")
            setTimeout(()=>{
                navigate("/login")
            },2000)
        }else (res.status===400);{
            toast.error("Cadastro não realizado")
        }

    }
    return <>
        <main className={Lstyle.main}>
            <form className={Lstyle.form} onSubmit={CCadastro}>
                <span className={style.title}>Criar Conta</span>
                <span className={style.logo}>
                    <img className={style.Logo} src={Logo} alt="logo" />
                </span>

                <fieldset>
                    <label htmlFor="name">Nome</label>
                    <input  id="name" type="text" placeholder="Digite seu nome"
                    onChange={(e)=>setNome(e.target.value)}
                    />
                    
                </fieldset>
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
                <div>
                    <span className={style.span}></span>
                    <Link className={style.login} to={"/login"}>Fazer login</Link>
                </div>
            </form>
        </main>
    </>
}