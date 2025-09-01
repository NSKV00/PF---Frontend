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
            <div style={{backgroundImage:"url(/corteReal.jpg)"}}className={style.pacote}>
            <p>
                Corte de cabelo
            </p>
            <p>
                R$35,00
            </p>
            </div> 
            <div style={{backgroundImage:"url(/barbaReal.jpg)"}}className={style.pacote}>
            <p>
                Barba
            </p>
            <p>
                R$15,00
            </p>
            </div>
        </div>
       
        <div className={style.tudo}>
            <div style={{backgroundImage:"url(/lavagemReal.jpg)"}}className={style.pacote}>
            <p>
                Lavagem de cabelo
            </p>
            <p>
                R$10,00
            </p>
            </div>
            <div style={{backgroundImage:"url(/sobrancelhaReal.jpg)"}}className={style.pacote}>
            <p>
                    Sobrancelha
            </p>
            <p>
                R$5,00
            </p>
            </div>
        </div>
      
        <div className={style.tudo}>
            <div style={{backgroundImage:"url(/skincareReal.jpg)"}} className={style.pacote}>
            <p>
                Skincare cabelo
            </p>
            <p>
                R$20,00
            </p>
            </div>

            <div style={{backgroundImage:"url(/pacoteReal.jpg)"}}className={style.pacote}>
                <p>
                    R$45,00
                </p>
            </div>
            
        </div>
        <div className={style.tudo}>
        <div style={{backgroundImage:"url(/pacotePlus.jpg)"}}className={style.pacote}>
           
            <p>
                R$65,00
            </p>
            
        </div>
        
        </div>
        </div>
       
    </main>
    <Footer/>
    </>
}