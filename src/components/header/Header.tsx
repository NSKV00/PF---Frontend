import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { createIcons, icons } from "lucide"
import style from "./style.module.css"
import "../../index.css"
import Logo from "../../assets/Logo.png"

export const Header:React.FC=()=>{

    const [menuUOpen, setMenuUOpen] = useState(false)
    const menuURef = useRef<HTMLDivElement | null>(null)
    const buttonURef = useRef<HTMLDivElement | null>(null)

    const MenuLateral = ()=>{
        const overlay = document.getElementById("overlay")
        const menu = document.getElementById("Menu")
        
        if (menu && overlay) {
            menu.classList.toggle(style.open)
            overlay.style.display = menu.classList.contains(style.open) ? "block" : "none"
        }
    }

    const toggleMenuUsuario = ()=>{
        setMenuUOpen(prev => !prev)
    }

    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuURef.current && 
                !menuURef.current.contains(event.target as Node) &&
                buttonURef.current &&
                !buttonURef.current.contains(event.target as Node)
            ) {
                setMenuUOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return ()=> document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(()=>{
        createIcons({ icons })
    }, [])

    return <>
        <header className={style.header}>
            <Link to="/">
                 <img className={style.Logo} src={Logo} alt="logo" />
            </Link>

            <div id="overlay" className={style.overlay} onClick={MenuLateral}></div>
            <div id="Menu" className={style.Menu}>
                <Link to="/"><span data-lucide="home"></span>Home</Link>
                <Link to="/agendamento"><span data-lucide="notebook-tabs"></span>Agendamento</Link>
                <Link to="/servicos"><span data-lucide="square-scissors"></span>Serviços</Link>
                <Link to="/clientes"><span data-lucide="users"></span>Clientes</Link>
                <Link to="/agendamentos"><span data-lucide="calendar-days"></span>Agendamentos</Link>
            </div>

            <div className={style.MenuLateral} onClick={MenuLateral}>
                <span className={style.menu} data-lucide="menu"></span>
            </div>

            <div ref={buttonURef} className={style.MenuUsuario} onClick={toggleMenuUsuario}>
                <span className={style.menu} data-lucide="user"></span>
                <div ref={menuURef} className={`${style.MenuU} ${menuUOpen ? style.open : ""}`}>
                    <div className={style.profileSection}>
                        <img src="/default-profile.png" alt="Foto de Perfil" className={style.profilePic} />
                        <label htmlFor="uploadFoto" className={style.changePhoto}>
                            Trocar Foto
                        </label>
                        <input id="uploadFoto" type="file" accept="image/*" style={{ display: "none" }} />
                    </div>

                    <Link className={style.magent} to="/meusAgendamentos">Meus Agendamentos</Link>

                    <button className={style.logoutBtn}>
                        <span data-lucide="log-out"></span> Logout
                    </button>
                </div>
            </div>
        </header>
    </>
}