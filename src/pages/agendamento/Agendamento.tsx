  import { useEffect, useState } from "react"
  import { useNavigate } from "react-router-dom"
  import { Header } from "../../components/header/Header"
  import { Footer } from "../../components/footer/Footer"
  import { apiController } from "../../controller/api.controller"
  import type { returnFuncionario } from "../../schemas/funcionario.schema"
  import style from "./style.module.css"
  import { Calendario } from "../../components/calendario/Calendario"
  import type { returnDDSemana } from "@/schemas/ddSemana.schema"
  import { toast } from "react-toastify"
import type { returnUser } from "@/schemas/usuario.schema"


  export const Agendamento = ()=>{
      const navigate = useNavigate()
      const [funcionario,setFuncionario] = useState<returnFuncionario[]>([])
      const [ddsemana,setDdsemana] = useState<returnDDSemana[]>([])
      const [cliente, setCliente] = useState<returnUser[]>([])
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isModalOpen2, setIsModalOpen2] = useState(false);
      const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
      const [date, setDate] = useState<number | null>(new Date().getDate());
      const [mes, setMes] = useState<number>(new Date().getMonth());
      const [ano, setAno] = useState<number>(new Date().getFullYear());
      const [diaSemana, setDiaSemana] = useState<number>(0);
      const [selectedTime, setSelectedTime] = useState<string>("");
      const [meuValor, setMeuValor] = useState<string>("");
      const [idSelecionado, setIdSelecionado] = useState<number | null>(null);
      const [times, setTimes] = useState<string[]>([]);

  const salvarData = (data: Date) => {
    setMes(data.getMonth());
    setAno(data.getFullYear());
  };

  const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  const diasSemana = [10,4,5,6,7,8,9];

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

      const pegarDiaDaSemana = async () => {
        const { data } = await apiController.get("ddsemana")

        setDdsemana(data)
      }


      const agendar = async (funcionario:number,hora:string,dia:string,mes:string,ano:string,usuario:number,diaDaSemana:number) => {
          const body = {
            hora:hora,
            diaMes:dia,
            mes:mes,
            ano:ano,
            usuario:usuario,
            funcionario:funcionario,
            ddsemana:diaDaSemana
          }

          const { data } = await apiController.post("agenda",body)
      }

      const pegarTodosFuncionarios = async (nome?: string, limite?: number, offset?: number) => {
  const { data } = await apiController.get("funcionario", {
    params: { nome, limite, offset }
  });
  setFuncionario(data.sort((a, b) => a.id - b.id));
};


      const pegarUsuario = async () => {
        try {
          const valor = localStorage.getItem("user")
          if (!valor) return

          const user = JSON.parse(valor)
          const nome = user.nome

          const { data } = await apiController.get("usuario", {
            params: { nome }
          })

          setCliente(data)
        } catch (error) {
          console.error("Erro ao buscar usuário:", error)
        }
      }

const gerarHorarios = (horaInicio: string, horaFim: string, diaSelecionado: Date): string[] => {
  const horarios: string[] = [];

  if (!diaSelecionado) return []; // protege contra undefined

  const inicio = horaInicio.slice(0, 5); 
  const fim = horaFim.slice(0, 5);   

  if (inicio === "00:00" && fim === "00:00") return []; // dia fechado

  const [horaInicial, minutoInicial] = inicio.split(":").map(Number);
  const [horaFinal, minutoFinal] = fim.split(":").map(Number);

  let hora = horaInicial;
  let minuto = minutoInicial;

  const agora = new Date();
  const ehHoje =
    diaSelecionado.getDate() === agora.getDate() &&
    diaSelecionado.getMonth() === agora.getMonth() &&
    diaSelecionado.getFullYear() === agora.getFullYear();

  while (hora < horaFinal || (hora === horaFinal && minuto <= minutoFinal)) {
    const horarioStr = `${hora.toString().padStart(2,"0")}:${minuto.toString().padStart(2,"0")}`;

    if (hora !== 12) {
      if (ehHoje) {
        if (hora > agora.getHours() || (hora === agora.getHours() && minuto > agora.getMinutes())) {
          horarios.push(horarioStr);
        }
      } else {
        horarios.push(horarioStr);
      }
    }

    minuto += 30;
    if (minuto >= 60) {
      minuto = 0;
      hora++;
    }
  }

  return horarios;
};


      const abrirModal = (id: number) => {
        
      setIdSelecionado(id);
      setIsModalOpen(prev => !prev);
      setSelectedDate(undefined); 
      setDate(new Date().getDate());
      setDiaSemana(0);
      setTimes([]);
      setSelectedTime("");
      };

      const pegarAgendamentosDoDia = async (funcionarioId: number, dia: string, mes: string, ano: string) => {
        try {
          const { data } = await apiController.get("agenda", {
            params: { funcionario: funcionarioId, diaMes: dia, mes, ano } // mes deve ser "agosto", etc.
          });
          return data;
        } catch (error) {
          console.log("Erro ao buscar agendamentos", error);
          return [];
        }
      };

      const atualizarHorariosDisponiveis = async (
        funcionarioId: number,
        dia: string,
        mes: string,
        ano: string,
        horarios: string[]
      ): Promise<string[]> => {
        try {
          const agendamentos = await pegarAgendamentosDoDia(funcionarioId, dia, mes, ano);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const horariosOcupados = agendamentos.map(a => a.hora.slice(0, 5));

          const horariosDisponiveis = horarios.filter(h => !horariosOcupados.includes(h));
          setTimes(horariosDisponiveis);
          return horariosDisponiveis;
        } catch (error) {
          console.log("Erro ao atualizar horários disponíveis", error);
          setTimes([]);
          return [];
        }
      };



      useEffect(()=>{
          const token = localStorage.getItem("token")
          if (!token){
              navigate("/login")
          } else {
              validateUser(token)
              pegarTodosFuncionarios()
              pegarDiaDaSemana()
              pegarUsuario()
          }

           const valor = localStorage.getItem("user"); 
            if (valor) {
              setMeuValor(JSON.parse(valor)); 
            }
      },[]) 

      useEffect(() => {
        if (isModalOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }

        return () => { document.body.style.overflow = ""; };

      }, [isModalOpen]);

      useEffect(() => {
        if (!ddsemana.length) return;
        const dia = ddsemana.find(d => d.id === diaSemana);
        if (dia) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setTimes(gerarHorarios(dia.horaInicial, dia.horaFinal));
        }
      }, [ddsemana, diaSemana]);

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
          onSelect={async (newDate) => {
            if (!newDate) return;

            setSelectedDate(newDate);

            const dia = newDate.getDate();
            const mesIndex = newDate.getMonth();
            const ano = newDate.getFullYear();
            const mesNome = meses[mesIndex].toLowerCase();

            const ds = diasSemana[newDate.getDay()];
            setDiaSemana(ds);

            const diaSemanaConfig = ddsemana.find(d => d.id === ds);

            if (!diaSemanaConfig || (diaSemanaConfig.horaInicial.slice(0,5) === "00:00" && diaSemanaConfig.horaFinal.slice(0,5) === "00:00")) {
              setTimes([]);
              setSelectedTime("");
              setSelectedDate(undefined)
              return;
            }

            const todosHorarios = gerarHorarios(diaSemanaConfig.horaInicial, diaSemanaConfig.horaFinal, newDate);

            let horariosDisponiveis = await atualizarHorariosDisponiveis(
              idSelecionado!,
              dia.toString(),
              mesNome,
              ano.toString(),
              todosHorarios
            );

            const agora = new Date();
            const diaSelecionado = new Date(newDate);
            const ehHoje =
              diaSelecionado.getDate() === agora.getDate() &&
              diaSelecionado.getMonth() === agora.getMonth() &&
              diaSelecionado.getFullYear() === agora.getFullYear();

            if (ehHoje) {
              horariosDisponiveis = horariosDisponiveis.filter(h => {
                const [hora, minuto] = h.split(":").map(Number);
                const horarioDate = new Date(diaSelecionado);
                horarioDate.setHours(hora, minuto, 0, 0);
                return horarioDate > agora;
              });
            }

            setTimes(horariosDisponiveis);
            setDate(dia);
            setMes(mesIndex);
            setAno(ano);
            setSelectedTime("");
          }}
          salvarData={salvarData}
        />


        <select className={style.hora} value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
          <option value="">Selecionar hora</option>
          {times.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>

        <button onClick={() => {setIsModalOpen2(true)}}>Confirmar Agendamento</button>
      </div>
    </div>
  )}

{isModalOpen2 && (
  <div className={style.modalOverlay2} onClick={() => setIsModalOpen2(false)}>
    <div className={style.modalContent2} onClick={(e) => e.stopPropagation()}>
      <button 
        className="confirm" 
        onClick={async () => {
          if (idSelecionado === null) {
            toast.error("Selecione um funcionário.");
            return;
          }
          if (cliente && cliente[0].ativo === false){
            toast.error("Você nao tem permissão para agendar entre em contato com a barbearia")
            return;
          }
          if (!selectedDate) {
            toast.error("Selecione um dia válido.");
            return;
          }
          if (!selectedTime) {
            toast.error("Selecione um horário.");
            return;
          }
          try {
            await agendar(idSelecionado, selectedTime, String(date), meses[mes], String(ano), meuValor.id, diaSemana);
            toast.success("Agendamento confirmado com sucesso!");
            
            setTimeout(() => {
              setIsModalOpen(false);
              setSelectedTime("");
              setIsModalOpen2(false);
            }, 3600); 
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            toast.error("Limite de 3 agendamentos atingido. Por favor, cancele um existente para agendar neste horário.");
          }
        }}
      > Confirmar</button>
      <button className="cancel" onClick={() => setIsModalOpen2(false)}>Cancelar</button>
    </div>
  </div>
)}
          <Footer/>
      </>
  }
