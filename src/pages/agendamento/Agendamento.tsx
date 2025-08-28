  import { useEffect, useState } from "react"
  import { useNavigate } from "react-router-dom"
  import { Header } from "../../components/header/Header"
  import { Footer } from "../../components/footer/Footer"
  import { apiController } from "../../controller/api.controller"
  import type { returnFuncionario } from "../../schemas/funcionario.schema"
  import style from "./style.module.css"
  import { Calendario } from "@/components/calendario/calendario"


  export const Agendamento = ()=>{
      const navigate = useNavigate()
      const [funcionario,setFuncionario] = useState<returnFuncionario[]>([])
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
      const [date, setDate] = useState<number | null>(new Date().getDate());
      const [mes, setMes] = useState<number>(new Date().getMonth());
      const [ano, setAno] = useState<number>(new Date().getFullYear());
      const [diaSemana, setDiaSemana] = useState<string>("");
      const [selectedTime, setSelectedTime] = useState<string>("");
      const [meuValor, setMeuValor] = useState<string>("");
      const [idSelecionado, setIdSelecionado] = useState<number | null>(null);

  const salvarData = (data: Date) => {
    setMes(data.getMonth());
    setAno(data.getFullYear());
  };

  const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  const diasSemana = [7,1,2,3,4,5,6];

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

      const generateTimes = (): string[] => {
    const times: string[] = [];
    for (let h = 10; h <= 18; h++) {
      times.push(`${h.toString().padStart(2, "0")}:00`);
      times.push(`${h.toString().padStart(2, "0")}:30`);
    }
    return times.filter((t) => t <= "18:00");
  };

  const times = generateTimes();

      const pegarTodosFuncionarios = async (nome?: string,limite?:number,offset?:number) => {
          const { data } = await apiController.get("funcionario", {
              params: { 
                  nome: nome ,
                  limite: limite,
                  offset: offset,
              }
          })
          setFuncionario(data.sort((a: { id: number }, b: { id: number }) => a.id - b.id));
      };

      const abrirModal = (id: number) => {
        setIdSelecionado(id);
      setIsModalOpen(prev => !prev);
      };

      useEffect(()=>{
          const token = localStorage.getItem("token")
          if (!token){
              navigate("/login")
          } else {
              validateUser(token)
              pegarTodosFuncionarios()
          }

           const valor = localStorage.getItem("user"); 
    if (valor) {
      setMeuValor(JSON.parse(valor)); 
    }

            if (isModalOpen) {
              document.body.style.overflow = "hidden"
            } else {
              document.body.style.overflow = ""
            }

            return () => {
              document.body.style.overflow = ""
            }


      },[isModalOpen]) 

      return<>
          <Header/>
          <main className={style.main}>
  <div className={style.divFun}>
    {funcionario.map((item) => (
      <div key={item.id} className={style.divImg}>
        <div className={style.divImgInner}>
          <div className={style.divImgFront}>
            <img className={style.img} src={`data:image/png;base64,${item.imagem}`} alt="" />
            <h1 className={style.nomeEmCima}>{item.nome}</h1>
          </div>
          <div className={style.divImgBack}>
            <p className={style.para}>Muito além de um simples corte, nossa missão é transformar cada fio em uma expressão única de identidade e personalidade.</p>
            <button  className={style.button} onClick={() => {
              abrirModal(item.id)
            }}>Agendar</button>
          </div>
        </div>
      </div>
    ))}
  </div>

          </main>


  {isModalOpen && (
    <div className={style.modalOverlay} onClick={() => setIsModalOpen(false)}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>



<Calendario
  date={selectedDate}
  onSelect={(newDate) => {
    if (!newDate) return;
    setSelectedDate(newDate);
    setDate(newDate.getDate());
    setDiaSemana(diasSemana[newDate.getDay()]);
    console.log(
    idSelecionado,
    meuValor.id,
    newDate.getDate(),
    diasSemana[newDate.getDay()],
    meses[newDate.getMonth()],
    newDate.getFullYear()
    );
  }} salvarData={salvarData}/>

      <select className={style.hora} value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
      <option value="">Selecionar hora</option>
      {times.map((time) => (<option key={time} value={time}> {time}
      </option>))}
      </select>
      </div>
    </div>
  )}
          <Footer/>
      </>
  }
