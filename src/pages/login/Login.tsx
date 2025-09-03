import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "../../hooks/useAuth"
import style from "./style.module.css"
import Logo from "../../assets/Logo.png"


export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const validateForm = (): boolean => {
    if (!email || !password) {
      toast.error("Preencha todos os campos obrigatórios.")
      return false
    }
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await login(email, password)
      toast.success("Login realizado com sucesso!")
      setTimeout(() => navigate("/"), 2000)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Erro ao realizar login")
      }
    }
  }

  return (
    <main className={style.main}>

      <form className={style.form} onSubmit={handleSubmit}>
        <span className={style.logo}>
          <img className={style.Logo} src={Logo} alt="logo" />
        </span>
        <span className={style.title}>Fazer Login</span>

        <fieldset>
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" placeholder="Digite seu e-mail" value={email}
            onChange={(e) => setEmail(e.target.value)} required
          />
        </fieldset>

        <fieldset>
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" placeholder="Digite sua senha" value={password}
            onChange={(e) => setPassword(e.target.value)} required
          />
        </fieldset>

        <button type="submit">Entrar</button>
        <div>
          <span className={style.span}>Não tem uma conta?</span>
          <Link className={style.login} to={"/cadastro"}>
            Criar conta
          </Link>
        </div>
      </form>
    </main>
  )
}
