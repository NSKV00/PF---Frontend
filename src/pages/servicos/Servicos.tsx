import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import style from "./style.module.css"


export const Servicos = ()=>{
   // const navigate = useNavigate()

    return<>

    <Header/>

    <main >
        <div className={style.servicos}>
        <div className={style.tudo}>
            <p>
                Corte de cabelo

            </p>
            
            <p>
                Barba
            </p>
        </div>
       
        <div className={style.tudo}>
            <p>
                Lavagem de cabelo
            </p>
            <p>
                Skincare cabelo
            </p>
        </div>
      
        <div className={style.tudo}>
            <p>
                Sobrancelha
            </p>
            <p>
                Pacote cabelo + barba
            </p>
        </div>
       
        <div className={style.tudo}>
            <p className={style.pacote}>
                Pacote PLUS
            </p>
        </div>
        </div>
    </main>
    <Footer/>
    </>
}