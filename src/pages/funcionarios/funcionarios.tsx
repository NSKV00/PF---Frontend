/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import style from "./style.module.css"
import { apiController } from "../../controller/api.controller"
import { toast } from "react-toastify"

import type { returnFuncionario } from "@/schemas/funcionario.schema"

export const Funcionarios = () => {
  const navigate = useNavigate()

  const [funcionario,setFuncionario] = useState<returnFuncionario[]>([])
  const [offset, setOffset] = useState(0)
  const [temProximo, setTemProximo] = useState(false);
  const [atividade, setAtividade] = useState(true);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState(0)
  const [ativo, setAtivo] = useState<boolean>(false)
  const [nomeFuncionario, setNomeFuncionario] = useState("")
  const [valor2, setValor2] = useState("")
  const [arquivoFuncionario, setArquivoFuncionario] = useState<File | null>(null)





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



    
    const pegarFuncionario = async (nome2?: string,ativo?:boolean,limite?:number,offset?:number) => {
      const { data } = await apiController.get("funcionario", { params: { nome: nome2,ativo:ativo,limite:limite! + 1,offset:offset } });


      const dataOrdenada = data.sort((a: any, b: any) => a.id - b.id);

      setFuncionario(dataOrdenada.slice(0, limite));
      setTemProximo(dataOrdenada.length > limite!);
    }

    const atualizarFuncionario = async (id?:number,arquivo?: File,nome?: string) => {
            const formData = new FormData();


    if (arquivo) {
      formData.append("imagem", arquivo);
    }

    if (nome !== undefined) {
        formData.append("nome", nome);
    }

    await apiController.patch(`funcionario/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    }

    const criarFuncionario = async (nome:string) => {
        await apiController.post("funcionario",{nome})
    }

    const atualizarFuncionario2 = async (id: number, body: { ativo: boolean }) => {
      await apiController.patch(`funcionario/${id}`, body);
    };


    


        useEffect(()=>{
          const token = localStorage.getItem("token")
          if (!token){
              navigate("/login")
          } else {
              validateUser(token)
              pegarFuncionario(undefined,true,12,0)
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
            setValor2(valor)
            if (valor.trim() === "") {
            pegarFuncionario(undefined,atividade,12,0)
            setOffset(0)
            return
        } else {
            pegarFuncionario(valor,atividade,12,0)
            return
        }

            }
        }
            />
            <select className={style.selecaoPesquisa} value={atividade ? "true" : "false"} onChange={async (e) => {
                const valorAtivo = e.target.value === "true";
                setAtividade(valorAtivo); 
                pegarFuncionario(valor2,valorAtivo,12,offset)
                setOffset(0);

            }}>
            <option value="true">Empregado Ativo</option>
            <option value="false">Contrato encerrado</option>
            </select>
            <button className={style.botaoPesquisa} onClick={() => setIsModalOpen4(true)}>
                Adicionar
            </button>


        </div>

        <div className={style.containerCartoes}>
            {funcionario.map((item) => {

                return (
                <div key={item.id} className={style.cartaoCliente}>
                    <div className={style.informacoesCliente}>
                    <h1 className={style.nomeCliente}>
                        Funcionario: {item.nome.replace(/^\w/, (letra) => letra.toUpperCase())}</h1>
                    <div className={style.contatoCliente}>
                        <p>Status: {item.ativo ? "Empregado Ativo" : "Contrato Encerrado"}</p>
                    </div>
                    </div>
                    <div className={style.acaoCliente}>
                    <button className={style.botaoEditar} onClick={() => {
                        setNomeFuncionario(item.nome)
                        setIdSelecionado(item.id)
                        setIsModalOpen3(true)
                        }}>
                        Editar pessoa
                    </button>
                    <button className={style.botaoExcluir} onClick={() => {
                        setIdSelecionado(item.id)
                        setAtivo(item.ativo)
                        setIsModalOpen2(true)
                    }}>Trocar Status</button>
                    <button
                      className={style.botaoAgendamentos}
                      onClick={() => {
                        navigate("/agendamentos", {
                          state: { opcao: "funcionario", valor: item.nome }
                        });
                      }}
                    >Ver - agenda
                    </button>
                    </div>
                </div>
                )
            })}
        </div>
        <div className={style.containerBotoes}>
        <button className={style.botaoNavegacao} disabled = {offset === 0} onClick={() => {
          const novoOffset = offset - 12;
          pegarFuncionario(valor2,true,12,novoOffset)
          setOffset(novoOffset);

        }}>Anterior</button>
        <button className={style.botaoNavegacao} disabled={!temProximo} onClick={() => {
          const novoOffset = offset + 12;
          pegarFuncionario(valor2,true,12,novoOffset)
          setOffset(novoOffset);

        }}>proximo</button>
        </div>

        </main>

        {isModalOpen2 && (
          <div className={style.modalOverlay2} onClick={() => setIsModalOpen2(false)}>
            <div className={style.modalContent2} onClick={(e) => e.stopPropagation()}>
              <button className={style.confirm} onClick={async () => {

                toast.success("Troca de status feita!")
                  await atualizarFuncionario2(idSelecionado, { ativo: !ativo });
                  setTimeout(async() => {
                  pegarFuncionario(valor2,atividade,12,offset)  
                  setIsModalOpen2(false)
                }, 3600);
              }}> Confirmar</button>
              <button className={style.cancel} onClick={() => setIsModalOpen2(false)}>Cancelar</button>
            </div>
          </div>
        )}

        {isModalOpen3 && (
        <div className={style.modalOverlay2} onClick={() => setIsModalOpen3(false)}>
            <div className={style.modalContent2} onClick={(e) => e.stopPropagation()}>
            <h2 className={style.modalTitle}>Editar Funcionário</h2>
            <input type="text" placeholder="Nome" className={style.modalInput} value={nomeFuncionario} onChange={(e) => setNomeFuncionario(e.target.value)} />
            <input type="file" className={style.modalInput}  onChange={(e) => setArquivoFuncionario(e.target.files?.[0] || null)} />
            <div className={style.modalButtons}>
                <button className={style.confirm} onClick={async () => { 
                    atualizarFuncionario(idSelecionado,arquivoFuncionario ?? undefined,nomeFuncionario)
                    toast.success("Funcionário editado com sucesso!"); 
                    setTimeout(() => 
                    {setIsModalOpen3(false)
                    pegarFuncionario(valor2,atividade,12,offset)}, 3600); }}>
                        Confirmar
                </button>
                <button className={style.cancel} onClick={() => setIsModalOpen3(false)}>Cancelar</button>
            </div>
            </div>
        </div>
        )}

        {isModalOpen4 && (
        <div className={style.modalOverlay2} onClick={() => setIsModalOpen4(false)}>
            <div className={style.modalContent2} onClick={(e) => e.stopPropagation()}>
            <h2 className={style.modalTitle}>Adicionar novo Funcionario</h2>
            <input type="text" placeholder="Nome" className={style.modalInput} onChange={(e) => setNomeFuncionario(e.target.value)} />
            <div className={style.modalButtons}>
                <button className={style.confirm} onClick={async () => { 
                    if(nomeFuncionario === ""){
                      toast.error("Funcionario sem nome?")
                      return 
                    }
                    criarFuncionario(nomeFuncionario)
                    toast.success("Funcionário criado com sucesso!"); 
                    setTimeout(() => 
                    {setIsModalOpen4(false)
                    pegarFuncionario(valor2,atividade,12,offset)}, 3600); }}>
                        Adicionar
                </button>
                <button className={style.cancel} onClick={() => setIsModalOpen4(false)}>Cancelar</button>
            </div>
            </div>
        </div>
        )}


      <Footer />
    </>
  )
}
