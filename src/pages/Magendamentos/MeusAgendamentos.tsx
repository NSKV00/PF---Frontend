/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import style from "./style.module.css"
import { apiController } from "../../controller/api.controller"
import { toast } from "react-toastify"
import type { returnAgenda } from "@/schemas/agenda.schema"
import type { returnFuncionario } from "@/schemas/funcionario.schema"

export const MeusAgendamentos = ()=>{
const navigate = useNavigate()

  const [agenda,setAgenda] = useState<returnAgenda[]>([])
  const [funcionario,setFuncionario] = useState<returnFuncionario[]>([])
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState(0)


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

const pegarAgendamento = async () => {
    const params: Record<string, any> = {};

    const valor2 = localStorage.getItem("user")
          if (!valor2) return

    const user = JSON.parse(valor2)
    const nome2 = user.nome

    params.usuario = nome2;


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
    const filtrados = dataComDate.filter(item => item.dataObj >= agora);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const dataOrdenada = filtrados.sort((a,b) => a.dataObj.getTime() - b.dataObj.getTime());


    setAgenda(dataOrdenada);
};



    const pegarFuncionario = async () => {
        const { data } = await apiController.get("funcionario")

        setFuncionario(data)
    }

    const cancelarAgendamento = async (id:number) => {
        await apiController.delete(`agenda/${id}`)
    }


        useEffect(()=>{
          const token = localStorage.getItem("token")
          if (!token){
              navigate("/login")
          } else {
              validateUser(token)
              pegarAgendamento()
              pegarFuncionario()
          }
      },[]) 


  return (
    <>
      <Header />
        <main className={style.main}>
        

        <div className={style.containerCartoes}>
            {agenda.map((item) => {

                const funcionario2 = funcionario.find(f => f.id === item.funcionario)
                const nomeFuncionario = funcionario2 ? funcionario2.nome : "Funcionario não encontrado"

                return (
                <div key={item.id} className={style.cartaoCliente}>
                    <div className={style.informacoesCliente}>
                    <h1 className={style.nomeCliente}>
                        Dia: {String(item.diaMes).padStart(2, "0")}/{mesesMap[item.mes.toLowerCase()]}/{item.ano} Horario: {item.hora}</h1>
                    <div className={style.contatoCliente}>
                        <p>Funcionario: {nomeFuncionario.replace(/\b\w/g, (letra) => letra.toUpperCase())}</p>
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

        </main>

        {isModalOpen2 && (
          <div className={style.modalOverlay2} onClick={() => setIsModalOpen2(false)}>
            <div className={style.modalContent2} onClick={(e) => e.stopPropagation()}>
              <button className={style.confirm} onClick={async () => {
                await cancelarAgendamento(idSelecionado)
                toast.success("Agendamento cancelado com sucesso")
                
                setTimeout(async() => {
                  await pegarAgendamento()
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