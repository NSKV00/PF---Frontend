<<<<<<< HEAD
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import IHome from "../../assets/IHome.png"
=======
import { useContext, useEffect } from "react"
import { Scissors, Calendar, Star, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import HeroLogo from "../../assets/HeroLogo.png"
>>>>>>> 0aafeada2c0c3a9345d8e8ce9fa644fad640f860
import style from "./style.module.css"

export const Home = ()=>{
    const navigate = useNavigate()

<<<<<<< HEAD
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
=======
  return (
    <>

    <Header></Header>
>>>>>>> 0aafeada2c0c3a9345d8e8ce9fa644fad640f860

      {/* Hero */}
      <section style={{backgroundImage:`url(${HeroLogo})`}} id="hero" className={style.hero}>
        <div>
          <div className={style.heroButtons}>
            <p className={style.btnRed}>Tradição, precisão e estilo</p>
            <p className={style.btnRedBlue}></p>
            <p className={style.btnBlue}>do clássico ao moderno</p>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className={style.sobre}>
        <h2>Sobre nós</h2>
        <p>
          Na GRAVUS, cada corte é um ritual. Unimos técnicas tradicionais
          com tendências atuais para entregar uma experiência completa:
          atendimento de ponta, ambiente confortável e produtos premium.
        </p>
        <ul className={style.features}>
          <li>+10 anos de experiência</li>
          <li>Profissionais certificados</li>
          <li>Ambiente climatizado e Wi-Fi</li>
          <li>Produtos de alta performance</li>
        </ul>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className={style.depoimentos}>
        <h2>O que falam da GRAVUS</h2>
        <blockquote>
          “Atendimento impecável e corte perfeito. Virei cliente!” — <cite>Henrique M.</cite>
        </blockquote>
        <blockquote>
          “A barba com toalha quente é outra experiência.” — <cite>Pedro S.</cite>
        </blockquote>
      </section>

      {/* Galeria */}
      <section id="galeria" className={style.galeria}>
        <h2>Galeria</h2>
        <div className={style.galeriaGrid}>
          <img src="/imgs/galeria-1.jpg" alt="Corte clássico" />
          <img src="/imgs/galeria-2.jpg" alt="Degradê baixo" />
          <img src="/imgs/galeria-3.jpg" alt="Modelagem de barba" />
          <img src="/imgs/galeria-4.jpg" alt="Camuflagem de fios brancos" />
        </div>
      </section>

      <Footer></Footer>
    </>
  );
}