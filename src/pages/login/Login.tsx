import { useContext } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { MainContext } from "../../context/MainContext"
import { loginSchemas, type loginUser } from "../../schemas/login.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { apiController } from "../../controller/api.controller"
import { toast } from "react-toastify"
import style from "./style.module.css"
import Logo from "../../assets/Logo.png"

export const Login=()=>{
    const navigate = useNavigate()
    const {setUser} = useContext(MainContext)

    //ERRO, NÃO CONSEGUI ARRUMAR
    // const {resgister,
    //     handleSubmit,
    //     formState{errors}
    // } = useForm<loginUser>({
    //     mode:"onBlur",
    //     resolver: zodResolver(loginSchemas)
    // })

    const FLogin = async (LoginData:loginUser) => {
        try {
            const res = await apiController.post("/login", LoginData)

            if (res.data.token){
                toast.success("Login efetuado com sucesso")
                localStorage.setItem("token", res.data.token)
                setUser(res.data)
                setTimeout(()=>{
                    navigate("/")
                }, 2000)
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    //if (verificar return da função pegar token/decodificar )
    
    return <>
        <main className={style.main}>
            <form className={style.form} /*onSubmit={FLogin}*/>
                <span className={style.title}>Criar Conta</span>
                <span className={style.logo}>
                    <img className={style.Logo} src={Logo} alt="logo" />
                </span>

                <fieldset>
                    <label htmlFor="email">E-mail</label>
                    <input  id="email" type="text" placeholder="Digite seu e-mail"
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" placeholder="Digite sua senha"
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