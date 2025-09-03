/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import style from "./style.module.css"
import { apiController } from "../../controller/api.controller"
import { toast } from "react-toastify"
import type { returnAgenda } from "@/schemas/agenda.schema"
import type { returnUser } from "@/schemas/usuario.schema"
import type { returnFuncionario } from "@/schemas/funcionario.schema"

export const Agendamentos = () => {
  const navigate = useNavigate()

  const [agenda,setAgenda] = useState<returnAgenda[]>([])
  const [cliente,setCliente] = useState<returnUser[]>([])
  const [funcionario,setFuncionario] = useState<returnFuncionario[]>([])
  const [opcao, setOpcao] = useState<"usuario2" | "funcionario" >("usuario2");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [opcao2, setOpcao2] = useState<"usuario" | "funcionario" >("usuario");
  const [offset, setOffset] = useState(0)
  const [valor, setValor] = useState("")
  const [temProximo, setTemProximo] = useState(false);
  const [atividade, setAtividade] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState(0)


  const location = useLocation();
  const state = location.state as { opcao?: "usuario" | "funcionario"; valor?: string };


    const mesesMap: Record<string, string> = {
    janeiro: "01",
    fevereiro: "02",
    março: "03",
    abril: "04",
    maio: "05",
    junho: "06",
    julho: "07",
    agosto: "08",
    setembro: "09",
    outubro: "10",
    novembro: "11",
    dezembro: "12",
        };


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

const pegarAgendamento = async (
  opcao?: "usuario2" | "funcionario",
  valor?: string,
  limite2: number = 12,
  offset2: number = 0,
  ativo?: boolean
) => {
  try {
    const params: Record<string, any> = {};
    if (opcao && valor) params[opcao] = valor;
    params.limite = 1000; 
    const { data } = await apiController.get("agenda", { params });

    const parseDate = (item: any) => {
      const dia = String(item.diaMes).padStart(2, "0");
      const mes = mesesMap[item.mes.toLowerCase()] ?? "01";
      const ano = item.ano;
      const hora = item.hora || "00:00:00";
      return new Date(`${ano}-${mes}-${dia}T${hora}`);
    };

    const agora = new Date();
    const dataComDate = data.map((item: any) => ({ ...item, dataObj: parseDate(item) }));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const filtrados = ativo ? dataComDate : dataComDate.filter(item => item.dataObj >= agora);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const dataOrdenada = filtrados.sort((a, b) => a.dataObj.getTime() - b.dataObj.getTime());

   
    setAgenda(dataOrdenada.slice(offset2, offset2 + limite2));
    setTemProximo(dataOrdenada.length > offset2 + limite2);

  } catch (error) {
    console.error("Erro ao pegar agendamentos:", error);
    toast.error("Erro ao carregar agendamentos");
  }
};


        const pegarAgendamento2 = async (opcao?: "usuario" | "funcionario", valor?: string, limite2?: number, offset?: number, ativo?: boolean) => {
        const params: Record<string, any> = {};
        if (opcao && valor) params[opcao] = valor;
        if (limite2) params.limite = limite2 + 1;
        if (offset) params.offset = offset;
        if (ativo !== undefined) params.ativo = ativo;

        console.log(params);

        const { data } = await apiController.get("agenda",{params})

        const parseDate = (item: any) => {
            const dia = String(item.diaMes).padStart(2, "0");
            const mes = mesesMap[item.mes.toLowerCase()] ?? "01";
            const ano = item.ano;
            const hora = item.hora || "00:00:00";
            return new Date(`${ano}-${mes}-${dia}T${hora}`);
        };

        const agora = new Date();
        const dataComDate = data.map((item: any) => ({ ...item, dataObj: parseDate(item) }));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const filtrados = ativo ? dataComDate : dataComDate.filter(item => item.dataObj >= agora);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const dataOrdenada = filtrados.sort((a,b) => a.dataObj.getTime() - b.dataObj.getTime());
        const limite = limite2 ?? dataOrdenada.length;

        setAgenda(dataOrdenada.slice(0,limite));
        setTemProximo(filtrados.length > limite);
    };

    const pegarUsuario = async () => {
        const { data } = await apiController.get("usuario")

        setCliente(data)
    }

    const pegarFuncionario = async () => {
        const { data } = await apiController.get("funcionario")

        setFuncionario(data)
    }

    const cancelarAgendamento = async (id:number) => {
        await apiController.delete(`agenda/${id}`)
    }


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            validateUser(token);
            
            if (state?.opcao && state?.valor) {
            setOpcao2(state.opcao);       
            pegarAgendamento2(state.opcao, state.valor, 12, offset, atividade);
            } else {
            pegarAgendamento(undefined, undefined, 12, offset, atividade);
            }

            pegarUsuario();
            pegarFuncionario();
        }
    }, []);


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
            setValor(valor)
            if (valor.trim() === "") {
            pegarAgendamento(undefined,undefined,12,0,atividade)
            setOffset(0)
            return
        }
           await pegarAgendamento(opcao,valor,12,0,atividade)
            }
        }
            />
            <select className={style.selecaoPesquisa} value={opcao} onChange={(e) => setOpcao(e.target.value as any)}>
            <option value="usuario2">Cliente</option>
            <option value="funcionario">Funcionario</option>
            </select>
            <select className={style.selecaoPesquisa} value={atividade ? "true" : "false"} onChange={async (e) => {
                const valorAtivo = e.target.value === "true";
                setAtividade(valorAtivo); 
                setOffset(0);
                await pegarAgendamento(opcao, valor, 12, 0, valorAtivo);
            }}>
            <option value="false">Não finalizado</option>
            <option value="true">Finalizado</option>
            </select>
        </div>

        <div className={style.containerCartoes}>
            {agenda.map((item) => {
                const usuario = cliente.find(c => c.id === item.usuario);
                const nomeUsuario = usuario ? usuario.nome : "Usuário não encontrado";

                const funcionario2 = funcionario.find(f => f.id === item.funcionario)
                const nomeFuncionario = funcionario2 ? funcionario2.nome : "Usuário não encontrado"

                return (
                <div key={item.id} className={style.cartaoCliente}>
                    <div className={style.informacoesCliente}>
                    <h1 className={style.nomeCliente}>
                        Dia: {String(item.diaMes).padStart(2, "0")}/{mesesMap[item.mes.toLowerCase()]}/{item.ano} Horario: {item.hora}</h1>
                    <div className={style.contatoCliente}>
                        <p>Cliente: {nomeUsuario.replace(/\b\w/g, (letra) => letra.toUpperCase())}</p>
                        <p>Funcionario: {nomeFuncionario.replace(/\b\w/g, (letra) => letra.toUpperCase())}</p>
                        <p>Status: {item.ativo ? "Concluído" : "Aguardando Corte"}</p>
                    </div>
                    </div>
                    <div className={style.acaoCliente}>
                    <button className={style.botaoExcluir} onClick={() => {
                        setIdSelecionado(item.id)
                        setIsModalOpen2(true)
                    }}>Cancelar Agendamento</button>
                    </div>
                </div>
                )
            })}
        </div>
        <div className={style.containerBotoes}>
        <button className={style.botaoNavegacao} disabled = {offset === 0} onClick={() => {
          const novoOffset = offset - 12;
          setOffset(novoOffset);
          pegarAgendamento(undefined, valor, 12, novoOffset,atividade);
        }}>Anterior</button>
        <button className={style.botaoNavegacao} disabled={!temProximo} onClick={() => {
          const novoOffset = offset + 12;
          setOffset(novoOffset);
          pegarAgendamento(undefined, valor, 12, novoOffset,atividade);
        }}>proximo</button>
        </div>

        </main>

        {isModalOpen2 && (
        <div className={style.modalOverlay2} onClick={() => setIsModalOpen2(false)}>
            <div className={style.modalContent2} onClick={(e) => e.stopPropagation()}>
            <button className={style.confirm} onClick={async () => {
                await cancelarAgendamento(idSelecionado)
                toast.success("Agendamento cancelado com sucesso")

                
                const novoOffset = (agenda.length === 1 && offset >= 12) ? offset - 12 : offset;

                setTimeout(async () => {
                await pegarAgendamento(undefined, valor, 12, novoOffset, atividade)
                setOffset(novoOffset)
                setIsModalOpen2(false)
                }, 3600); 
            }}> Confirmar</button>
            <button className={style.cancel} onClick={() => setIsModalOpen2(false)}>Cancelar</button>
            </div>
        </div>
        )}

      <Footer />
    </>
  )
}
