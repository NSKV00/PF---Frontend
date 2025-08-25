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
            <div style={{backgroundImage:"url(/OIP.webp)"}}className={style.pacote}>
            <p>
                Corte de cabelo
            </p>
            </div> 
            <div style={{backgroundImage:"url(/OIP.webp)"}}className={style.pacote}>
            <p>
                Barba
            </p>
            </div>
        </div>
       
        <div className={style.tudo}>
            <div style={{backgroundImage:"url(/OIP.webp)"}}className={style.pacote}>
            <p>
                Lavagem de cabelo
            </p>
            </div>
            <div style={{backgroundImage:"url(/OIP.webp)"}}className={style.pacote}>
            <p>
                Skincare cabelo
            </p>
            </div>
        </div>
      
        <div className={style.tudo}>
            <div style={{backgroundImage:"url(/OIP.webp)"}} className={style.pacote}>
                <p>
                    Sobrancelha
                </p>
            </div>

            <div style={{backgroundImage:"url(/OIP.webp)"}}className={style.pacote}>
                <p >
                    Pacote cabelo + barba
                </p>
            </div>
        </div>
       
        <div className={style.tudo}>
            <p style={{backgroundImage:"url(/OIP.webp)"}}className={style.pacotePlus}>
                Pacote PLUS
            </p>
        </div>
        </div>
    </main>
    <Footer/>
    </>
}