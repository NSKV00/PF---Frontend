import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import IHome from "../../assets/IHome.png"
import style from "./style.module.css"

export const Home = ()=>{
    const navigate = useNavigate()

    return<>
        <Header/>
            <section>
                <img className={style.Ihome} src={IHome} alt="IHome" />
            </section>
            <section className={style.Home}>
                <div className={style.Historia}>
                    <h1>História</h1>
                </div>
                <div className={style.texto}>
                    <p>
                        A Gravus começou pequena, na garagem de casa,
                        com paredes simples, cadeiras de madeira e vidros antigos marcados pelo tempo.
                        O que parecia um sonho distante ganhou forma a cada corte,
                        a cada cliente que saía com um sorriso e a certeza de voltar.
                        Hoje, somos uma das barbearias mais reconhecidas de Santa Cruz do Sul 
                        — modernas no atendimento, clássicas na essência. Porque, para nós,
                        é mais do que cortar cabelo,é sobre criar histórias e conexões que duram.
                    </p>
                </div>
            </section>

        <Footer/>
    </>
}