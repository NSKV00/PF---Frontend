/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import style from "./style.module.css"
import { apiController } from "../../controller/api.controller"
import { toast } from "react-toastify"
import { returnDDSemanaArraySchema, type returnAllDDSemana} from "@/schemas/ddSemana.schema"

export const Semana = () => {
  const navigate = useNavigate()

  const [ddsemana, setDdsemana] = useState<returnAllDDSemana>([]);

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState(0)
  const [horaFinal, setHorarioFinal] = useState("")
  const [horaInicial, setHorarioInicial] = useState("")


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

    const pegarDdsemana = async () => {
    const { data } = await apiController.get("ddsemana");

    const ddValidados = returnDDSemanaArraySchema.parse(data);

    const ordemDias = ["segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado", "domingo"];


    const ddOrdenados = ddValidados.sort(
        (a, b) => ordemDias.indexOf(a.nome.toLowerCase()) - ordemDias.indexOf(b.nome.toLowerCase())
    );

    setDdsemana(ddOrdenados);
    };

    const atualizarHorarioAF = async (id:number,hora:string,hora2:string) => {
        await apiController.patch(`ddsemana/${id}`, {horaInicial:hora,horaFinal:hora2})
    }



    useEffect(()=>{
        const token = localStorage.getItem("token")
        if (!token){
            navigate("/login")
        } else {
            validateUser(token)
            pegarDdsemana()
        }
    },[]) 


  return (
    <>
      <Header />
        <main className={style.main}>
        

        <div className={style.containerCartoes}>
        {ddsemana.map((item) => (
        <div key={item.id} className={style.cartaoCliente}>
            <div className={style.informacoesCliente}>
            <h1 className={style.nomeCliente}>{item.nome.toLowerCase().replace(/(^\w|-\w)/g, (letra) => letra.toUpperCase())}</h1>
            <div className={style.contatoCliente}>
                <p>🕓 {item.horaInicial}</p>
                <p>🚫 {item.horaFinal}</p>
            </div>
            </div>
            <div className={style.acaoCliente}>
            <button className={style.botaoEditar } onClick={() => {
              setHorarioFinal(item.horaFinal)
              setHorarioInicial(item.horaInicial)
              setIdSelecionado(item.id)
              setIsModalOpen2(true)
              }}>Editar</button>
            </div>
        </div>
        ))}
        </div>

        </main>

        {isModalOpen2 && (
        <div className={style.modalOverlay2} onClick={() => setIsModalOpen2(false)}>
            <div className={style.modalContent2} onClick={(e) => e.stopPropagation()}>
            <h2 className={style.modalTitle}>Editar Funcionário</h2>
            <input type="time" placeholder="Horario de abertura" className={style.modalInput} value={horaInicial} onChange={(e) => setHorarioInicial(e.target.value)} />
            <input type="time" className={style.modalInput} placeholder="Horario de fechamento" value={horaFinal} onChange={(e) => setHorarioFinal(e.target.value)} />
            <div className={style.modalButtons}>
                <button className={style.confirm} onClick={async () => { 
                    await atualizarHorarioAF(idSelecionado,horaInicial,horaFinal)  
                    toast.success("Horario atualizado com sucesso!"); 
                    setTimeout(async () => 
                    {setIsModalOpen2(false)  
                    await pegarDdsemana()}, 3600); }}>
                        Confirmar
                </button>
                <button className={style.cancel} onClick={() => setIsModalOpen2(false)}>Cancelar</button>
            </div>
            </div>
        </div>
        )}

      <Footer />
    </>
  )
}
