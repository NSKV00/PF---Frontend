import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { apiController } from "../../controller/api.controller"
import style from "./style.module.css"
import Logo from "../../assets/Logo.png"

export const Cadastro = () => {
  const navigate = useNavigate()
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [telefone, setTelefone] = useState("")

  const validateForm = (): boolean => {
    if (!nome || !email || !password || !telefone) {
      toast.error("Preencha todos os campos obrigatórios.")
      return false
    }
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.")
      return false
    }
    if (telefone.replace(/\D/g, "").length !== 11) {
      toast.error("Telefone deve ter 11 dígitos (DDD + número).")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const res = await apiController.post("/usuario", {
        nome,
        email,
        password,
        telefone: telefone.replace(/\D/g, ""), 
      })

      if (res.status === 201) {
        toast.success("Usuário cadastrado com sucesso!")
        setTimeout(() => navigate("/login"), 2500)
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Erro no backend:", error.response.data)

        const msg = error.response.data.message
        if (typeof msg === "string") {
          toast.error(msg)
        } else if (typeof msg === "object") {
          const firstError = Object.values(msg)[0]
          toast.error(String(firstError))
        } else {
          toast.error("Erro ao cadastrar usuário")
        }
      } else {
        console.error(error)
        toast.error("Erro de conexão com servidor")
      }
    }
  }

  const formatTelefone = (value: string): string => {
    const numeros = value.replace(/\D/g, "")
    if (numeros.length <= 10) {
      return numeros
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
    } else {
      return numeros
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
    }
  }

  return (
    <main className={style.main}>
      <form className={style.form} onSubmit={handleSubmit}>
        <span className={style.logo}>
          <img className={style.Logo} src={Logo} alt="logo" />
        </span>
        <span className={style.title}>Criar Conta</span>

        <fieldset>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            type="tel"
            placeholder="(99) 99999-9999"
            value={formatTelefone(telefone)}
            onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ""))}
            required
          />
        </fieldset>

        <button type="submit">Cadastrar-se</button>
        <div>
          <span className={style.span}>Já tem uma conta?</span>
          <Link className={style.login} to={"/login"}>
            Fazer login
          </Link>
        </div>
      </form>
    </main>
  )
}
