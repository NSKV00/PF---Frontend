/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import style from "./style.module.css"
import type { returnUser } from "@/schemas/usuario.schema"
import { apiController } from "../../controller/api.controller"
import { toast } from "react-toastify"

export const Clientes = () => {
  const navigate = useNavigate()

  const [cliente,setCliente] = useState<returnUser[]>([])
  const [opcao, setOpcao] = useState<"nome" | "tele" | "email">("nome");
  const [offset, setOffset] = useState(0)
  const [temProximo, setTemProximo] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState(0)
  const [valor, setValor] = useState("")


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

    const pegarCliente = async (opcao?: "nome" | "tele" | "email",valor?:string,limite2?:number,offset?:number) => {

      const params: Record<string, any> = {};

      if (opcao && valor) params[opcao] = valor;
      if (limite2) params.limite = limite2 + 1;
      if (offset) params.offset = offset;

      const { data } = await apiController.get("usuario",{params})

      const dataOrdenada = data.sort((a: any, b: any) => b.id - a.id);

      setCliente(dataOrdenada.slice(0, limite2));
      setTemProximo(data.length > limite2!);
      }

    const trocarAtivo = async (id:number) => {

      const usuario = cliente.find(c => c.id === id);
        if (!usuario) return;

      const novoStatus = usuario.ativo ? false : true;

      await apiController.patch(`usuario/${id}`, {
        ativo: novoStatus
      })
    }

        useEffect(()=>{
          const token = localStorage.getItem("token")
          if (!token){
              navigate("/login")
          } else {
              validateUser(token)
              pegarCliente(undefined,undefined,8,offset)
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
            onChange={async (e) => { 
            const valor = e.target.value
            setValor(e.target.value)
            if (valor.trim() === "") {
            pegarCliente(undefined,undefined,8,0)
            setOffset(0)
            return
        }
           await pegarCliente(opcao,valor,8,0)
            }
        }
            />
            <select className={style.selecaoPesquisa} value={opcao} onChange={(e) => setOpcao(e.target.value as any)}>
            <option value="nome">Nome</option>
            <option value="tele">Telefone</option>
            <option value="email">E-mail</option>
            </select>
        </div>

        <div className={style.containerCartoes}>
        {cliente.map((item) => (
        <div key={item.id} className={style.cartaoCliente}>
            <div className={style.informacoesCliente}>
            <h1 className={style.nomeCliente}>{item.nome.replace(/\b\w/g, (letra) => letra.toUpperCase())}</h1>
            <div className={style.contatoCliente}>
                <p>📞 {item.telefone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3")}</p>
                <p>✉️ {item.email}</p>
                <p>{item.ativo ? "🟢 Ativo" : "🔴 Bloqueado"}</p>
            </div>
            </div>
            <div className={style.acaoCliente}>
            <button className={style.botaoExcluir} onClick={() => {
              setIdSelecionado(item.id)
              setIsModalOpen2(true)
              }}>Trocar Status</button>
            </div>
        </div>
        ))}
        </div>
        <div className={style.containerBotoes}>
        <button className={style.botaoNavegacao} disabled = {offset === 0} onClick={() => {
          const novoOffset = offset - 8;
          setOffset(novoOffset);
          pegarCliente(undefined, undefined, 8, novoOffset);
        }}>Anterior</button>
        <button className={style.botaoNavegacao} disabled={!temProximo} onClick={() => {
          const novoOffset = offset + 8;
          setOffset(novoOffset);
          pegarCliente(undefined, undefined, 8, novoOffset);
        }}>proximo</button>
        </div>

        </main>

        {isModalOpen2 && (
          <div className={style.modalOverlay2} onClick={() => setIsModalOpen2(false)}>
            <div className={style.modalContent2} onClick={(e) => e.stopPropagation()}>
              <button className={style.confirm} onClick={async () => {
                await trocarAtivo(idSelecionado)
                pegarCliente(opcao,valor,8,0)
                toast.success("Status atualizado com sucesso")

                setTimeout(() => {
                  setIsModalOpen2(false)
                }, 100);
              }}> Confirmar</button>
              <button className={style.cancel} onClick={() => setIsModalOpen2(false)}>Cancelar</button>
            </div>
          </div>
        )}

      <Footer />
    </>
  )
}
