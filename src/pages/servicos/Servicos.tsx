import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import style from "./style.module.css"
import barbaReal from "../../assets/barbaReal.jpg"
import corteReal from "../../assets/corteReal.jpg"
import lavagemReal from "../../assets/lavagemReal.jpg"
import sobrancelhaReal from "../../assets/sobrancelhaReal.jpg"
import skincareReal from "../../assets/skincareReal.jpg"
import pacoteReal from "../../assets/pacoteReal.jpg"
import pacotePlus from "../../assets/pacotePlus.jpg"

export const Servicos = ()=>{
    return<>

    <Header/>

    <main >
        <div className={style.servicos}>
        <div className={style.tudo}>
            <div style={{ backgroundImage: `url(${corteReal})` }}className={style.pacote}>
            <p>
                Corte de cabelo
            </p>
            <p>
                R$35,00
            </p>
            </div> 
            <div style={{ backgroundImage: `url(${barbaReal})` }}className={style.pacote}>
            <p>
                Barba
            </p>
            <p>
                R$15,00
            </p>
            </div>
        </div>
       
        <div className={style.tudo}>
            <div style={{ backgroundImage: `url(${lavagemReal})` }}className={style.pacote}>
            <p>
                Lavagem de cabelo
            </p>
            <p>
                R$10,00
            </p>
            </div>
            <div style={{ backgroundImage: `url(${sobrancelhaReal})` }}className={style.pacote}>
            <p>
                    Sobrancelha
            </p>
            <p>
                R$5,00
            </p>
            </div>
        </div>
      
        <div className={style.tudo}>
            <div style={{ backgroundImage: `url(${skincareReal})` }} className={style.pacote}>
            <p>
                Skincare cabelo
            </p>
            <p>
                R$20,00
            </p>
            </div>

            <div style={{ backgroundImage: `url(${pacoteReal})` }}className={style.pacote}>
                <p>
                    R$45,00
                </p>
            </div>
            
        </div>
        <div className={style.tudo}>
        <div style={{ backgroundImage: `url(${pacotePlus})` }}className={style.pacote}>
           
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