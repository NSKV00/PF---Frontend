import { Link } from "react-router-dom"
import { useEffect } from "react"
import { createIcons, icons } from "lucide"
import style from "./style.module.css"
import "../../index.css"
import Logo from "../../assets/Logo.png"

export const Header:React.FC=()=>{
    const MenuLateral = ()=>{
        const overlay = document.getElementById("overlay")
        const menu = document.getElementById("Menu")

        if (menu && overlay) {
            menu.classList.toggle(style.open)
            overlay.style.display = menu.classList.contains(style.open) ? "block" : "none"
        }
    }

    useEffect(()=>{
        createIcons({ icons })
    }, [])

    return <>
        <header className={style.header}>

            <img className={style.Logo} src={Logo} alt="logo" />

            <div id="overlay" className={style.overlay} onClick={MenuLateral}></div>

            <div id="Menu" className={style.Menu}>
                <Link to="/vendas" ><span data-lucide="shopping-bag"></span>Vendas</Link>
                <Link to="/despesa" ><span data-lucide="wallet"></span>Despesas</Link>
                <Link to="/relatorio"><span data-lucide="bar-chart"></span>Relatórios</Link>
            </div>

            <div className={style.MenuLateral} onClick={MenuLateral}>
                <span data-lucide="menu"></span>
            </div>
            
        </header>
    </>
}