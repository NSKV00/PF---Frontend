import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import { apiController } from "../../controller/api.controller"
import type { returnFuncionario } from "../../schemas/funcionario.schema"
import style from "./style.module.css"
import { Calendar } from "../../components/calendario/Calendario"
import React from "react"
import { DatePicker } from "../../components/CalendarioFuncional/Calendario"

export const Agendamento = ()=>{
    const navigate = useNavigate()
    const [funcionario,setFuncionario] = useState<returnFuncionario[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date, setDate] = React.useState<Date | undefined>(new Date())

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

    const abrirModal = () => {
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
    },[]) 

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
          <p>Informações adicionais aqui</p>
          <button onClick={() => {
            abrirModal()
          }}>click</button>
        </div>
      </div>
    </div>
  ))}
</div>

        </main>


        {isModalOpen && <DatePicker/> }
        <Footer/>
    </>
}
