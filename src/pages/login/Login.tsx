import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import style from "./style.module.css"
import Logo from "../../assets/Logo.png"
import { useAuthContext } from "../../context/AuthContext"

export const Login = () => {
  const navigate = useNavigate()
  const { login, loginWithOtp } = useAuthContext()

  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")

  const handleLogin = async () => {
    try {
      await login(email, password)
      toast.success("Código enviado para seu email!")
      setStep(2)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao fazer login")
    }
  }

  const handleVerifyOtp = async () => {
    try {
      await loginWithOtp(otp)
      toast.success("Login realizado com sucesso!")
      navigate("/")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Código inválido")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) handleLogin()
    else handleVerifyOtp()
  }

  return (
    <main className={style.main}>
      <form className={style.form} onSubmit={handleSubmit}>
        <span className={style.logo}>
          <img className={style.Logo} src={Logo} alt="logo" />
        </span>
        <span className={style.title}>
          {step === 1 ? "Fazer Login" : "Verificação OTP"}
        </span>

        <fieldset>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={step === 2}
          />
        </fieldset>

        {step === 1 ? (
          <fieldset>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </fieldset>
        ) : (
          <fieldset>
            <label htmlFor="otp">Código OTP</label>
            <input
              id="otp"
              type="text"
              placeholder="Digite o código recebido"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </fieldset>
        )}

        <button type="submit">{step === 1 ? "Entrar" : "Verificar Código"}</button>
      <div>
          <Link className={style.login} to={"/cadastro"}>
            Criar conta
          </Link>
      </div>
      </form>
    </main>
  )
}
