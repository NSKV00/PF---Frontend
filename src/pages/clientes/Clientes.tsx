import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import style from "./style.module.css"
import type { returnUser } from "@/schemas/usuario.schema"
import { apiController } from "../../controller/api.controller"

export const Clientes = () => {
  const navigate = useNavigate()

  const [cliente,setCliente] = useState<returnUser[]>([])


    const validateUser = async(token:string)=>{
          try {
              const res = await apiController.get("usuario/retrieve",{
                  headers:{
                      Authorization: `Bearer ${token}`
                  }
              })
              if (res.data){
                  localStorage.setItem("user", JSON.stringify(res.data))
              }
          } catch (error){
              console.log(error,"error")
              localStorage.removeItem("token")
              localStorage.removeItem("user")
              navigate("/login")
          }
      }

  const pegarCliente = async () => {
    const { data } = await apiController.get("usuario")

    setCliente(data)
  }

        useEffect(()=>{
          const token = localStorage.getItem("token")
          if (!token){
              navigate("/login")
          } else {
              validateUser(token)
              pegarCliente()
          }
      },[]) 


  return (
    <>
      <Header />
        <main className={style.main}>
        <div className={style.containerPrincipal}>
            <input
            className={style.entradaPesquisa}
            placeholder="Digite para pesquisar..."
            />
            <select className={style.selecaoPesquisa}>
            <option value="nome">Nome</option>
            <option value="telefone">Telefone</option>
            <option value="email">E-mail</option>
            </select>
            <button className={style.botaoPesquisa}>Buscar</button>
        </div>

        <div className={style.containerCartoes}>
        {cliente.map((item) => (
        <div key={item.id} className={style.cartaoCliente}>
            <div className={style.informacoesCliente}>
            <h1 className={style.nomeCliente}>{item.nome}</h1>
            <div className={style.contatoCliente}>
                <p>{item.telefone}</p>
                <p>{item.email}</p>
                <p>{item.ativo ? "Ativo" : "Inativo"}</p>
            </div>
            </div>
            <div className={style.acaoCliente}>
            <button className={style.botaoExcluir}>Trocar Status</button>
            </div>
        </div>
        ))}
        </div>


        </main>
      <Footer />
    </>
  )
}
